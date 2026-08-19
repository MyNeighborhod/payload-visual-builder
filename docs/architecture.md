# Technical Architecture

This document describes the internal design of `@blockvibe/payload-visual-builder`.

---

## 1. High-Level System Overview

```
+-------------------------------------------------------------------------------+
|                             Next.js 15 App Router                             |
|                                                                               |
|  +-------------------------------------------------------------------------+  |
|  |                Visual Builder Plugin (<VisualBuilder />)                |  |
|  |                                                                         |  |
|  |  +---------------------------+       +-------------------------------+  |  |
|  |  |  Craft.js Canvas Engine   |  <--> |  Lexical Rich Text Inline     |  |  |
|  |  |  (Drag, Drop, Columns)    |       |  (Floating Text Selection)    |  |  |
|  |  +---------------------------+       +-------------------------------+  |  |
|  |                                                                         |  |
|  +-------------------------------------------------------------------------+  |
|                                     │                                         |
|                                     ▼                                         |
|                 Payload 3.0 Server Action (savePageLayout)                     |
|                                     │                                         |
+-------------------------------------┼-----------------------------------------+
                                      ▼
                        Payload Collection (`pages`)
```

---

## 2. Craft.js State Model

Craft.js stores document structures as a node map:
```json
{
  "ROOT": {
    "type": "CanvasContainer",
    "isCanvas": true,
    "props": {},
    "nodes": ["node-1", "node-2"]
  },
  "node-1": {
    "type": "HeadingBlock",
    "props": { "text": "Welcome to North of Grand" }
  }
}
```

---

## 3. Serialization to Payload Schema

The plugin serializes Craft.js node maps directly into Payload's `layout` array field on `pages`:
- Each node maps to a corresponding Payload block type (`cta`, `content`, `mediaBlock`).
- When saving, a Next.js Server Action pushes updates to Payload and calls `revalidatePath()`.
