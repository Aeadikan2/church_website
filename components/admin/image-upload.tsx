"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { uploadImage } from "@/app/actions/upload-image"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  label: string
  currentImageUrl?: string
  onImageUploaded: (url: string) => void
  required?: boolean
}

export function ImageUpload({ label, currentImageUrl, onImageUploaded, required }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview immediately
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setIsUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", file)

    const result = await uploadImage(formData)

    if (result.error) {
      setError(result.error)
      setPreviewUrl(currentImageUrl || null)
    } else if (result.url) {
      onImageUploaded(result.url)
    }

    setIsUploading(false)
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    onImageUploaded("")
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="image-upload">{label}</Label>

      {previewUrl ? (
        <div className="relative w-full max-w-md">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            required={required}
            className="cursor-pointer"
          />
          {isUploading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="h-4 w-4 animate-pulse" />
              Uploading...
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      <p className="text-sm text-muted-foreground">Accepted formats: JPG, PNG, GIF, WebP (max 5MB)</p>
    </div>
  )
}
