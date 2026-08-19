# AGENTS.md — AI Agent Guidance for `@blockvibe/payload-visual-builder`

Welcome AI Coding Assistants (Antigravity, Claude Code, Cursor, Copilot, OpenAI Codex)!
This repository contains `@blockvibe/payload-visual-builder`, an open-source visual page builder plugin for **PayloadCMS 3.0** powered by **Craft.js** and **Meta's Lexical**.

---

## Core Guidelines & Architecture

1. **Plugin-First Structure**:
   - `src/`: Reusable plugin source code exported as `@blockvibe/payload-visual-builder`.
   - `dev/`: Isolated Payload 3.0 test harness application configured with `@payloadcms/plugin-multi-tenant`, `@payloadcms/storage-s3`, and `@payloadcms/db-postgres`.

2. **Core Tech Stack**:
   - **Framework**: PayloadCMS 3.0 + Next.js 15 App Router
   - **Canvas Engine**: Craft.js (`@craftjs/core`)
   - **Inline Text Formatting**: Meta Lexical (`@payloadcms/richtext-lexical`)
   - **Language & Types**: TypeScript (strict mode enabled)

3. **Key Documentation Index**:
   - [`docs/architecture.md`](docs/architecture.md): Data model, Craft.js tree serialization, and Payload field bindings.
   - [`docs/plugin_configuration.md`](docs/plugin_configuration.md): Installation options, multi-tenant & S3 plugin compatibility.
   - [`docs/ai_agent_guide.md`](docs/ai_agent_guide.md): How AI agents should extend blocks, write tests, and debug serialization.

---

## Recommended Verification Commands

Before declaring any task complete:
```bash
# Type check TypeScript
pnpm test

# Build plugin package
pnpm build
```
