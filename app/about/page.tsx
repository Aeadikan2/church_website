import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Heart, Users, Award, Coffee, Music, MapPin } from "lucide-react"
import HeroCarousel from "@/components/hero-carousel"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AboutPage() {
  const supabase = await createClient()

  const { data: aboutContent } = await supabase.from("about_content").select("*").single()
  const { data: declarations } = await supabase.from("monthly_declarations").select("*").order("created_at", { ascending: false })

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <HeroCarousel
        page="about"
        height={360}
        title={aboutContent?.title ?? "About Word Faith Church"}
        subtitle={aboutContent?.subtitle ?? "Learn who we are, our mission, vision and the heart behind our ministry."}
      />

      <section className="py-12">
        <div className="container px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#800020] mb-4">Who we are</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{aboutContent?.lead ?? "We are a community committed to worship, discipleship and bringing hope through the gospel."}</p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / History */}
      <section className="py-10 bg-white">
        <div className="container px-6 md:px-12">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#800020]">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{aboutContent?.mission ?? "To raise Christ-centered disciples who live by faith and demonstrate compassion."}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#800020]">Our Vision & Purpose</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{aboutContent?.vision ?? aboutContent?.history ?? "To see transformed lives through the power of the Gospel."}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#800020]">Our Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 whitespace-pre-wrap">{aboutContent?.history ?? "Our story started with a vision to..."}</p>
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-6">
              <div className="bg-gradient-to-tr from-[#fff7f8] to-[#fff1f2] rounded-lg p-4 border border-[#f5d9db]">
                <h3 className="font-semibold text-[#800020]">Monthly Declaration</h3>
                <p className="text-sm text-slate-700 mt-2">Stay spiritually aligned — join us as we declare and stand on God’s word each month.</p>
                <div className="mt-3 space-y-3">
                  {declarations && declarations.length > 0 ? (
                    declarations.map((d: any) => (
                      <div key={d.id} className="bg-white p-3 rounded border">
                        {d.title && <div className="font-semibold text-sm text-[#800020]">{d.title}</div>}
                        {d.created_at && <div className="text-xs text-slate-400">{new Date(d.created_at).toLocaleDateString()}</div>}
                        {/* DB column is 'declaration' (not 'content') */}
                        <div className="text-sm text-slate-700 mt-2 whitespace-pre-wrap">{d.declaration ?? d.content}</div>
                        {d.bible_references && (
                          <div className="text-xs text-slate-500 mt-2">References: {d.bible_references}</div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-slate-600">No declarations available.</div>
                  )}
                </div>
              </div>

              {/* <div className="rounded-lg overflow-hidden border">
                <img src="/wfc_thicks.jpg" alt="Word Faith Church" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold">Visit Us</h4>
                  <p className="text-sm text-slate-600">Sunday services • Midweek prayer • Outreach</p>
                </div>
              </div> */}
            </aside>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container px-6 md:px-12">
          <h2 className="text-3xl font-bold text-[#800020] text-center mb-8">Our Core Values</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <BookOpen className="h-12 w-12 text-[#800020]" />
                </div>
                <CardTitle className="text-lg">The Word</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Grounded in Scripture and biblical truth</p>
              </CardContent>
            </Card>

            <Card className="text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Heart className="h-12 w-12 text-[#800020]" />
                </div>
                <CardTitle className="text-lg">Faith</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Trusting God in all circumstances</p>
              </CardContent>
            </Card>

            <Card className="text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-[#800020]" />
                </div>
                <CardTitle className="text-lg">Love</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Showing Christ's love to all people</p>
              </CardContent>
            </Card>

            <Card className="text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-[#800020]" />
                </div>
                <CardTitle className="text-lg">Excellence & Order</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Pursuing excellence in all we do</p>
              </CardContent>
            </Card>
            {/* Additional core values */}
            <Card className="text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Coffee className="h-12 w-12 text-[#800020]" />
                </div>
                <CardTitle className="text-lg">Prayer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">A lifestyle of communication with God</p>
              </CardContent>
            </Card>

            <Card className="text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Music className="h-12 w-12 text-[#800020]" />
                </div>
                <CardTitle className="text-lg">Worship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Honoring God with our hearts and talents</p>
              </CardContent>
            </Card>

            <Card className="text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <MapPin className="h-12 w-12 text-[#800020]" />
                </div>
                <CardTitle className="text-lg">Discipleship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Growing believers to become mature followers of Christ</p>
              </CardContent>
            </Card>

            <Card className="text-center transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-[#800020]" />
                </div>
                <CardTitle className="text-lg">Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Serving our community with compassion and stewardship</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container px-6 md:px-12">
          <div className="rounded-lg bg-gradient-to-r from-[#fff1f2] to-[#fff7f8] p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-[#800020]">Join our community</h3>
              <p className="text-slate-700">Come worship with us this Sunday or get involved with one of our ministries.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/contact"><Button variant="secondary">Contact Us</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

