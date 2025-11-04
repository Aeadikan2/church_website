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
  const [declarations, setDeclarations] = useState<Array<any>>([])
  const [declForm, setDeclForm] = useState({ title: "", declaration: "", bible_references: "" })

  useEffect(() => {
    const fetchContent = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("about_content").select("*").single()

      // fetch declarations
      const { data: decls } = await supabase.from("monthly_declarations").select("*").order("created_at", { ascending: false })

      if (decls) setDeclarations(decls)

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

  const handleAddDeclaration = async (e: React.FormEvent) => {
    e.preventDefault()
    // simple client-side validation
    if (!declForm.title.trim() || !declForm.declaration.trim()) {
      alert("Please provide a title and declaration text.")
      return
    }

    setIsSubmitting(true)
    const supabase = createClient()
    try {
      // request the inserted row back with .select() to get the returned data
      const { data, error } = await supabase
        .from("monthly_declarations")
        .insert([declForm])
        .select()

      if (error) {
        // Supabase error object can include message, details and hint
        console.error("Supabase insert error:", error)
        alert(`Failed to add declaration: ${error.message ?? JSON.stringify(error)}`)
        return
      }

      if (data && data.length > 0) {
        // prepend the new declaration to the list
        setDeclarations((prev) => [data[0], ...prev])
      }

      alert("Declaration added")
      setDeclForm({ title: "", declaration: "", bible_references: "" })
    } catch (err) {
      console.error("Unexpected error adding declaration:", err)
      alert(`Failed to add declaration: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteDeclaration = async (id: string) => {
    if (!confirm("Delete this declaration?")) return
    const supabase = createClient()
    try {
      const { error } = await supabase.from("monthly_declarations").delete().eq("id", id)
      if (error) throw error
      setDeclarations((prev) => prev.filter((d) => d.id !== id))
    } catch (err) {
      console.error("Error deleting declaration:", err)
      alert("Failed to delete declaration")
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
            {/*  */}
            <div className="space-y-2">
              <Label htmlFor="history">Our Purpose/Mandate</Label>
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
      {/* Monthly Declarations Management */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Monthly Declarations</h3>
        <Card>
          <CardHeader>
            <CardTitle>Add Declaration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddDeclaration} className="space-y-4">
              <div>
                <Label htmlFor="decl-title">Title</Label>
                <input
                  id="decl-title"
                  className="w-full border rounded px-2 py-1"
                  value={declForm.title}
                  onChange={(e) => setDeclForm({ ...declForm, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="decl-text">Declaration</Label>
                <Textarea
                  id="decl-text"
                  rows={4}
                  value={declForm.declaration}
                  onChange={(e) => setDeclForm({ ...declForm, declaration: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="decl-bible">Bible References</Label>
                <input
                  id="decl-bible"
                  className="w-full border rounded px-2 py-1"
                  value={declForm.bible_references}
                  onChange={(e) => setDeclForm({ ...declForm, bible_references: e.target.value })}
                />
              </div>
              <Button type="submit" className="bg-[#800020] hover:bg-[#600018]" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Declaration"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-3">Existing Declarations</h4>
          <div className="space-y-3">
            {declarations && declarations.length > 0 ? (
              declarations.map((d) => (
                <Card key={d.id} className="">
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-[#800020]">{d.title}</div>
                        <div className="text-sm text-muted-foreground">{d.declaration}</div>
                        {d.bible_references && <div className="text-xs text-gray-500 mt-1">{d.bible_references}</div>}
                      </div>
                      <div className="ml-4">
                        <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleDeleteDeclaration(d.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No declarations yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
