# MVP Testing Guide for `@blockvibe/payload-visual-builder`

This guide explains step-by-step how to test the **Payload Visual Builder MVP** locally and integrate it into your Payload 3.0 application.

---

## 1. How to Switch to this Workspace & Test

When ready to test in this repository workspace:

1. **Working Directory**: `/Users/eugen/dev/blockvibe/payload-visual-builder`
2. **Current Branch**: `feat/mvp-visual-builder`

---

## 2. Test Harness Setup (`dev/`)

```bash
cd dev
pnpm install
pnpm dev
```

The test harness application runs on `http://localhost:3000` with pre-configured:
- Payload 3.0 App Router
- `@payloadcms/plugin-multi-tenant`
- `@payloadcms/storage-s3`

---

## 3. Visual Verification Checklist

- [ ] Log in as Admin at `http://localhost:3000/login`.
- [ ] Navigate to the public page (`http://localhost:3000/`).
- [ ] Confirm the **Payload Visual Builder** sticky top toolbar appears.
- [ ] Click **🎨 Edit Page Canvas** to toggle visual edit mode ON.
- [ ] Hover over block sections to verify the Payload-style 1.5px cyan outline and badge pills (`[ Block Name ]`, `[ Edit ]`, `[ ⋮ ]`).
- [ ] Click any heading or text element directly on the page to type inline.
- [ ] Open the `[ ⋮ ]` dropdown menu and test **Move Up**, **Move Down**, **Duplicate**, **Remove**, and **Add Section Below**.
- [ ] Click **💾 Save Page** and verify layout persistence.

---

## 4. Integration into `blockvibe-monorepo`

To link and test in `blockvibe-monorepo`:

```bash
# Inside payload-visual-builder root:
pnpm build
pnpm link --global

# Inside blockvibe-monorepo/apps/payload-web:
pnpm link --global @blockvibe/payload-visual-builder
```
