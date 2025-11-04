"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, Eye, X } from "lucide-react"

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  submitted_at: string
}

export function ContactsTable({ contacts }: { contacts: ContactSubmission[] }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (expandedId && panelRef.current) {
      panelRef.current.focus()
    }
  }, [expandedId])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    setIsDeleting(id)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("contact_submissions").delete().eq("id", id)
      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error deleting contact:", error)
      alert("Failed to delete contact")
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="bg-white rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <>
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.subject}</TableCell>
                <TableCell>
                  <button
                    onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                    aria-expanded={expandedId === contact.id}
                    aria-controls={`message-panel-${contact.id}`}
                    className="text-left w-full max-w-md truncate text-slate-700 hover:underline"
                  >
                    {contact.message}
                  </button>
                </TableCell>
                <TableCell>{new Date(contact.submitted_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                    aria-label={expandedId === contact.id ? "Collapse message" : "View full message"}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(contact.id)}
                    disabled={isDeleting === contact.id}
                    aria-label="Delete message"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>

              {expandedId === contact.id && (
                <TableRow key={`${contact.id}-expanded`}>
                  <TableCell colSpan={6} className="bg-slate-50">
                    <div
                      id={`message-panel-${contact.id}`}
                      ref={panelRef}
                      tabIndex={-1}
                      role="region"
                      aria-labelledby={`message-label-${contact.id}`}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setExpandedId(null)
                      }}
                      className="p-4 rounded"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div id={`message-label-${contact.id}`} className="font-medium">Message from {contact.name}</div>
                          <div className="text-sm text-slate-500">{contact.email} • {new Date(contact.submitted_at).toLocaleString()}</div>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm" onClick={() => setExpandedId(null)} aria-label="Close message">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3 whitespace-pre-wrap text-slate-800">{contact.message}</div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
