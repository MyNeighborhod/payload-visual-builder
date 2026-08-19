---
name: visual-builder-dev
description: Guidelines and instructions for AI agents developing, extending, or configuring the payload-visual-builder plugin.
---

# Visual Builder Development Skill

When working on `@blockvibe/payload-visual-builder`:

1. **Craft.js Component Contract**:
   Every editable canvas component (e.g. `Heading`, `Text`, `Image`, `Button`, `Section`) must be wrapped with Craft.js `useNode` hook and define its static `craft` configuration:
   ```tsx
   import { useNode } from "@craftjs/core"

   export const Heading = ({ text }) => {
     const { connectors: { connect, drag } } = useNode()
     return <h2 ref={(ref) => connect(drag(ref))}>{text}</h2>
   }

   Heading.craft = {
     name: "Heading",
     props: { text: "Heading Text" },
     rules: { canDrag: () => true },
   }
   ```

2. **Payload Field Serializer**:
   Convert Craft.js serialized JSON output into Payload's `pages` collection `layout` array.

3. **Compatibility Safeguards**:
   - Ensure tenant context (`doc.tenant`) is preserved when running with `@payloadcms/plugin-multi-tenant`.
   - Ensure media uploads use `@payloadcms/storage-s3` media URLs.
