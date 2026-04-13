# HSEQ SPFx

SharePoint Framework solution for building and testing HSEQ-focused web parts for Skyline Builders.

## What is in this repo

This solution currently contains two SPFx web parts under `src/webparts`:

- `demo`
  - a SharePoint-backed `Projects` experience with responsive HSEQ-style UI
- `hseq`
  - an HSEQ task-style module with grid actions and a right-side slide-out form

The project is built with:

- SPFx `1.22.2`
- React `17`
- Fluent UI `8`
- Heft build tooling

## Prerequisites

- Node.js `>=22.14.0 <23.0.0`
- npm
- SharePoint Online tenant with an SPFx development setup
- A site where you can test local debug manifests

## Local development

Install dependencies:

```powershell
npm install
```

Start the local dev server:

```powershell
npx heft start
```

This project is configured to open the Skyline Builders site with local debug manifests rather than the hosted workbench.

## Build

Clean build:

```powershell
npx heft build --clean
```

Production package:

```powershell
npm run build
```

## SharePoint notes

- The `demo` web part is configured for the `Projects` list.
- The project uses local debug manifests for modern page testing.
- Full-width testing should be done on a real modern page, not only in the hosted workbench.

## Repository hygiene

The `.gitignore` already excludes the important generated artifacts, including:

- `node_modules`
- `dist`
- `lib`
- `release`
- `temp`
- `*.sppkg`

## GitHub Actions setup

This repository now includes:

- [ci.yml](./.github/workflows/ci.yml)
  - build validation for pull requests and non-`main` pushes
- [deploy.yml](./.github/workflows/deploy.yml)
  - multi-stage deployment flow for `Development`, `Staging`, and `Production`

### Required GitHub environments

Create these repository environments in GitHub:

- `Development`
- `Staging`
- `Production`

For `Staging` and `Production`, add required reviewers if you want approval gates before deployment.

### Required GitHub secrets

Add these environment secrets to each environment:

- `CLIENT_ID`
- `TENANT_ID`
- `CERT_PRIVATE_KEY`
- `CERT_THUMBPRINT`
- `SPO_SITE_URL`

### Optional GitHub environment variables

If you want the workflow to automatically install or upgrade the app on selected sites after publishing to the tenant app catalog, add this environment variable:

- `TARGET_SITE_URLS`

Use either newline-separated, comma-separated, or semicolon-separated site URLs. Example:

```text
https://futurrizontech.sharepoint.com/sites/SkylineBuilders2
https://futurrizontech.sharepoint.com/sites/AnotherSite
```

### Deployment notes

- the workflow builds the `.sppkg` package from the SPFx solution
- the deploy jobs install the Microsoft 365 CLI and deploy the package to the SharePoint app catalog
- after deployment, the workflow can install or upgrade the app on the specific sites listed in `TARGET_SITE_URLS`
- this avoids needing tenant-wide deployment when you only want selected sites to receive the app
- the workflow currently uses app-only certificate authentication
- the package path is taken from the generated `solution/*.sppkg` output in this repo

## Remote repository

GitHub repository:

`https://github.com/harsh-bhavsar-1611/HSEQ-SPFx`
