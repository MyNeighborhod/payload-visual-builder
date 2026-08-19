import type { Config, Plugin } from "payload"
import type { VisualBuilderPluginOptions } from "./types"

export const visualBuilderPlugin =
  (pluginOptions: VisualBuilderPluginOptions = {}): Plugin =>
  (incomingConfig: Config): Config => {
    const { enabled = true, collections = ["pages"] } = pluginOptions

    if (!enabled) {
      return incomingConfig
    }

    const config: Config = {
      ...incomingConfig,
      admin: {
        ...incomingConfig.admin,
      },
      collections: (incomingConfig.collections || []).map((collection) => {
        if (!collections.includes(collection.slug)) {
          return collection
        }

        return {
          ...collection,
          admin: {
            ...collection.admin,
            // Custom admin hooks or components injected here
          },
        }
      }),
    }

    return config
  }

export type { VisualBuilderPluginOptions } from "./types"
