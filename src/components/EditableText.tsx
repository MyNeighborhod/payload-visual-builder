"use client"

import React, { useRef, useEffect } from "react"

export interface EditableTextProps {
  value: string
  onChange: (newValue: string) => void
  isEditing?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div"
  className?: string
  placeholder?: string
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  isEditing = true,
  as: Component = "span",
  className = "",
  placeholder = "Click to type...",
}) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      ref.current.innerText = value || ""
    }
  }, [value])

  if (!isEditing) {
    return <Component className={className}>{value}</Component>
  }

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    onChange(e.currentTarget.innerText)
  }

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    onChange(e.currentTarget.innerText.trim())
  }

  return (
    <Component
      ref={ref as any}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onBlur={handleBlur}
      data-placeholder={placeholder}
      className={`${className} cursor-text rounded border border-dashed border-cyan-400/60 hover:border-cyan-400 focus:border-solid focus:border-cyan-500 focus:bg-cyan-950/20 focus:outline-none px-1 transition-all duration-150 relative group/inline`}
      title="Click to edit text directly on canvas"
    />
  )
}
