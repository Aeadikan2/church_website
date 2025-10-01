import { createClient } from "@/lib/supabase/server"

export default async function GalleryPage() {
  const supabase = await createClient()

  const { data: images } = await supabase.from("gallery_images").select("*").order("uploaded_at", { ascending: false })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#800020] text-white py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-white/90">Moments from our church community</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-3">
            {images?.map((image) => (
              <div key={image.id} className="group relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={image.image_url || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-semibold">{image.title}</h3>
                    {image.description && <p className="text-sm text-white/80">{image.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
