import { createClient } from "@/lib/supabase/server"
import { ContactsTable } from "@/components/admin/contacts-table"

export default async function ContactsPage() {
  const supabase = await createClient()

  const { data: contacts } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("submitted_at", { ascending: false })

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Contact Messages</h2>
      <ContactsTable contacts={contacts || []} />
    </div>
  )
}
