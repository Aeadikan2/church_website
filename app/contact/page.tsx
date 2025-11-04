"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import HeroCarousel from "@/components/hero-carousel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { BookOpen, MapPin, Phone, Facebook, Instagram, Send } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const supabase = createClient()

    try {
      const { error } = await supabase.from("contact_submissions").insert([formData])

      if (error) throw error

      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section (carousel) */}
      <HeroCarousel
        page="contact"
        height={320}
        title={"Get in Touch"}
        subtitle={"Have questions or prayer requests? Reach out — we'd love to hear from you."}
      />

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  {submitStatus === "success" && (
                    <p className="text-sm text-green-600">Thank you! Your message has been sent successfully.</p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-sm text-red-600">
                      Sorry, there was an error sending your message. Please try again.
                    </p>
                  )}

                  <Button type="submit" className="w-full bg-[#800020] hover:bg-[#600018]" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-[#800020]" />
                    <CardTitle>Address</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Faith Tent, back of Plan A lodge, back of Lorem
                    <br />
                    Keffi, Nasarawa State.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-[#800020]" />
                    <CardTitle>Phone</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">(+234) 704-468-7939</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-[#800020]" />
                    <CardTitle>Sermons</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">For more sermons, please visit our social media handles</p>
                  <div className="flex items-center gap-4">
                    <Link
                      href="https://www.facebook.com/share/16xn7ojzMR/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#800020] hover:text-[#600018] transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6" />
                    </Link>
                    <Link
                      href="https://t.me/thewordfaithchurch01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#800020] hover:text-[#600018] transition-colors"
                      aria-label="Telegram"
                    >
                      <Send className="h-6 w-6" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/wfc_online?igsh=MWZzd2dlMHc1b2FwbA%3D%3D&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#800020] hover:text-[#600018] transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
