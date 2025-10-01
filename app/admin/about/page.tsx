"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AboutContentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    mission: "",
    vision: "",
    history: "",
  })

  useEffect(() => {
    const fetchContent = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("about_content").select("*").single()

      if (error) {
        console.error("Error fetching about content:", error)
        return
      }

      if (data) {
        setFormData({
          mission: data.mission,
          vision: data.vision,
          history: data.history || "",
        })
      }
      setIsLoading(false)
    }

    fetchContent()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      const { data: existing } = await supabase.from("about_content").select("id").single()

      if (existing) {
        const { error } = await supabase.from("about_content").update(formData).eq("id", existing.id)
        if (error) throw error
      }

      alert("About content updated successfully!")
      router.refresh()
    } catch (error) {
      console.error("Error updating about content:", error)
      alert("Failed to update about content")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">About Content</h2>

      <Card>
        <CardHeader>
          <CardTitle>Edit About Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mission">Mission</Label>
              <Textarea
                id="mission"
                rows={4}
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vision">Vision</Label>
              <Textarea
                id="vision"
                rows={4}
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="history">History</Label>
              <Textarea
                id="history"
                rows={6}
                value={formData.history}
                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
              />
            </div>
            <Button type="submit" className="bg-[#800020] hover:bg-[#600018]" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Content"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
