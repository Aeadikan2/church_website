"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, FileText, ImageIcon, Info, Mail, Church } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Church },
  { href: "/admin/announcements", label: "Announcements", icon: Calendar },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/about", label: "About Content", icon: Info },
  { href: "/admin/contacts", label: "Contact Messages", icon: Mail },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#800020] text-white">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Church className="h-6 w-6" />
          <span className="text-lg font-bold"> WFC</span>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                  isActive ? "bg-white/20" : "hover:bg-white/10",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
