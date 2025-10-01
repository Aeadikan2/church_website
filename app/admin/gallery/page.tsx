import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { GalleryTable } from "@/components/admin/gallery-table"

export default async function GalleryPage() {
  const supabase = await createClient()

  const { data: images } = await supabase.from("gallery_images").select("*").order("uploaded_at", { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Gallery</h2>
        <Button asChild className="bg-[#800020] hover:bg-[#600018]">
          <Link href="/admin/gallery/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </Link>
        </Button>
      </div>
      <GalleryTable images={images || []} />
    </div>
  )
}
