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
            email: "eugen@example.com",
            password: "helloWorld123",
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
      if (pages.docs.length === 0) {
        await payload.create({
          collection: "pages",
          overrideAccess: true,
          data: {
            title: "Home Page",
            slug: "home",
            tenant: tenantId,
            layout: [
              {
                blockType: "hero",
                title: "Welcome to Visual Page Builder",
              },
            ],
          },
        })
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
