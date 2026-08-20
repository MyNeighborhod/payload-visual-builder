import { GRAPHQL_POST, GRAPHQL_OPTIONS } from '@payloadcms/next/routes'
import config from '../../../../payload.config'

export const POST = GRAPHQL_POST(config)
export const OPTIONS = GRAPHQL_OPTIONS(config)
