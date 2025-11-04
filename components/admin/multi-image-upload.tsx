"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { uploadImage } from "@/app/actions/upload-image"

interface MultiImageUploadProps {
  label: string
  onImagesUploaded: (urls: string[]) => void
  required?: boolean
}

export function MultiImageUpload({ label, onImagesUploaded, required }: MultiImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const fileArray = Array.from(files)

    // Show previews immediately
    const readers = fileArray.map((f) => {
      return new Promise<string | null>((res) => {
        const r = new FileReader()
        r.onloadend = () => res(r.result as string)
        r.readAsDataURL(f)
      })
    })

    const previewResults = (await Promise.all(readers)).filter(Boolean) as string[]
    setPreviews(previewResults)

    // Upload sequentially
    setIsUploading(true)
    setError(null)
    const urls: string[] = []
    for (const file of fileArray) {
      const formData = new FormData()
      formData.append("file", file)
      try {
        const res = await uploadImage(formData)
        if (res.error) {
          setError(res.error)
          // stop on first error
          break
        }
        if (res.url) urls.push(res.url)
      } catch (err) {
        setError((err as Error).message)
        break
      }
    }

    setIsUploading(false)
    if (urls.length) onImagesUploaded(urls)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const handleClear = () => {
    setPreviews([])
    onImagesUploaded([])
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {previews.length > 0 ? (
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {previews.map((p, i) => (
              <div key={i} className="relative w-full aspect-video rounded overflow-hidden border">
                <Image src={p} alt={`preview-${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleClear}>Clear</Button>
            {isUploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Upload className="h-4 w-4 animate-pulse" /> Uploading...
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Input type="file" id="multi-image-upload" accept="image/*" multiple onChange={handleFileInput} required={required} />
          {isUploading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="h-4 w-4 animate-pulse" /> Uploading...
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
      <p className="text-sm text-muted-foreground">Accepted formats: JPG, PNG, GIF, WebP (max 5MB each)</p>
    </div>
  )
}
