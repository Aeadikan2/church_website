"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function HeroCarousel({
  page = "home",
  height = 420,
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  page?: string
  height?: number
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}) {
  const [images, setImages] = useState<Array<any>>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let mounted = true
    const supabase = createClient()

    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("hero_images")
          .select("*")
          .eq("page", page)
          .order("ordering", { ascending: true })

        if (error) {
          console.error("Failed to load hero images:", error)
          return
        }

        if (mounted && data && data.length > 0) {
          setImages(data)
          return
        }

        // If requested page had no images and it's not 'home', try 'home' as fallback
        if (page !== "home") {
          const { data: homeData, error: homeErr } = await supabase
            .from("hero_images")
            .select("*")
            .eq("page", "home")
            .order("ordering", { ascending: true })

          if (homeErr) {
            console.error("Failed to load home hero images:", homeErr)
            return
          }

          if (mounted && homeData && homeData.length > 0) {
            setImages(homeData)
            return
          }
        }

        // Otherwise set empty array so component shows static fallback
        if (mounted) setImages([])
      } catch (err) {
        console.error("Error loading hero images:", err)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [page])

  useEffect(() => {
    if (!images || images.length === 0) return
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000)
    return () => clearInterval(t)
  }, [images])

  const current = images[index]

  return (
    <section className="relative text-white" style={{ height }}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url('${current?.image_url || "/wfc4.jpg"}')`, opacity: 1 }}
      />

      {/* dark gradient for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent" />

      <div className="container relative z-10 flex items-center h-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">{title ?? current?.caption}</h1>
          { (subtitle ?? current?.caption) && (
            <p className="mt-4 text-lg text-white/90 leading-relaxed drop-shadow-sm">{subtitle ?? current?.caption}</p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {primaryLabel && primaryHref && (
              <a href={primaryHref} className="inline-block bg-white text-[#800020] px-4 py-2 rounded font-semibold shadow">{primaryLabel}</a>
            )}
            {secondaryLabel && secondaryHref && (
              <a href={secondaryHref} className="inline-block border border-white text-white px-4 py-2 rounded">{secondaryLabel}</a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
