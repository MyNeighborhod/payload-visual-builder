"use client"

import React, { useState, useRef, useEffect } from "react"

export interface BlockOverlayWrapperProps {
  children: React.ReactNode
  index: number
  blockType: string
  blockName?: string
  isSelected?: boolean
  isEditing?: boolean
  isFirst?: boolean
  isLast?: boolean
  onSelect?: (index: number) => void
  onOpenInspector?: (index: number) => void
  onMoveUp?: (index: number) => void
  onMoveDown?: (index: number) => void
  onDuplicate?: (index: number) => void
  onDelete?: (index: number) => void
  onAddBelow?: (index: number) => void
}

export const BlockOverlayWrapper: React.FC<BlockOverlayWrapperProps> = ({
  children,
  index,
  blockType,
  blockName,
  isSelected = false,
  isEditing = true,
  isFirst = false,
  isLast = false,
  onSelect,
  onOpenInspector,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onAddBelow,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!isEditing) {
    return <>{children}</>
  }

  const displayLabel = blockName || blockType.replace(/([A-Z])/g, " $1").trim()

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onSelect?.(index)
      }}
      className={`group relative my-4 rounded-lg transition-all duration-150 ${
        isSelected
          ? "ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-950 shadow-xl shadow-cyan-500/10"
          : "hover:ring-1 hover:ring-cyan-500/60 hover:ring-offset-1 hover:ring-offset-slate-950"
      }`}
    >
      {/* Top-Left Payload-Style Label Badges */}
      <div className="absolute -top-3 left-3 z-40 flex items-center gap-1">
        <span className="rounded-md border border-cyan-500/40 bg-slate-950/95 px-2 py-0.5 font-mono text-[11px] font-semibold text-cyan-300 shadow-md backdrop-blur-md">
          {displayLabel}
        </span>
        {isSelected && onOpenInspector && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onOpenInspector(index)
            }}
            className="rounded-md border border-cyan-500/40 bg-cyan-600/90 px-2 py-0.5 font-mono text-[11px] font-semibold text-white shadow-md hover:bg-cyan-500 transition backdrop-blur-md"
          >
            Edit Fields
          </button>
        )}
      </div>

      {/* Top-Right Action Controls Badge */}
      <div
        ref={menuRef}
        className="absolute -top-3 right-3 z-40 flex items-center gap-1 rounded-md border border-slate-700/80 bg-slate-950/95 p-0.5 text-xs text-white shadow-xl backdrop-blur-md group-hover:opacity-100 opacity-90 transition-opacity"
      >
        {onOpenInspector && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onOpenInspector(index)
            }}
            className="rounded px-2 py-0.5 font-sans text-[11px] font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition"
          >
            Edit
          </button>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsMenuOpen((prev) => !prev)
          }}
          className="rounded px-1.5 py-0.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          title="Block Actions"
        >
          ⋮
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-36 rounded-lg border border-slate-800 bg-slate-950 py-1 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
            {onMoveUp && (
              <button
                type="button"
                disabled={isFirst}
                onClick={(e) => {
                  e.stopPropagation()
                  onMoveUp(index)
                  setIsMenuOpen(false)
                }}
                className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs transition ${
                  isFirst
                    ? "text-slate-600 cursor-not-allowed"
                    : "text-slate-200 hover:bg-slate-900 hover:text-cyan-400"
                }`}
              >
                <span>🔼</span> Move Up
              </button>
            )}

            {onMoveDown && (
              <button
                type="button"
                disabled={isLast}
                onClick={(e) => {
                  e.stopPropagation()
                  onMoveDown(index)
                  setIsMenuOpen(false)
                }}
                className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs transition ${
                  isLast
                    ? "text-slate-600 cursor-not-allowed"
                    : "text-slate-200 hover:bg-slate-900 hover:text-cyan-400"
                }`}
              >
                <span>🔽</span> Move Down
              </button>
            )}

            {onAddBelow && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddBelow(index + 1)
                  setIsMenuOpen(false)
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition"
              >
                <span>➕</span> Add Below
              </button>
            )}

            {onDuplicate && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onDuplicate(index)
                  setIsMenuOpen(false)
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition"
              >
                <span>📋</span> Duplicate
              </button>
            )}

            <div className="my-1 border-t border-slate-800" />

            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm("Remove this section block?")) {
                    onDelete(index)
                  }
                  setIsMenuOpen(false)
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/50 transition"
              >
                <span>❌</span> Remove
              </button>
            )}
          </div>
        )}
      </div>

      {/* Rendered Block Content */}
      <div className="pointer-events-auto px-1 py-2">{children}</div>

      {/* Add Below Divider Bar */}
      {onAddBelow && (
        <div className="relative my-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-cyan-500/40"></div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onAddBelow(index + 1)
            }}
            className="relative z-30 flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-slate-950 px-3 py-0.5 text-[11px] font-medium text-cyan-300 shadow-md hover:bg-cyan-600 hover:text-white transition-all"
          >
            ➕ Add Section Below
          </button>
        </div>
      )}
    </div>
  )
}
