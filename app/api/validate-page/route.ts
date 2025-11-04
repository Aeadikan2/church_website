import { NextResponse } from "next/server"

const allowedPages = ["home", "about", "blog", "gallery", "contact", "announcements"]

export async function POST(req: Request) {
  try {
    const { slug } = await req.json()
    const s = (slug || "").toString().trim()

    if (!s) return NextResponse.json({ valid: false, reason: "empty" })

    // allow known pages or a simple slug pattern (lowercase letters, numbers, hyphens)
    if (allowedPages.includes(s)) return NextResponse.json({ valid: true })

    const slugPattern = /^[a-z0-9\-]+$/
    if (!slugPattern.test(s)) return NextResponse.json({ valid: false, reason: "invalid-format" })

    // otherwise accept it as a valid custom slug
    return NextResponse.json({ valid: true })
  } catch (err) {
    return NextResponse.json({ valid: false, reason: "error" })
  }
}
