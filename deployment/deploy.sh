#!/usr/bin/env bash
#
# Upload the static export in out/ to the S3 bucket.
#
# Run `make build` first (or use `make buildDeploy`). Uploads happen in ordered
# passes so a visitor never gets HTML that points at files not yet uploaded:
#   1. general assets   (images, fonts, lottie, ...)   - cached 1 day
#   2. _next/static/*   (content-hashed)               - cached 1 year, immutable
#   3. HTML + route payloads (.html, .txt, .xml, ...)  - never cached
#   4. prune: delete bucket files that no longer exist in out/, only after
#      everything new is live.
#
# Usage:
#   deployment/deploy.sh
#   BUCKET=other-name AWS_PROFILE=foo deployment/deploy.sh

set -euo pipefail

BUCKET="${BUCKET:-meetcarrot-nextjs-home}"
REGION="${REGION:-${AWS_REGION:-$(aws configure get region 2>/dev/null || true)}}"
REGION="${REGION:-us-west-2}"
OUT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/out"

log() { printf '==> %s\n' "$*"; }

if [ ! -f "${OUT_DIR}/index.html" ]; then
  echo "No build found at ${OUT_DIR}. Run 'make build' first." >&2
  exit 1
fi

if ! aws s3api head-bucket --bucket "$BUCKET" >/dev/null 2>&1; then
  echo "Bucket s3://${BUCKET} is missing or not accessible. Run 'make CreateS3Bucket' first." >&2
  exit 1
fi

# Everything that is not HTML or a route payload, excluding hashed build files.
log "Uploading assets to s3://${BUCKET}"
aws s3 sync "$OUT_DIR/" "s3://${BUCKET}/" \
  --exclude "*.html" --exclude "*.txt" --exclude "*.xml" \
  --exclude "*.webmanifest" --exclude "_next/static/*" \
  --exclude ".*" --exclude "*/.*" \
  --cache-control "public,max-age=86400"

log "Uploading hashed build files"
aws s3 sync "$OUT_DIR/_next/static/" "s3://${BUCKET}/_next/static/" \
  --cache-control "public,max-age=31536000,immutable"

log "Uploading HTML and route payloads"
aws s3 sync "$OUT_DIR/" "s3://${BUCKET}/" \
  --exclude "*" \
  --include "*.html" --include "*.txt" --include "*.xml" --include "*.webmanifest" \
  --exclude "_next/static/*" --exclude ".*" --exclude "*/.*" \
  --cache-control "no-cache"

# Everything new is live; now remove files that no longer exist locally.
# Files already uploaded are in sync, so this pass only deletes.
log "Removing stale files"
aws s3 sync "$OUT_DIR/" "s3://${BUCKET}/" \
  --delete --exclude ".*" --exclude "*/.*"

log "Done"
echo "Website URL: http://${BUCKET}.s3-website-${REGION}.amazonaws.com"
