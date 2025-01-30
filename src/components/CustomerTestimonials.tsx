"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Business Executive",
    quote:
      "Gariflex has been a game-changer for my business trips. Their luxury sedans are always impeccable, and the service is top-notch.",
  },
  {
    name: "Mike Rodriguez",
    role: "Adventure Enthusiast",
    quote:
      "I love how Gariflex offers a wide range of vehicles. Whether I need an SUV for a camping trip or a sports car for a weekend getaway, they've got me covered.",
  },
  {
    name: "Emily Chen",
    role: "Eco-conscious Traveler",
    quote:
      "As someone who prioritizes sustainability, I appreciate Gariflex's selection of electric vehicles. It's great to see a company that cares about the environment.",
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12"
        >
          What Our Customers Say
        </motion.h2>
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <Quote className="w-12 h-12 text-teal-500 mb-4" />
              <p className="text-xl mb-6">{testimonials[currentIndex].quote}</p>
              <div>
                <p className="font-semibold">{testimonials[currentIndex].name}</p>
                <p className="text-gray-600">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg transition duration-300 hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg transition duration-300 hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}

