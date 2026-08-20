# `@blockvibe/payload-visual-builder`

A modern, open-source **Visual Page Builder Plugin for PayloadCMS 3.0** powered by **Craft.js** and **Meta's Lexical**.

---

## Key Features

- **Drag-and-Drop Canvas Core**: Built on Craft.js (`@craftjs/core`) for buttery-smooth drag physics, element dropping, and column snapping.
- **In-Place Inline Editing**: Powered by Meta's Lexical framework for direct inline text typing with floating selection formatting toolbars.
- **Payload 3.0 Compatible**: Binds directly to Payload's `json` and `blocks` collection fields.
- **Plugin Ecosystem Native**: Fully compatible with `@payloadcms/plugin-multi-tenant`, `@payloadcms/storage-s3`, and `@payloadcms/db-postgres`.

---

## Installation & Setup

```bash
pnpm add @blockvibe/payload-visual-builder @craftjs/core
```

### Add to Payload Config (`payload.config.ts`)

```ts
import { buildConfig } from 'payload'
import { visualBuilderPlugin } from '@blockvibe/payload-visual-builder'

export default buildConfig({
  plugins: [
    visualBuilderPlugin({
      enabled: true,
    }),
  ],
})
```

---

## Development Harness (`dev/`)

To run the isolated Payload 3.0 test harness locally with Docker Compose:

1. **Start Local Database** (runs Postgres on standard port `5432` by default):
   ```bash
   docker compose up -d
   ```

2. **Start Dev App** (runs Next.js/Payload on standard port `3000` by default):
   ```bash
   pnpm dev
   ```

Open `http://localhost:3000` (or `http://localhost:3000/admin`) to test the visual builder in action.

### Custom Ports (`.env`)
To avoid port conflicts with other local projects, copy `.env.example` to `.env` and set your custom ports:
```env
PORT=3010
POSTGRES_PORT=5433
DATABASE_URI=postgres://postgres:postgres@127.0.0.1:5433/payload_dev
```



---

## License

[MIT License](LICENSE)
