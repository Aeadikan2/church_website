import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeroCarousel from "@/components/hero-carousel"
import { Calendar } from "lucide-react"

export default async function AnnouncementsPage() {
  const supabase = await createClient();

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div className="flex flex-col">
        {/* Hero section (carousel) */}
        <HeroCarousel
          page="announcements"
          height={320}
          title={"Announcements & Events"}
          subtitle={"Keep up with upcoming events, services and special gatherings."}
        />

        <section className="py-16">
          <div className="container pl-6 md:pl-12 pr-6 md:pr-12">
            <div className="space-y-6">
              {(!announcements || announcements.length === 0) && (
                <p className="text-muted-foreground">No announcements yet.</p>
              )}

              {announcements && announcements.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {announcements.map((a: any) => (
                    <article key={a.id} className="transform transition duration-300 hover:-translate-y-1">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#fff1f2] rounded-md">
                              <Calendar className="h-5 w-5 text-[#800020]" />
                            </div>
                            <div>
                              <CardTitle className="text-lg text-[#800020]">{a.title}</CardTitle>
                              <div className="text-xs text-slate-500">{a.date ? new Date(a.date).toLocaleDateString() : ""}</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-600 line-clamp-4">{a.content}</p>
                        </CardContent>
                      </Card>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
   
  );
}
