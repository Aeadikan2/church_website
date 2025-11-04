"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Declaration {
  id: string
  title?: string
  content: string
  created_at?: string
}

export default function DeclarationsModal({ declarations }: { declarations: Declaration[] }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      // focus the close button when opened
      setTimeout(() => closeButtonRef.current?.focus(), 0)
    }
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div>
      <Button variant="ghost" onClick={() => setOpen(true)} aria-haspopup="dialog">
        See declarations
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Monthly declarations"
            ref={dialogRef}
            className="relative w-full max-w-3xl max-h-[80vh] overflow-auto bg-white rounded-lg shadow-lg p-6 m-4"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold">Monthly Declarations</h3>
              <div>
                <Button ref={closeButtonRef} variant="ghost" onClick={() => setOpen(false)} aria-label="Close declarations">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              {declarations && declarations.length > 0 ? (
                declarations.map((d) => (
                  <article key={d.id} className="space-y-2">
                    {d.title && <h4 className="font-semibold">{d.title}</h4>}
                    <div className="text-sm text-slate-700 whitespace-pre-wrap">{d.content}</div>
                    {d.created_at && <div className="text-xs text-slate-400">{new Date(d.created_at).toLocaleString()}</div>}
                    <hr className="my-2" />
                  </article>
                ))
              ) : (
                <div className="text-sm text-slate-600">No declarations available.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
