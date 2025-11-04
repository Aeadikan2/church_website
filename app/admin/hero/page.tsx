"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/admin/image-upload"
import { MultiImageUpload } from "@/components/admin/multi-image-upload"

export default function AdminHeroPage() {
  const [page, setPage] = useState("home")
  const [caption, setCaption] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [customSlug, setCustomSlug] = useState("")
  const [notification, setNotification] = useState<{ text: string; href?: string } | null>(null)
  const [ordering, setOrdering] = useState<number | "">(0)
  const [items, setItems] = useState<any[]>([])
  const [filter, setFilter] = useState("")
  const [editing, setEditing] = useState<any | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("hero_images")
      .select("*")
      .order("ordering", { ascending: true })
    if (data) setItems(data)
  }

  const resetForm = () => {
    setPage("home")
    setCaption("")
    setImageUrl("")
    setImageUrls([])
    setCustomSlug("")
    setOrdering(0)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    // Support multi-image upload: insert one row per uploaded image
    const urlsToInsert = imageUrls.length ? imageUrls : imageUrl ? [imageUrl] : []
    if (urlsToInsert.length === 0) return alert("Please upload at least one image first")

    // Determine target page (handle custom slug)
    const targetPage = page === "custom" ? customSlug.trim() : page
    if (!targetPage) return alert("Please provide a valid page slug")

    // server-side validate custom slugs
    if (page === "custom") {
      try {
        const resp = await fetch("/api/validate-page", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ slug: targetPage }),
        })
        const json = await resp.json()
        if (!json.valid) return alert("Invalid custom slug: " + (json.reason || ""))
      } catch (err) {
        return alert("Failed to validate custom slug")
      }
    }

    // base ordering (start) and increment for each image
    const startOrder = ordering === "" ? 0 : Number(ordering || 0)
    const rows = urlsToInsert.map((u, idx) => ({ page: targetPage, image_url: u, caption, ordering: startOrder + idx }))

    const { error } = await supabase.from("hero_images").insert(rows)
    if (error) return alert("Failed to add: " + error.message)
    const href = targetPage === "home" ? "/" : `/${targetPage}`
    setNotification({ text: `Added ${rows.length} image(s) to ${targetPage}`, href })
    // auto-hide
    setTimeout(() => setNotification(null), 5000)
    resetForm()
    fetchItems()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this hero image?")) return
    const supabase = createClient()

    // Attempt to remove stored file if it's in the `images` bucket used by uploads
    try {
      const row = items.find((r) => r.id === id)
      if (row?.image_url && row.image_url.includes("/images/")) {
        // derive path after the bucket name
        const parts = row.image_url.split("/images/")
        const filePath = parts[1]
        if (filePath) {
          await supabase.storage.from("images").remove([`images/${filePath}`])
        }
      }
    } catch (err) {
      // non-fatal: proceed to delete DB row
      console.warn("Failed to remove storage file:", err)
    }

    const { error } = await supabase.from("hero_images").delete().eq("id", id)
    if (error) return alert("Failed to delete: " + error.message)
    fetchItems()
  }

  const handleEditOpen = (it: any) => {
    // Keep original image URL so we can delete storage object if replaced
    setEditing({ ...it, _original_image_url: it.image_url })
  }

  const handleEditSave = async () => {
    if (!editing) return
    setIsSaving(true)
    const supabase = createClient()
    // If image was replaced, attempt to delete the previous file from storage
    try {
      const orig = editing._original_image_url
      if (orig && orig !== editing.image_url && typeof orig === "string" && orig.includes("/images/")) {
        const parts = orig.split("/images/")
        const filePath = parts[1]
        if (filePath) {
          await supabase.storage.from("images").remove([`images/${filePath}`])
        }
      }
    } catch (err) {
      console.warn("Failed to remove previous image from storage:", err)
    }

    const { error } = await supabase
      .from("hero_images")
      .update({ page: editing.page, caption: editing.caption, image_url: editing.image_url, ordering: editing.ordering })
      .eq("id", editing.id)
    setIsSaving(false)
    if (error) return alert("Failed to save: " + error.message)
    setEditing(null)
    fetchItems()
  }

  const moveOrder = async (id: string, direction: "up" | "down") => {
    const supabase = createClient()
    // Swap ordering with adjacent item for stable reordering
    // Ensure we have latest items sorted by ordering
    const sorted = [...items].sort((a, b) => (a.ordering || 0) - (b.ordering || 0))
    const index = sorted.findIndex((i) => i.id === id)
    if (index === -1) return
    let swapWithIndex = direction === "up" ? index - 1 : index + 1
    if (swapWithIndex < 0 || swapWithIndex >= sorted.length) return

    const current = sorted[index]
    const other = sorted[swapWithIndex]

    // perform two updates: swap their ordering values
    const { error: err1 } = await supabase.from("hero_images").update({ ordering: other.ordering || 0 }).eq("id", current.id)
    if (err1) return alert("Failed to reorder: " + err1.message)
    const { error: err2 } = await supabase.from("hero_images").update({ ordering: current.ordering || 0 }).eq("id", other.id)
    if (err2) return alert("Failed to reorder: " + err2.message)

    fetchItems()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Hero Images</h2>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="filter">Filter</Label>
          <Input id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Page slug or caption" />
        </div>
        <div>
          <Button onClick={() => { resetForm(); setEditing(null); }}>New Hero Image</Button>
        </div>
      </div>

      <form onSubmit={handleAdd} className="space-y-4 mb-6">
        <div>
          <Label htmlFor="page">Page</Label>
          <div className="flex items-center gap-2">
            <select id="page" value={page} onChange={(e) => setPage(e.target.value)} className="border rounded px-2 py-1">
              <option value="home">Home</option>
              <option value="about">About</option>
              <option value="blog">Blog</option>
              <option value="gallery">Gallery</option>
              <option value="contact">Contact</option>
              <option value="announcements">Announcements</option>
              <option value="custom">Custom...</option>
            </select>
            {page === "custom" && (
              <Input placeholder="Enter slug" value={customSlug} onChange={(e) => setCustomSlug(e.target.value)} />
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="caption">Caption / Writeup</Label>
          <Input id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Short caption" />
        </div>

        <div>
          <MultiImageUpload label="Hero Images (select multiple)" onImagesUploaded={(urls) => setImageUrls(urls)} required />
        </div>

        <div>
          <Label htmlFor="ordering">Ordering</Label>
          <Input
            id="ordering"
            type="number"
            value={ordering === "" ? "" : String(ordering)}
            onChange={(e) => setOrdering(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>

        <Button type="submit" className="bg-[#800020] text-white">Add Hero Image</Button>
      </form>

      {/* Notification / Snackbar */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white border px-4 py-3 rounded shadow-lg flex items-center gap-4">
            <div className="text-sm">{notification.text}</div>
            {notification.href && (
              <a href={notification.href} target="_blank" rel="noreferrer" className="text-sm text-[#800020] underline">
                Preview
              </a>
            )}
            <button className="ml-2 text-sm text-gray-500" onClick={() => setNotification(null)}>Close</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left">
              <th className="p-2">Preview</th>
              <th className="p-2">Page</th>
              <th className="p-2">Caption</th>
              <th className="p-2">Order</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((it) => {
                if (!filter) return true
                return (it.page || "").includes(filter) || (it.caption || "").includes(filter)
              })
              .map((it) => (
                <tr key={it.id} className="border-t">
                  <td className="p-2 w-36">
                    <div className="relative w-28 h-16 rounded overflow-hidden border">
                      {it.image_url ? (
                        <Image src={it.image_url} alt={it.caption || "Hero"} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">No image</div>
                      )}
                    </div>
                  </td>
                  <td className="p-2 align-top">{it.page}</td>
                  <td className="p-2 align-top max-w-xs truncate">{it.caption}</td>
                  <td className="p-2 align-top">{it.ordering}</td>
                  <td className="p-2 align-top">
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleEditOpen(it)}>Edit</Button>
                      <Button size="sm" onClick={() => moveOrder(it.id, "up")}>↑</Button>
                      <Button size="sm" onClick={() => moveOrder(it.id, "down")}>↓</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(it.id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-3">Edit Hero Image</h3>

            <div className="space-y-3">
              <div>
                <Label htmlFor="edit-page">Page</Label>
                <div className="flex items-center gap-2">
                      {
                        // if the stored page is a known page, select it; otherwise treat as 'custom'
                      }
                      <select
                        id="edit-page"
                        value={['home','about','blog','gallery','contact','announcements'].includes(editing.page) ? editing.page : 'custom'}
                        onChange={(e) => {
                          const v = e.target.value
                          if (v === 'custom') {
                            // keep existing editing.page as the custom slug value
                            setEditing({ ...editing })
                          } else {
                            setEditing({ ...editing, page: v })
                          }
                        }}
                        className="border rounded px-2 py-1"
                      >
                        <option value="home">Home</option>
                        <option value="about">About</option>
                        <option value="blog">Blog</option>
                        <option value="gallery">Gallery</option>
                        <option value="contact">Contact</option>
                        <option value="announcements">Announcements</option>
                        <option value="custom">Custom...</option>
                      </select>
                      {(!['home','about','blog','gallery','contact','announcements'].includes(editing.page)) && (
                        <Input placeholder="Enter slug" value={editing.page} onChange={(e) => setEditing({ ...editing, page: e.target.value })} />
                      )}
                </div>
              </div>

              <div>
                <Label htmlFor="edit-caption">Caption</Label>
                <Input id="edit-caption" value={editing.caption} onChange={(e) => setEditing({ ...editing, caption: e.target.value })} />
              </div>

              <div>
                <Label>Background Image</Label>
                <ImageUpload label="Change image" currentImageUrl={editing.image_url} onImageUploaded={(url) => setEditing({ ...editing, image_url: url })} />
              </div>

              <div>
                <Label htmlFor="edit-ordering">Ordering</Label>
                <Input id="edit-ordering" type="number" value={String(editing.ordering || 0)} onChange={(e) => setEditing({ ...editing, ordering: Number(e.target.value) })} />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={() => setEditing(null)} variant="ghost">Cancel</Button>
              <Button onClick={handleEditSave} disabled={isSaving} className="bg-[#800020] text-white">{isSaving ? "Saving…" : "Save"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
