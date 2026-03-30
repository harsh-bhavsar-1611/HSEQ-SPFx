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

## Suggested first push

After Git is initialized and the remote is configured:

```powershell
git add .
git commit -m "Initial SPFx HSEQ solution"
git push -u origin main
```

## Remote repository

GitHub repository:

`https://github.com/harsh-bhavsar-1611/HSEQ-SPFx`
