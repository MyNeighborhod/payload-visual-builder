import type { Config, Field, CollectionConfig } from "payload"
import type React from "react"

export interface VisualBuilderBlockDefinition {
  slug: string
  labels: {
    singular: string
    plural: string
  }
  icon?: string
  component: React.ComponentType<any>
  defaultProps?: Record<string, any>
  fields?: Field[]
}

export interface VisualBuilderPluginOptions {
  /**
   * Toggle plugin enablement
   * @default true
   */
  enabled?: boolean

  /**
   * Array of collection slugs that should support visual builder editing
   * @default ["pages"]
   */
  collections?: string[]

  /**
   * Custom component definitions for Craft.js nodes
   */
  blocks?: VisualBuilderBlockDefinition[]

  /**
   * Field slug storing the serialized visual layout tree
   * @default "visualLayout"
   */
  layoutFieldSlug?: string
}

export interface SerializedCraftNode {
  type: {
    resolvedName: string
  }
  isCanvas?: boolean
  props: Record<string, any>
  displayName?: string
  nodes?: string[]
  linkedNodes?: Record<string, string>
  parent?: string
  hidden?: boolean
}

export type SerializedCraftTree = Record<string, SerializedCraftNode>
