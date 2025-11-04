import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import HeroCarousel from "@/components/hero-carousel"
import { BookOpen } from "lucide-react"

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase.from("blog_posts").select("*").order("published_date", { ascending: false })

  return (
    <div className="flex flex-col">
      {/* Hero Section (carousel) */}
      <HeroCarousel
        page="blog"
        height={320}
        title={"From the Pulpit & Beyond"}
        subtitle={"Reflections, teachings, and community updates to inspire your faith journey."}
      />

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <img
                  src={post.image_url || "/placeholder.svg?height=300&width=600"}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-[#800020]" />
                    <div>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>
                        By {post.author} • {new Date(post.published_date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                  <Button variant="link" className="text-[#800020] p-0 self-start" asChild>
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
