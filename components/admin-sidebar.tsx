"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Calendar, FileText, ImageIcon, Info, Mail, Church, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Church },
  { href: "/admin/announcements", label: "Announcements", icon: Calendar },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/hero", label: "Hero Images", icon: ImageIcon },
  { href: "/admin/about", label: "About Content", icon: Info },
  { href: "/admin/live", label: "Live Services", icon: Calendar },
  { href: "/admin/give", label: "Give Accounts", icon: FileText },
  { href: "/admin/contacts", label: "Contact Messages", icon: Mail },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn("bg-[#800020] text-white h-screen transition-width", collapsed ? "w-16" : "w-64")}>
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className={cn("flex items-center gap-2", collapsed ? "justify-center w-full" : "") }>
            <Church className="h-6 w-6" />
            {!collapsed && <span className="text-lg font-bold"> WFC</span>}
          </div>
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-1 rounded-md hover:bg-white/10"
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive ? "bg-white/20" : "hover:bg-white/10",
                )}
              >
                <Icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* optional footer area in sidebar */}
        <div className="mt-auto text-xs text-white/80 px-3 pb-4">v1.0</div>
      </div>
    </aside>
  )
}
