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

export default function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
  })

  useEffect(() => {
    if (id === "new") {
      router.replace("/admin/announcements/new")
      return
    }
  }, [id, router])

  useEffect(() => {
    if (id === "new") return

    const fetchAnnouncement = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("announcements").select("*").eq("id", id).single()

      if (error) {
        console.error("Error fetching announcement:", error)
        return
      }

      if (data) {
        setFormData({
          title: data.title,
          content: data.content,
          date: data.date,
        })
      }
      setIsLoading(false)
    }

    fetchAnnouncement()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      const { error } = await supabase.from("announcements").update(formData).eq("id", id)
      if (error) throw error
      router.push("/admin/announcements")
      router.refresh()
    } catch (error) {
      console.error("Error updating announcement:", error)
      alert("Failed to update announcement")
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
        <Link href="/admin/announcements">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Announcements
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Announcement</CardTitle>
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
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={5}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="bg-[#800020] hover:bg-[#600018]" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Announcement"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
