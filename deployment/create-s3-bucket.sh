#!/usr/bin/env bash
#
# Create (or update) the S3 bucket that hosts the static Next.js export.
#
# Idempotent: safe to run any number of times. The bucket is created only if it
# does not exist; every configuration step is a "put" that overwrites, so a
# re-run converges the bucket to the settings below.
#
# Usage:
#   deployment/create-s3-bucket.sh
#   BUCKET=other-name REGION=us-east-1 AWS_PROFILE=foo deployment/create-s3-bucket.sh

set -euo pipefail

BUCKET="${BUCKET:-meetcarrot-nextjs-home}"
REGION="${REGION:-${AWS_REGION:-$(aws configure get region 2>/dev/null || true)}}"
REGION="${REGION:-us-west-2}"

log() { printf '==> %s\n' "$*"; }

log "Checking AWS credentials"
aws sts get-caller-identity --query Arn --output text >/dev/null

# --- 1. Bucket ---------------------------------------------------------------
log "Checking bucket s3://${BUCKET} (${REGION})"
status=0
head_err="$(aws s3api head-bucket --bucket "$BUCKET" 2>&1)" || status=$?

if [ "$status" -eq 0 ]; then
  log "Bucket already exists and is accessible; updating configuration"
elif grep -qE '\(404\)|Not Found|NoSuchBucket' <<<"$head_err"; then
  log "Creating bucket"
  if [ "$REGION" = "us-east-1" ]; then
    aws s3api create-bucket --bucket "$BUCKET" --region "$REGION" >/dev/null
  else
    aws s3api create-bucket --bucket "$BUCKET" --region "$REGION" \
      --create-bucket-configuration "LocationConstraint=${REGION}" >/dev/null
  fi
  aws s3api wait bucket-exists --bucket "$BUCKET"
else
  echo "Cannot use bucket '${BUCKET}':" >&2
  echo "$head_err" >&2
  echo "A 403 usually means the name is owned by another AWS account." >&2
  exit 1
fi

# --- 2. Public access --------------------------------------------------------
# Website endpoints are anonymous, so a public-read bucket policy is required.
# ACL-based public access stays blocked; only the policy is allowed.
log "Allowing a public-read bucket policy"
aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# --- 3. Bucket policy --------------------------------------------------------
log "Applying public-read policy"
aws s3api put-bucket-policy --bucket "$BUCKET" --policy "$(cat <<JSON
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${BUCKET}/*"
    }
  ]
}
JSON
)"

# --- 4. Static website hosting -----------------------------------------------
# The Next export uses trailingSlash, so /help is help/index.html. S3 serves
# the index document for any "directory" and 302s /help to /help/ itself.
# There are deliberately no routing rules: the old /legals/terms/ and
# /legals/terms/index.html URLs serve a "this page has moved" page that the
# reader follows by clicking, not an automatic redirect. put-bucket-website
# replaces the whole configuration, so re-running removes any rule added earlier.
log "Configuring static website hosting"
aws s3api put-bucket-website --bucket "$BUCKET" --website-configuration "$(cat <<JSON
{
  "IndexDocument": { "Suffix": "index.html" },
  "ErrorDocument": { "Key": "404.html" }
}
JSON
)"

# --- 5. Tags -----------------------------------------------------------------
log "Tagging bucket"
aws s3api put-bucket-tagging --bucket "$BUCKET" \
  --tagging 'TagSet=[{Key=Project,Value=meetcarrot},{Key=Purpose,Value=static-site}]'

log "Done"
echo "Website URL: http://${BUCKET}.s3-website-${REGION}.amazonaws.com"
