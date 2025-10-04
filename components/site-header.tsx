import Link from "next/link"
import Image from "next/image"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
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
          <Link href="/contact" className="text-sm font-medium hover:text-[#800020] transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
