import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant"
import { s3Storage } from "@payloadcms/storage-s3"
import { visualBuilderPlugin } from "@blockvibe/payload-visual-builder"

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "dev-secret-key-12345",
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${process.env.PORT || "3000"}`,
  admin: {
    user: "users",
  },
  onInit: async (payload) => {
    try {
      const tenants = await payload.find({ collection: "tenants", overrideAccess: true })
      let tenantId = tenants.docs[0]?.id
      if (!tenantId) {
        const createdTenant = await payload.create({
          collection: "tenants",
          overrideAccess: true,
          data: {
            name: "Default Tenant",
            slug: "default",
          },
        })
        tenantId = createdTenant.id
      }

      const testEmail = process.env.TEST_USERNAME || "eugen@example.com"
      const testPass = process.env.TEST_PASS || "helloWorld123"

      const users = await payload.find({ collection: "users", overrideAccess: true })
      if (users.docs.length > 0) {
        await payload.update({
          collection: "users",
          id: users.docs[0].id,
          overrideAccess: true,
          data: {
            tenants: [
              {
                tenant: tenantId,
                roles: ["admin"],
              },
            ],
          },
        })
      } else {
        await payload.create({
          collection: "users",
          overrideAccess: true,
          data: {
            email: testEmail,
            password: testPass,
            role: "admin",
            tenants: [
              {
                tenant: tenantId,
                roles: ["admin"],
              },
            ],
          },
        })
      }

      const pages = await payload.find({ collection: "pages", overrideAccess: true })
      const existingSlugs = new Set(pages.docs.map((d: any) => d.slug))

      const samplePages = [
        {
          title: "Home Page",
          slug: "home",
          layout: [
            {
              blockType: "hero",
              title: "Welcome to BlockVibe Visual Page Builder",
              subtitle: "Build beautiful, responsive PayloadCMS pages visually with Craft.js",
              ctaText: "Explore Features",
              ctaUrl: "/services",
            },
            {
              blockType: "features",
              title: "Core Features",
              items: [
                { title: "Drag-and-Drop Editing", description: "Craft.js powered visual editor for nested UI elements." },
                { title: "PayloadCMS 3.0 Native", description: "Seamless integration with Payload Next.js App Router." },
                { title: "Multi-Tenant Ready", description: "First-class tenant isolation and scoping built-in." },
              ],
            },
          ],
        },
        {
          title: "About Us",
          slug: "about",
          layout: [
            {
              blockType: "hero",
              title: "About Our Platform",
              subtitle: "Empowering content creators with real-time visual editing capabilities.",
            },
            {
              blockType: "content",
              heading: "Our Mission",
              body: "We aim to bridge the gap between headless CMS flexibility and visual inline editing for modern web applications.",
            },
          ],
        },
        {
          title: "Services & Solutions",
          slug: "services",
          layout: [
            {
              blockType: "hero",
              title: "Our Services",
              subtitle: "Comprehensive page building and site management solutions.",
            },
            {
              blockType: "features",
              title: "What We Offer",
              items: [
                { title: "Visual Page Builder Plugin", description: "Turn standard Payload blocks into dynamic visual trees." },
                { title: "Custom Component Registration", description: "Extend the canvas with custom React components easily." },
                { title: "S3 & Cloud Asset Support", description: "Direct media integration with S3/MinIO cloud storage." },
              ],
            },
          ],
        },
        {
          title: "Contact Us",
          slug: "contact",
          layout: [
            {
              blockType: "hero",
              title: "Get In Touch",
              subtitle: "Have questions about the visual page builder? Reach out to our team.",
            },
            {
              blockType: "content",
              heading: "Contact Information",
              body: "Email: support@blockvibe.io | Documentation: docs/architecture.md",
            },
          ],
        },
      ]

      for (const pageDoc of samplePages) {
        if (!existingSlugs.has(pageDoc.slug)) {
          await payload.create({
            collection: "pages",
            overrideAccess: true,
            data: {
              ...pageDoc,
              tenant: tenantId,
            },
          })
        }
      }
    } catch (err) {
      console.error("Error running dev seed in onInit:", err)
    }
  },
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [
        {
          name: "role",
          type: "select",
          options: ["admin", "editor", "user"],
          defaultValue: "admin",
        },
      ],
    },
    {
      slug: "tenants",
      admin: {
        useAsTitle: "name",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
          index: true,
        },
      ],
    },
    {
      slug: "pages",
      admin: {
        useAsTitle: "title",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          required: true,
          index: true,
        },
        {
          name: "layout",
          type: "json",
          defaultValue: [],
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "postgres://postgres:postgres@127.0.0.1:5432/payload_dev",
    },
  }),
  plugins: [
    multiTenantPlugin({
      collections: {
        pages: {},
      },
      userHasAccessToAllTenants: (user: any) => user?.role === "admin",
    }),
    s3Storage({
      collections: {},
      bucket: process.env.S3_BUCKET || "dev-bucket",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || "minio",
          secretAccessKey: process.env.S3_SECRET_KEY || "minio123",
        },
        region: "us-east-1",
      },
    }),
    visualBuilderPlugin({
      enabled: true,
      collections: ["pages"],
      layoutFieldSlug: "layout",
    }),
  ],
})
