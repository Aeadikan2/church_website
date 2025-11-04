import { createClient } from "@/lib/supabase/server"
import HeroCarousel from "@/components/hero-carousel"
import GalleryViewer from "@/components/gallery-viewer"

export default async function GalleryPage() {
  const supabase = await createClient()

  const { data: images } = await supabase.from("gallery_images").select("*").order("uploaded_at", { ascending: false })

  return (
    <main className="flex flex-col">
      {/* Hero Section (carousel) */}
      <HeroCarousel
        page="gallery"
        height={320}
        title={"Moments from Our Community"}
        subtitle={"Snapshots of worship, fellowship and life at The Word-Faith Church."}
      />

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#800020]">Gallery Highlights</h2>
            <p className="text-sm text-slate-600">Click any image to view larger</p>
          </div>

          {images && images.length > 0 ? (
            <GalleryViewer images={images} />
          ) : (
            <div className="text-sm text-slate-600">No images available.</div>
          )}
        </div>
      </section>
    </main>
  )
}
