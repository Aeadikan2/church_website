import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase.from("blog_posts").select("*").order("published_date", { ascending: false })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#800020] text-white py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-white/90">Reflections, teachings, and updates from our community</p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col">
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
