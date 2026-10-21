# Aiversecity UI Concept

This is the React/Vite export of the approved Aiversecity Figma UI concept. It is a design implementation for team review, not validated product research or a production release.

## Run locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run build
npm exec tsc -- --noEmit
npm run format -- --check
```

The Figma export required two compatibility fixes: replacing Figma Make-only Vite plugins and correcting an invalid TypeScript property separator in the generated icon component.
