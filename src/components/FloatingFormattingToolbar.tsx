"use client"

import React, { useEffect, useState } from "react"

export const FloatingFormattingToolbar: React.FC = () => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setIsVisible(false)
        return
      }

      const anchorNode = selection.anchorNode
      const parentElement = anchorNode?.nodeType === 1 ? (anchorNode as HTMLElement) : anchorNode?.parentElement

      if (!parentElement || !parentElement.closest("[contenteditable='true']")) {
        setIsVisible(false)
        return
      }

      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()

      if (rect) {
        setPosition({
          top: rect.top + window.scrollY - 44,
          left: rect.left + window.scrollX + rect.width / 2,
        })
        setIsVisible(true)
      }
    }

    document.addEventListener("selectionchange", handleSelectionChange)
    return () => document.removeEventListener("selectionchange", handleSelectionChange)
  }, [])

  if (!isVisible || !position) return null

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value)
  }

  return (
    <div
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateX(-50%)",
      }}
      className="fixed z-50 flex items-center gap-1 rounded-lg border border-slate-700/80 bg-slate-950/95 px-2 py-1 text-xs text-slate-100 shadow-2xl backdrop-blur-md animate-in fade-in duration-100"
    >
      <button
        type="button"
        onClick={() => execCommand("formatBlock", "<h1>")}
        className="rounded px-1.5 py-0.5 font-bold hover:bg-slate-800 hover:text-cyan-300 transition"
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => execCommand("formatBlock", "<h2>")}
        className="rounded px-1.5 py-0.5 font-bold hover:bg-slate-800 hover:text-cyan-300 transition"
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => execCommand("formatBlock", "<p>")}
        className="rounded px-1.5 py-0.5 hover:bg-slate-800 hover:text-cyan-300 transition"
        title="Paragraph"
      >
        P
      </button>

      <div className="h-4 w-px bg-slate-800 my-auto mx-0.5" />

      <button
        type="button"
        onClick={() => execCommand("bold")}
        className="rounded px-1.5 py-0.5 font-bold hover:bg-slate-800 hover:text-cyan-300 transition"
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => execCommand("italic")}
        className="rounded px-1.5 py-0.5 italic hover:bg-slate-800 hover:text-cyan-300 transition"
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => execCommand("underline")}
        className="rounded px-1.5 py-0.5 underline hover:bg-slate-800 hover:text-cyan-300 transition"
        title="Underline"
      >
        U
      </button>

      <div className="h-4 w-px bg-slate-800 my-auto mx-0.5" />

      <button
        type="button"
        onClick={() => {
          const url = prompt("Enter URL:")
          if (url) execCommand("createLink", url)
        }}
        className="rounded px-1.5 py-0.5 hover:bg-slate-800 hover:text-cyan-300 transition"
        title="Insert Link"
      >
        🔗
      </button>
    </div>
  )
}
