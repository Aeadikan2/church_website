"use client"

import { Facebook, Instagram, Send, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const subscribe = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!email || !email.includes("@")) {
      setStatus("error")
      return
    }

    try {
      setStatus("loading")
      // For now this is a client-side mock. Replace with real API call to persist.
      await new Promise((res) => setTimeout(res, 700))
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus("idle"), 3000)
    } catch (err) {
      setStatus("error")
    }
  }

  return (
  <footer className="bg-[#800020] text-slate-100">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/wfc_thicks.jpg" alt="The Word-Faith Church" width={48} height={48} className="rounded-full object-cover" />
              <div>
                <div className="text-xl font-bold">The Word-Faith Church</div>
                <div className="text-sm text-slate-300">A community devoted to worship, discipleship and service.</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="https://www.facebook.com/share/16xn7ojzMR/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-slate-200 hover:text-white">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://t.me/thewordfaithchurch01" target="_blank" rel="noreferrer" aria-label="Telegram" className="text-slate-200 hover:text-white">
                <Send className="h-6 w-6" />
              </Link>
              <Link href="https://www.instagram.com/wfc_online" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-slate-200 hover:text-white">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">About</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">Blog</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white">Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="text-slate-300 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Faith Tent, Keffi, Nasarawa State</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+2347044687939" className="hover:text-white">(+234) 704-468-7939</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@wordfaithchurch.org" className="hover:text-white">info@wordfaithchurch.org</a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-3">Stay updated</h4>
            <p className="text-sm text-slate-300 mb-3">Subscribe to our newsletter for updates and events.</p>

            <form onSubmit={subscribe} className="flex gap-2">
              <Input id="footer-email" type="email" placeholder="you@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-800 text-white" />
              <Button type="submit" className="bg-[#800020] text-white">{status === 'loading' ? 'Sending...' : 'Subscribe'}</Button>
            </form>

            {status === 'success' && <div className="text-sm text-green-400 mt-2">Thanks — check your inbox!</div>}
            {status === 'error' && <div className="text-sm text-red-400 mt-2">Enter a valid email address.</div>}
          </div>
        </div>
      </div>

  <div className="border-t border-[#5a0e12]">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-sm text-slate-400">&copy; {new Date().getFullYear()} The Word-Faith Church. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-slate-300 hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-sm text-slate-300 hover:text-white">Terms</Link>
            <a href="#top" className="text-sm text-slate-300 hover:text-white">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
