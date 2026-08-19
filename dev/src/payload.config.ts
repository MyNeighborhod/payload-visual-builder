import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant"
import { s3Storage } from "@payloadcms/storage-s3"
import { visualBuilderPlugin } from "@blockvibe/payload-visual-builder"

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  admin: {
    user: "users",
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
