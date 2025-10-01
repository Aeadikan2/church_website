import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { BlogPostsTable } from "@/components/admin/blog-posts-table"

export default async function BlogPostsPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase.from("blog_posts").select("*").order("published_date", { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Blog Posts</h2>
        <Button asChild className="bg-[#800020] hover:bg-[#600018]">
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Blog Post
          </Link>
        </Button>
      </div>
      <BlogPostsTable posts={posts || []} />
    </div>
  )
}
