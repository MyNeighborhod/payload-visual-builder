import type { Config } from "payload"

export interface VisualBuilderPluginOptions {
  /**
   * Enable or disable the visual builder plugin
   * @default true
   */
  enabled?: boolean

  /**
   * Collections to enable visual builder editing on
   * @default ["pages"]
   */
  collections?: string[]

  /**
   * Custom component resolver for Craft.js nodes
   */
  components?: Record<string, React.ComponentType<any>>
}

export interface CraftNodeData {
  type: string
  props: Record<string, any>
  nodes?: string[]
}
