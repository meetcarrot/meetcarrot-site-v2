# Bucket that hosts the static site. Override: make deploy BUCKET=other-bucket
BUCKET ?= meetcarrot-nextjs-home

.PHONY: CreateS3Bucket build deploy buildDeploy

# S3 static hosting (meetcarrot-nextjs-home)
# Creates the bucket if missing, otherwise re-applies its configuration.
# `CeateS3Bucket` is kept as an alias for the original spelling.
CreateS3Bucket:
	BUCKET=$(BUCKET) ./deployment/create-s3-bucket.sh

# building & deploying
build:
	npm run build > build.log 2>&1

# Upload out/ to the bucket. Run `make build` first, or use `make buildDeploy`.
deploy:
	BUCKET=$(BUCKET) ./deployment/deploy.sh

buildDeploy: build deploy
