import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Heart, Users, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroCarousel from "@/components/hero-carousel"
import LiveGivePanel from "@/components/live-give-panel"
import GivePopup from "@/components/give-popup"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch latest announcements
  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("date", { ascending: true })
    .limit(3)

  // Fetch latest blog posts
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_date", { ascending: false })
    .limit(2)

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <HeroCarousel
        page="home"
        height={480}
        title={"Welcome to The Word-Faith Church"}
        subtitle={"Bringing all to the fullness of Christ, through the teaching/preaching of God's word and the demonstration of the Spirit.."}
        primaryLabel={"Learn More"}
        primaryHref={'/about'}
        secondaryLabel={"Visit Us"}
        secondaryHref={'/contact'}
      />

      {/* Highlights */}
      <section className="py-10">
        <div className="container px-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            <Card className="text-center p-2 sm:p-4 md:p-6 flex flex-col h-full">
              <div className="mb-1 sm:mb-2 md:mb-3">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#800020] mx-auto" />
              </div>
              <CardTitle className="text-xs sm:text-sm md:text-lg mb-1 sm:mb-2">Sermons</CardTitle>
              <CardContent className="p-0 flex-1 flex flex-col justify-between">
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 mb-2 sm:mb-3 leading-tight">
                  Catch up on recent sermons and teaching series.
                </p>
                <Link href="/blog" className="inline-block">
                  <Button variant="ghost" size="sm" className="h-7 text-[10px] sm:h-8 sm:text-xs md:h-9 md:text-sm px-2 sm:px-3">
                    View Sermons
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-2 sm:p-4 md:p-6 flex flex-col h-full">
              <div className="mb-1 sm:mb-2 md:mb-3">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#800020] mx-auto" />
              </div>
              <CardTitle className="text-xs sm:text-sm md:text-lg mb-1 sm:mb-2">Community</CardTitle>
              <CardContent className="p-0 flex-1 flex flex-col justify-between">
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 mb-2 sm:mb-3 leading-tight">
                  Get connected with groups, ministries and upcoming events.
                </p>
                <Link href="/announcements" className="inline-block">
                  <Button variant="ghost" size="sm" className="h-7 text-[10px] sm:h-8 sm:text-xs md:h-9 md:text-sm px-2 sm:px-3">
                    See Events
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-2 sm:p-4 md:p-6 flex flex-col h-full">
              <div className="mb-1 sm:mb-2 md:mb-3">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-[#800020] mx-auto" />
              </div>
              <CardTitle className="text-xs sm:text-sm md:text-lg mb-1 sm:mb-2">Give</CardTitle>
              <CardContent className="p-0 flex-1 flex flex-col justify-between">
                <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 mb-2 sm:mb-3 leading-tight">
                  Partner with our ministry through one-time or recurring giving.
                </p>
                <div className="inline-block">
                  <GivePopup />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live & Give panel */}
      <section className="py-6 bg-gray-50">
        <div className="container">
          <LiveGivePanel />
        </div>
      </section>

      {/* Announcements */}
      <section className="py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#800020]">Upcoming Events</h2>
            <Link href="/announcements" className="text-sm text-slate-600 hover:underline">View all</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {announcements?.length ? (
              announcements.map((a) => (
                <Card key={a.id} className="overflow-hidden w-full min-w-0">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(a.date).toLocaleDateString()}</span>
                    </div>
                    <CardTitle className="text-lg">{a.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 line-clamp-3 break-words">{a.content}</p>
                    {/* Read more removed - showing brief preview on home */}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-sm text-slate-600">No upcoming events.</div>
            )}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-10 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#800020]">Latest from Our Blog</h2>
            <Link href="/blog" className="text-sm text-slate-600 hover:underline">View all posts</Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts?.length ? (
              blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden w-full min-w-0">
                  {post.image_url && <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover max-w-full" />}
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                      By {post.author ?? 'Staff'} • {new Date(post.published_date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 line-clamp-3 break-words">{post.excerpt}</p>
                    <div className="mt-4">
                      <Link href={`/blog/${post.id}`} className="text-sm text-[#800020] hover:underline">Read more →</Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-sm text-slate-600">No blog posts yet.</div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="py-12">
        <div className="container">
          <div className="rounded-lg bg-gradient-to-r from-[#fff1f2] to-[#fff7f8] p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-[#800020]">Explore our Gallery</h3>
              <p className="text-slate-700">Photos from recent events, outreach and church family moments.</p>
            </div>
            <div>
              <Link href="/gallery"><Button>View Gallery</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-[#800020] text-white">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">Join us this Sunday</h3>
            <p className="text-slate-100">Experience worship, teaching and community — everyone is welcome.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/contact"><Button variant="ghost" className="text-white border-white">Contact Us</Button></Link>
          </div>
        </div>
      </section>
    </main>
  )
}