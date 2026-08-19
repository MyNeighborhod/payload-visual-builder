# AI Agent Guide for `payload-visual-builder`

This document provides explicit rules for AI assistants (Antigravity, Claude Code, Cursor, Copilot, Codex) working inside this repository.

---

## 1. Directory Conventions

- `src/`: Reusable plugin source code. All exported code must be typed and placed here.
- `dev/`: Test harness Payload 3.0 application. Use this directory to run local testing (`pnpm dev`).
- `docs/`: Repository documentation. Keep architectural notes updated when changing component contracts.

---

## 2. Component Guidelines

- Always export components with clean React TypeScript props.
- Ensure any Craft.js canvas component provides fallback default props for uninitialized states.
- Always run `pnpm test` (or `pnpm exec tsc --noEmit`) before committing changes.
