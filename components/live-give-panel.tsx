"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { MonitorPlay } from "lucide-react"

export default function LiveGivePanel() {
  const [live, setLive] = useState<any | null>(null)
  const [active, setActive] = useState<"live" | null>("live")
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("live_services")
      .select("*")
      .order("ordering", { ascending: true })
      .limit(1)
      .then(({ data, error }) => {
        if (error) return console.error(error)
        if (data && data.length > 0) setLive(data[0])
      })

    // give accounts removed from this panel; giving will be handled elsewhere
  }, [])

  // animate visibility when active changes
  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [active])

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 items-start md:[grid-template-columns:40%_60%]">
          {/* Left: action buttons (occupies left half on small; 40% on md+) */}
          <div className="flex flex-col items-start gap-3 w-full">
            <div className="w-full">
              <h4 className="text-lg font-semibold">Live</h4>
              <p className="text-sm text-muted-foreground mt-2">Catch our live services and recent recordings. Use the card to the right to join or learn more.</p>
            </div>
          </div>

          {/* Right: single card that shows the active item */}
          <div className="flex items-start">
            <div className="w-full">
              <div id="livegive-panel-content" role="region" aria-live="polite">
                {/* animate on active change */}
                <div className={`transition-all duration-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                  {active === null && (
                    <div className="p-6 border rounded-lg text-sm text-muted-foreground">Select an action on the left to see details here.</div>
                  )}

                  {live ? (
                    <div
                      className="w-full rounded-lg overflow-hidden shadow-2xl border-2 border-[#600018]"
                      style={{ backgroundImage: `url('${live.image_url || "/live_bg.jpg"}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                      <div className="bg-black/60 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <MonitorPlay className="h-6 w-6 text-white/95" />
                          <h3 className="text-2xl font-extrabold text-white">Watch Live</h3>
                        </div>

                        <h4 className="text-xl font-bold text-white/95">{live.title}</h4>
                        <p className="text-sm text-white/90 mb-4">{live.description}</p>

                        {live.link ? (
                          <a href={live.link} target="_blank" rel="noreferrer">
                            <Button className="bg-white text-[#800020] font-semibold px-5 py-2">Join Live</Button>
                          </a>
                        ) : (
                          <div className="text-sm text-white/80">No live link available.</div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 border rounded-lg text-sm text-muted-foreground">No live service scheduled right now.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
