"use client"

import { useEffect, useRef, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function GivePopup() {
  const [open, setOpen] = useState(false)
  const [account, setAccount] = useState<any | null>(null)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.from("give_accounts").select("*").order("ordering", { ascending: true }).limit(1).then(({ data, error }) => {
      if (error) return console.error(error)
      if (data && data.length > 0) setAccount(data[0])
    })
  }, [])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [open])

  return (
    <div className="relative inline-block" ref={ref}>
      <Button onClick={() => setOpen((s) => !s)} aria-expanded={open} aria-haspopup="dialog">
        Give Now
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg p-4 z-50">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-[#800020]">{account?.title ?? 'Church Account'}</div>
              {account?.instructions && <div className="text-xs text-slate-600">{account.instructions}</div>}
            </div>
            <div>
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-xs text-slate-500">Account Number</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex-1 font-mono bg-slate-100 p-2 rounded">{account?.account_number ?? 'N/A'}</div>
              <button
                onClick={async () => {
                  const text = account?.account_number ?? ""
                  try {
                    await navigator.clipboard.writeText(text)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  } catch (err) {
                    console.error("Copy failed", err)
                    // fallback: select text (not ideal in popup)
                  }
                }}
                className="text-sm bg-[#800020] text-white px-3 py-1 rounded"
                aria-label="Copy account number"
              >
                Copy
              </button>
            </div>
            {copied && <div className="mt-2 text-sm text-green-600">Account number copied to clipboard.</div>}
            {account?.image_url && <img src={account.image_url} alt="account" className="w-full h-20 object-cover mt-3 rounded" />}
          </div>
        </div>
      )}
    </div>
  )
}
