"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/admin/image-upload"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditGalleryImagePage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    description: "",
  })

  useEffect(() => {
    if (id === "new") {
      router.replace("/admin/gallery/new")
      return
    }
  }, [id, router])

  useEffect(() => {
    if (id === "new") return

    const fetchImage = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("gallery_images").select("*").eq("id", id).single()

      if (error) {
        console.error("Error fetching image:", error)
        return
      }

      if (data) {
        setFormData({
          title: data.title,
          image_url: data.image_url,
          description: data.description || "",
        })
      }
      setIsLoading(false)
    }

    fetchImage()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      const { error } = await supabase.from("gallery_images").update(formData).eq("id", id)
      if (error) throw error
      router.push("/admin/gallery")
      router.refresh()
    } catch (error) {
      console.error("Error updating image:", error)
      alert("Failed to update image")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (id === "new") {
    return null
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/admin/gallery">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Gallery
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Gallery Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <ImageUpload
              label="Gallery Image"
              currentImageUrl={formData.image_url}
              onImageUploaded={(url) => setFormData({ ...formData, image_url: url })}
              required
            />
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <Button type="submit" className="bg-[#800020] hover:bg-[#600018]" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Image"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
