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
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    published_date: "",
    image_url: "",
  })

  useEffect(() => {
    if (id === "new") {
      router.replace("/admin/blog/new")
      return
    }
  }, [id, router])

  useEffect(() => {
    if (id === "new") return

    const fetchPost = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

      if (error) {
        console.error("Error fetching blog post:", error)
        return
      }

      if (data) {
        setFormData({
          title: data.title,
          content: data.content,
          excerpt: data.excerpt || "",
          author: data.author,
          published_date: data.published_date,
          image_url: data.image_url || "",
        })
      }
      setIsLoading(false)
    }

    fetchPost()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      const { error } = await supabase.from("blog_posts").update(formData).eq("id", id)
      if (error) throw error
      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      console.error("Error updating blog post:", error)
      alert("Failed to update blog post")
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
        <Link href="/admin/blog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog Posts
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
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
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="published_date">Published Date</Label>
              <Input
                id="published_date"
                type="date"
                value={formData.published_date}
                onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="bg-[#800020] hover:bg-[#600018]" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Blog Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
