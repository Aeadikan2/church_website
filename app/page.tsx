import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Heart, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#66001A] text-white py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/wfc4.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 text-balance">Welcome to Word Faith Church</h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              The church's core FOCUS is the younger generation, building and mentoring their future and God-ordained destiny.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-[#800020]"
                asChild
              >
                <Link href="/contact">Visit Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Heart className="h-12 w-12 text-[#800020] mb-4" />
                <CardTitle>Faith</CardTitle>
                <CardDescription>Growing deeper in our relationship with Christ</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-[#800020] mb-4" />
                <CardTitle>Community</CardTitle>
                <CardDescription>Building meaningful connections and fellowship</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Heart className="h-12 w-12 text-[#800020] mb-4" />
                <CardTitle>Service</CardTitle>
                <CardDescription>Serving others with compassion and love</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#800020]">Upcoming Events</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {announcements?.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(announcement.date).toLocaleDateString()}</span>
                  </div>
                  <CardTitle>{announcement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#800020]">Latest from Our Blog</h2>
            <Button variant="outline" asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts?.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <img
                  src={post.image_url || "/placeholder.svg?height=300&width=600"}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    By {post.author} • {new Date(post.published_date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button variant="link" className="text-[#800020] p-0" asChild>
                    <Link href={`/blog/${post.id}`}>Read More →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
