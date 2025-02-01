"use client"

import Image from "next/image"
import { useState } from "react"

const clients = [
  {
    id: 1,
    name: "Company A",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png",
  },
  { id: 2, name: "Company B", logo: "https://www.carlogos.org/car-logos/toyota-logo.png" },
  { id: 3, name: "Company C", logo: "https://wallpapercave.com/wp/wp8061120.jpg" },
  { id: 4, name: "Company D", logo: "https://wallpapercave.com/wp/wp14988391.webp" },
  { id: 5, name: "Company E", logo: "/placeholder.svg?height=40&width=40" },
  { id: 6, name: "Company F", logo: "/placeholder.svg?height=40&width=40" },
  { id: 7, name: "Company G", logo: "/placeholder.svg?height=40&width=40" },
  { id: 8, name: "Company H", logo: "/placeholder.svg?height=40&width=40" },
  { id: 9, name: "Company I", logo: "/placeholder.svg?height=40&width=40" },
  { id: 10, name: "Company J", logo: "/placeholder.svg?height=40&width=40" },
]

export default function ClientsSection() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null)

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 w-full lg:w-4/5">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text on the Left for large screens, Top for smaller screens */}
          <div className="w-full lg:w-1/4 text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-2">Trusted by</h2>
            <p className="text-2xl text-teal-500 h-8 lg:h-auto">{hoveredClient || "Industry Leaders"}</p>
          </div>

          {/* Logos */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-x-8 gap-y-12 md:gap-x-12">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-center"
                  onMouseEnter={() => setHoveredClient(client.name)}
                  onMouseLeave={() => setHoveredClient(null)}
                >
                  <div className="w-20 h-20 relative p-2 rounded-lg transition-all duration-300 hover:bg-teal-500/10 group">
                    <div className="w-full h-full relative">
                      <Image
                        src={client.logo || "/placeholder.svg"}
                        alt={client.name}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-teal-500 transition-all duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

