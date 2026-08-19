"use client"

import React, { useState } from "react"
import { DEFAULT_BLOCK_TEMPLATES, type BlockTemplate } from "../templates/defaultTemplates"

export interface BlockLibraryModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: BlockTemplate, insertIndex?: number | null) => void
  insertIndex?: number | null
  customTemplates?: BlockTemplate[]
}

export const BlockLibraryModal: React.FC<BlockLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  insertIndex = null,
  customTemplates = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  if (!isOpen) return null

  const allTemplates = [...DEFAULT_BLOCK_TEMPLATES, ...customTemplates]
  const categories = ["All", "Hero & Banner", "Content & Layout", "Media & Gallery", "Interactive & Dynamic"]

  const filteredTemplates =
    selectedCategory === "All"
      ? allTemplates
      : allTemplates.filter((t) => t.category === selectedCategory)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in duration-150">
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-xl border border-slate-800 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
          <div>
            <h2 className="text-lg font-bold text-white">Add New Section Template</h2>
            <p className="text-xs text-slate-400">
              Select a pre-designed template to insert into your page layout
              {typeof insertIndex === "number" ? ` at position #${insertIndex + 1}` : ""}.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 border-b border-slate-800 bg-slate-950/50 px-6 py-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 font-semibold shadow-sm"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filteredTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => onSelectTemplate(template, insertIndex)}
                className="group flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950 p-4 text-left hover:border-cyan-500/60 hover:bg-slate-900 transition-all hover:scale-[1.01]"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-2xl">{template.icon}</span>
                    <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {template.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{template.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px]">
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300 font-mono">
                    {template.defaultProps.blockType}
                  </span>
                  <span className="font-medium text-cyan-400 group-hover:translate-x-1 transition-transform">
                    Insert Template →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
