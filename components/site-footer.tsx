import { Facebook, Instagram, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-[#800020] text-white">
      <div className="container py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Word Faith Church Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-lg font-bold">Word Faith Church</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors"
              aria-label="Telegram"
            >
              <Send className="h-6 w-6" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Link>
          </div>

          <p className="text-sm text-white/80">
            &copy; {new Date().getFullYear()} Word Faith Church | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
