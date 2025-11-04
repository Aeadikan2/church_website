import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = await createClient()
    // sign out the current session (will clear cookies via createClient helpers)
    await supabase.auth.signOut()
    return NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
  } catch (err) {
    // On error, still redirect to login but include a query param
    return NextResponse.redirect(new URL('/auth/login?error=logout', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
  }
}
