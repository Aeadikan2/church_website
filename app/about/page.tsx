import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Heart, Users, Award, Sparkles, Target, Gift } from "lucide-react"

export default async function AboutPage() {
  const supabase = await createClient()

  const { data: aboutContent } = await supabase.from("about_content").select("*").single()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#800020] text-white py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-white/90">Learn more about our church and what we believe</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#800020]">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{aboutContent?.mission}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-[#800020]">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{aboutContent?.vision}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-[#800020] text-center mb-12">Our Core Values</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="text-center">
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

            <Card className="text-center">
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

            <Card className="text-center">
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

            <Card className="text-center">
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

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Sparkles className="h-12 w-12 text-[#800020]" />
                </div>
                <CardTitle className="text-lg">Prayers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Seeking God through constant prayer</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Target className="h-12 w-12 text-[#800020]" />
                </div>
                <CardTitle className="text-lg">Discipline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Living with purpose and self-control</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Gift className="h-12 w-12 text-[#800020]" />
                </div>
                <CardTitle className="text-lg">Giving</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Generous hearts serving others</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
