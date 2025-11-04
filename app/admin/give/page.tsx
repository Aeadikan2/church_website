"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/admin/image-upload"

export default function AdminGivePage() {
  const [title, setTitle] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [instructions, setInstructions] = useState("")
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("give_accounts").select("*").order("ordering", { ascending: true })
    if (data) setItems(data)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase
      .from("give_accounts")
      .insert([{ title, account_number: accountNumber, image_url: imageUrl, instructions }])
    if (error) return alert("Failed to add: " + error.message)
    setTitle("")
    setAccountNumber("")
    setImageUrl("")
    setInstructions("")
    fetchItems()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return
    const supabase = createClient()
    const { error } = await supabase.from("give_accounts").delete().eq("id", id)
    if (error) return alert("Failed to delete: " + error.message)
    fetchItems()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Give Accounts</h2>
      <form onSubmit={handleAdd} className="space-y-3 mb-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="account">Account Number</Label>
          <Input id="account" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
        </div>
        <div>
          <ImageUpload label="Background Image" currentImageUrl={imageUrl} onImageUploaded={(url) => setImageUrl(url)} />
        </div>
        <div>
          <Label htmlFor="instructions">Instructions</Label>
          <textarea id="instructions" className="w-full border rounded p-2" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        </div>
        <Button type="submit" className="bg-[#800020] text-white">Add Give Account</Button>
      </form>

      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-muted-foreground">{it.account_number}</div>
            </div>
            <div>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(it.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
