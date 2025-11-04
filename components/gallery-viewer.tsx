"use client"

import { useEffect, useState, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface Img {
  id: string
  image_url: string
  title?: string
  description?: string
}

export default function GalleryViewer({ images }: { images: Img[] }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  // focus trap helpers
  function getFocusable(el: HTMLElement) {
    const selectors = ['a[href]', 'button', 'input', 'select', 'textarea', '[tabindex]:not([tabindex="-1"])']
    return Array.from(el.querySelectorAll<HTMLElement>(selectors.join(','))).filter((e) => !e.hasAttribute('disabled'))
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return
      if (e.key === "Escape") setOpen(false)
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1))
      if (e.key === "ArrowRight") setIndex((i) => Math.min(images.length - 1, i + 1))
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, images.length])

  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement
    } else {
      previouslyFocused.current?.focus?.()
    }
  }, [open])

  if (!images || images.length === 0) return null

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => { setIndex(i); setOpen(true) }}
            className="group relative overflow-hidden rounded-lg aspect-square"
            aria-label={img.title ?? `Open image ${i + 1}`}
          >
            <img src={img.image_url} alt={img.title ?? "gallery image"} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} aria-hidden />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={images[index].title ?? 'Gallery image'}
            className={`relative max-w-4xl w-full mx-4 bg-white rounded shadow-lg overflow-hidden transform transition-all duration-200 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            onKeyDown={(e) => {
              // trap focus: Tab/Shift+Tab
              if (e.key === 'Tab') {
                const root = e.currentTarget as HTMLElement
                const focusables = getFocusable(root)
                if (focusables.length === 0) return
                const first = focusables[0]
                const last = focusables[focusables.length - 1]
                if (e.shiftKey) {
                  if (document.activeElement === first) {
                    e.preventDefault()
                    last.focus()
                  }
                } else {
                  if (document.activeElement === last) {
                    e.preventDefault()
                    first.focus()
                  }
                }
              }
            }}
          >
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-3">
                <div className="font-semibold">{images[index].title}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIndex((i) => Math.max(0, i - 1))} className="p-2" aria-label="Previous image"><ChevronLeft /></button>
                <button onClick={() => setIndex((i) => Math.min(images.length - 1, i + 1))} className="p-2" aria-label="Next image"><ChevronRight /></button>
                <button onClick={() => setOpen(false)} className="p-2" aria-label="Close viewer"><X /></button>
              </div>
            </div>

            <div className="p-4">
              <img src={images[index].image_url} alt={images[index].title} className="w-full h-[60vh] object-contain" />
              {images[index].description && <p className="mt-3 text-sm text-slate-600">{images[index].description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
