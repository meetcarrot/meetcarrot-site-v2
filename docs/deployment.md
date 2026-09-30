# Deployment (static site on S3)

The site is a static Next.js export (`output: "export"`) hosted on an S3 bucket
with static website hosting. There is no server: `next build` writes plain
HTML/CSS/JS to `out/`, and a script uploads it.

- **Bucket:** `meetcarrot-nextjs-home`
- **Default region:** your AWS CLI default (`us-west-2` if unset)
- **Website URL:** `http://meetcarrot-nextjs-home.s3-website-us-west-2.amazonaws.com`

## Prerequisites

- AWS CLI v2, configured (`aws configure`) with permission to manage S3 buckets.
  Check with `aws sts get-caller-identity`.
- Node 24 and `npm ci` already run.
- To use a named profile: `export AWS_PROFILE=<name>` before any command below.

## Commands

| Command | What it does |
|---|---|
| `make CreateS3Bucket` | Create the bucket, or update its configuration if it exists |
| `make build` | Build the static site into `out/` (output goes to `build.log`) |
| `make deploy` | Upload `out/` to the bucket |
| `make buildDeploy` | `make build`, then `make deploy` |

Override the bucket for any command: `make deploy BUCKET=other-bucket`.
Override the region with `REGION=us-east-1 make CreateS3Bucket`.

## First-time setup

```
make CreateS3Bucket
make buildDeploy
```

The script prints the website URL when it finishes.

## Everyday release

```
make buildDeploy
```

If the build fails, read `build.log`.

## CI deploys (GitHub Actions)

`.github/workflows/ci.yml` runs on every push to `master` (including merged
PRs), or when started by hand from the Actions tab (**Run workflow** on
`master`). It lints, type-checks, and builds, then runs `deployment/deploy.sh`
and posts the result to Slack. Pull requests are not checked or deployed.

Set these under **Settings → Secrets and variables → Actions**:

| Name | Kind | Purpose |
|---|---|---|
| `AWS_ACCESS_KEY_ID` | secret | Deploy key |
| `AWS_SECRET_ACCESS_KEY` | secret | Deploy key |
| `SLACK_WEBHOOK_URL` | secret | Incoming webhook for deploy notifications |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | variable | Google Analytics ID (optional) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | variable | Search Console token (optional) |

The deploy key needs `s3:ListBucket` on `arn:aws:s3:::meetcarrot-nextjs-home`
and `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject` on
`arn:aws:s3:::meetcarrot-nextjs-home/*`.

## What `make CreateS3Bucket` does

`deployment/create-s3-bucket.sh` is idempotent. Running it again never creates a
duplicate bucket; it re-applies the same settings.

1. Creates the bucket only if it does not exist. If the name is owned by another
   AWS account (HTTP 403), it stops with an error.
2. Allows a public-read bucket policy (ACL-based public access stays blocked).
3. Applies the policy granting anonymous `s3:GetObject`.
4. Enables static website hosting with index document `index.html` and error
   document `404.html`. There are no routing rules (no automatic redirects).
5. Tags the bucket `Project=meetcarrot`.

## What `make deploy` does

`deployment/deploy.sh` uploads `out/` in ordered passes so visitors never get
HTML that references files not yet uploaded:

1. Images, fonts, lottie and other assets: `Cache-Control: public,max-age=86400`
2. `_next/static/*` (content-hashed): cached one year, `immutable`
3. `.html`, `.txt` (route payloads), `.xml`, `.webmanifest`: `no-cache`
4. Prune: deletes bucket files that no longer exist in `out/`

It refuses to run if `out/index.html` is missing or the bucket is not reachable.

## How URLs map to files

`next.config.ts` sets `trailingSlash: true`, so `/help` is built as
`help/index.html`. S3 serves the index document for any "directory" and
redirects `/help` to `/help/` on its own. Do not remove `trailingSlash`: S3
would then have no way to serve extensionless URLs.

Static export also means:

- No API routes, server actions, middleware, or `rewrites()`/`redirects()` in
  `next.config.ts`. If a redirect is ever needed, add it to the bucket's routing
  rules in `create-s3-bucket.sh`.
- `next/image` runs with `images.unoptimized: true`. Compress images before
  adding them to `public/`.
- `manifest.ts`, `robots.ts`, and `sitemap.ts` must keep
  `export const dynamic = "force-static"`.
- `NEXT_PUBLIC_*` variables (for example the Google Analytics ID) are baked in at
  build time, so set them in the shell or `.env.production.local` before
  `make build`.

## Verify a deploy

```
URL=http://meetcarrot-nextjs-home.s3-website-us-west-2.amazonaws.com
curl -I $URL/                       # 200
curl -I $URL/help/                  # 200
curl -I $URL/help                   # redirect to /help/
curl -I $URL/legals/terms/          # 200, "This page has moved" page
curl -I $URL/legals/terms/index.html  # 200, same page
curl -I $URL/does-not-exist         # 404 with the custom 404 page
curl -I $URL/robots.txt             # 200
```

## Legacy merchant-terms URLs

Old contracts cite `/legals/terms` and `/legals/terms/index.html`. Both serve a
"This page has moved" page (`src/app/legals/terms/`) with a link to
`/terms/merchant-terms-and-conditions/`. The reader clicks through; there is no
automatic redirect. `/legals/terms/index.html` needs no route of its own because
it is the file the export writes for `/legals/terms/`.

## Adding a redirect

Add a `RoutingRules` block to the `put-bucket-website` call in
`deployment/create-s3-bucket.sh`, then run `make CreateS3Bucket` again. The
website configuration is replaced as a whole, so keep every rule in the list.

## Limits and known gaps

- **HTTP only.** S3 website endpoints do not support HTTPS. To serve
  `https://meetcarrot.xyz`, put CloudFront and an ACM certificate in front of the
  bucket (not set up yet).
- **Canonical URLs.** Canonicals and the sitemap are written without a trailing
  slash, while pages are served at `/path/`.
- **Share images.** `metadataBase` falls back to `https://meetcarrot.xyz`, so
  `og:image` resolves against that domain until DNS points at this site.
- **Docker.** `Dockerfile` and `docker-compose.yml` expect `.next/standalone`,
  which no longer exists with static export.
- **Do not add `src/app/legals/terms/index.html/`.** With `trailingSlash` it
  collides with `legals/terms/` and breaks the build.

## Rollback

There is no versioning on the bucket. To roll back, revert the commit on
`master` (CI redeploys it), or check out the previous commit and run
`make buildDeploy`.
