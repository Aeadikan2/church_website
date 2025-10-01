import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AnnouncementsTable } from "@/components/admin/announcements-table"

export default async function AnnouncementsPage() {
  const supabase = await createClient()

  const { data: announcements } = await supabase.from("announcements").select("*").order("date", { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Announcements</h2>
        <Button asChild className="bg-[#800020] hover:bg-[#600018]">
          <Link href="/admin/announcements/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Announcement
          </Link>
        </Button>
      </div>
      <AnnouncementsTable announcements={announcements || []} />
    </div>
  )
}
