import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).single()

  if (!post) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      <section className="py-16">
        <div className="container max-w-4xl">
          <Button variant="ghost" className="mb-8" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          {post.image_url && (
            <img
              src={post.image_url || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          <h1 className="text-4xl font-bold mb-4 text-[#800020]">{post.title}</h1>
          <p className="text-muted-foreground mb-8">
            By {post.author} • {new Date(post.published_date).toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="leading-relaxed whitespace-pre-wrap">{post.content}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
