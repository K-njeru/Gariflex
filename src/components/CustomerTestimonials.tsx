"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Business Executive",
    company: "Tech Innovations Ltd",
    quote: "Gariflex has transformed our corporate travel. Their service is unparalleled.",
    image: "/images/sarah-thompson.jpg",
  },
  {
    name: "Michael Ochieng",
    role: "Travel Enthusiast",
    company: "Adventure Seekers Club",
    quote: "From safaris to city tours, Gariflex always has the perfect vehicle for our needs.",
    image: "https://wallpapercave.com/wp/wp1828679.jpg",
  },
  {
    name: "Amina Hassan",
    role: "Event Planner",
    company: "Nairobi Gala Events",
    quote: "Reliable, professional, and always on time. Gariflex is our go-to for all events.",
    image: "/images/amina-hassan.jpg",
  },
  {
    name: "David Mutua",
    role: "CEO",
    company: "EcoTourism Kenya",
    quote: "Gariflex's commitment to sustainability aligns perfectly with our eco-friendly initiatives.",
    image: "/images/david-mutua.jpg",
  },
]

export function CustomerTestimonials() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12"
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-lg flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-lg mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

