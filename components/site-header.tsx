"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Volume2 } from "lucide-react"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      {/* Announcement marquee */}
      <div className="w-full bg-[#800020] text-white">
        <div className="overflow-hidden">
          <div
            aria-hidden
            className="whitespace-nowrap flex items-center gap-6 py-2"
            style={{ animation: "marquee 18s linear infinite" }}
          >
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5" />
              <span className="font-medium">for partnerships, contact +2348133089210 for more info. God bless you</span>
            </div>
            <div className="flex items-center gap-3 px-6">
              <Volume2 className="h-5 w-5" />
              <span className="font-medium">for partnerships, contact +2348133089210 for more info. God bless you</span>
            </div>
             <div className="flex items-center gap-3 px-6">
              <Volume2 className="h-5 w-5" />
              <span className="font-medium">for partnerships, contact +2348133089210 for more info. God bless you</span>
            </div>
             <div className="flex items-center gap-3 px-6">
              <Volume2 className="h-5 w-5" />
              <span className="font-medium">for partnerships, contact +2348133089210 for more info. God bless you</span>
            </div>
          </div>
        </div>

        {/* keyframes injected here for simplicity (animate left-to-right) */}
        <style>{`@keyframes marquee { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }`}</style>
      </div>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 pl-6 md:pl-12">
          <Image
            src="/wfc_thicks.jpg"
            alt="Word Faith Church Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain rounded-full"
          />
          <span className="text-xl font-bold text-[#800020]">Word Faith Church</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-[#800020] transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-[#800020] transition-colors">
            About
          </Link>
          <Link href="/gallery" className="text-sm font-medium hover:text-[#800020] transition-colors">
            Gallery
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-[#800020] transition-colors">
            Blog
          </Link>
          <Link href="/announcements" className="text-sm font-medium hover:text-[#800020] transition-colors">
            Announcements
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-[#800020] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col p-4 space-y-2">
            <Link href="/" onClick={() => setOpen(false)} className="py-2">
              Home
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="py-2">
              About
            </Link>
            <Link href="/gallery" onClick={() => setOpen(false)} className="py-2">
              Gallery
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="py-2">
              Blog
            </Link>
            <Link href="/announcements" onClick={() => setOpen(false)} className="py-2">
              Announcements
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="py-2">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
