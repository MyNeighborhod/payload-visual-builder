"use client"

import React from "react"

export interface CraftToolbarProps {
  isEditing: boolean
  onToggleEditing: () => void
  isDirty?: boolean
  isSaving?: boolean
  saveMessage?: string | null
  onSave: () => void
  onDiscard?: () => void
  onOpenAddModal: () => void
  sectionCount?: number
}

export const CraftToolbar: React.FC<CraftToolbarProps> = ({
  isEditing,
  onToggleEditing,
  isDirty = false,
  isSaving = false,
  saveMessage = null,
  onSave,
  onDiscard,
  onOpenAddModal,
  sectionCount = 0,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/30 bg-slate-950/95 text-white backdrop-blur-md transition-all shadow-xl">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 text-xs">
        {/* Left Brand & Status */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-cyan-500/20 px-2.5 py-1 font-semibold text-cyan-300 border border-cyan-500/40 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Payload Visual Builder
          </span>

          <button
            type="button"
            onClick={onToggleEditing}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition ${
              isEditing
                ? "bg-cyan-600 text-white shadow-sm hover:bg-cyan-500"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
          >
            {isEditing ? "👁️ View Live Site" : "🎨 Edit Page Canvas"}
          </button>

          {isEditing && (
            <span className="hidden sm:inline-block text-slate-400 font-mono">
              {sectionCount} {sectionCount === 1 ? "section" : "sections"}
            </span>
          )}
        </div>

        {/* Right Actions */}
        {isEditing && (
          <div className="flex items-center gap-2">
            {saveMessage && (
              <span className="text-emerald-400 font-medium animate-pulse">{saveMessage}</span>
            )}

            <button
              type="button"
              onClick={onOpenAddModal}
              className="flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1.5 font-medium text-slate-200 hover:bg-slate-700 transition border border-slate-700/60"
            >
              ➕ Add Section
            </button>

            {isDirty && onDiscard && (
              <button
                type="button"
                onClick={onDiscard}
                className="rounded-md bg-rose-950/60 text-rose-300 border border-rose-800/50 px-2.5 py-1.5 font-medium hover:bg-rose-900/60 transition"
              >
                Discard
              </button>
            )}

            <button
              type="button"
              onClick={onSave}
              disabled={!isDirty || isSaving}
              className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 font-semibold transition ${
                isDirty
                  ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800"
              }`}
            >
              {isSaving ? (
                <>
                  <span className="animate-spin">⏳</span> Saving...
                </>
              ) : (
                <>💾 Save Page</>
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
