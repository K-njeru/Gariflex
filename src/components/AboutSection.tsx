"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Car, Shield, Clock, Users, MapPin, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card" 

const sections = [
  {
    id: "legacy",
    title: "Legacy",
    subtitle: "OUR STORY",
    content: {
      description: "From humble beginnings to redefining vehicle hiring in Kenya",
      timeline: [
        {
          year: "2010",
          title: "The Beginning",
          description: "Started with just 5 vehicles and a dream",
          icon: <Car className="w-8 h-8 text-teal-500" />,
        },
        {
          year: "2015",
          title: "Expansion",
          description: "Grew to 50+ vehicles across major cities",
          icon: <MapPin className="w-8 h-8 text-teal-500" />,
        },
        {
          year: "2023",
          title: "Innovation",
          description: "Launched digital platform and mobile app",
          icon: <Zap className="w-8 h-8 text-teal-500" />,
        },
      ],
    },
  },
  {
    id: "speed",
    title: "Speed",
    subtitle: "ABOUT US",
    content: {
      description: "Lightning-fast service delivery with unmatched efficiency",
      stats: [
        { value: "15min", label: "Average Response" },
        { value: "100+", label: "Premium Vehicles" },
        { value: "24/7", label: "Support" },
      ],
      features: ["Instant booking confirmation", "Quick vehicle deployment", "Streamlined pickup process"],
    },
  },
  {
    id: "solid",
    title: "Solid",
    subtitle: "WHY CHOOSE US",
    content: {
      description: "Built on trust, driven by excellence",
      benefits: [
        {
          icon: <Shield className="w-12 h-12 text-teal-500" />,
          title: "Reliable",
          description: "Meticulously maintained fleet",
        },
        {
          icon: <Clock className="w-12 h-12 text-teal-500" />,
          title: "Flexible",
          description: "Adaptable to your schedule",
        },
        {
          icon: <Users className="w-12 h-12 text-teal-500" />,
          title: "Personal",
          description: "Tailored to your needs",
        },
      ],
    },
  },
]

export function AboutSection() {
  const [activeSection, setActiveSection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length)
    }, 15000)

    return () => clearInterval(interval)
  }, [autoplay])

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex items-center space-x-8 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className={`flex-1 cursor-pointer ${index === activeSection ? "" : "opacity-50"}`}
              onClick={() => {
                setActiveSection(index)
                setAutoplay(false)
              }}
            >
              <div className="relative">
                <div className="h-[2px] bg-gradient-to-r from-teal-500/20 to-teal-500/20 mb-6">
                  {index === activeSection && (
                    <motion.div
                      className="h-full bg-gradient-to-r from-teal-500 to-teal-500"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </div>
                <h2 className="text-4xl font-bold tracking-tight">{section.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">{section.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={sections[activeSection].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="max-w-2xl mb-12">
              <p className="text-xl text-muted-foreground">{sections[activeSection].content.description}</p>
            </div>

            {activeSection === 0 && (
              <div className="grid md:grid-cols-3 gap-8">
                {sections[0].content.timeline.map((item, index) => (
                  <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4">{item.icon}</div>
                      <div className="absolute top-4 right-4 text-4xl font-bold text-muted-foreground/10">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeSection === 1 && (
              <div className="space-y-12">
                <div className="grid grid-cols-3 gap-8">
                  {sections[1].content.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl font-bold text-teal-500 mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {sections[1].content.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="h-1 w-1 rounded-full bg-teal-500" />
                      <p className="text-muted-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 2 && (
              <div className="grid md:grid-cols-3 gap-8">
                {sections[2].content.benefits.map((benefit, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">{benefit.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

