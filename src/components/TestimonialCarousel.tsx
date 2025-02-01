"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Business Executive",
    quote:
      "Gariflex has been a game-changer for my business trips. Their luxury sedans are always impeccable, and the service is top-notch.",
    image: "https://wallpapercave.com/wp/wp1828679.jpg",
  },
  {
    name: "Mike Rodriguez",
    role: "Adventure Enthusiast",
    quote:
      "I love how Gariflex offers a wide range of vehicles. Whether I need an SUV for a camping trip or a sports car for a weekend getaway, they've got me covered.",
    image: "https://wallpapercave.com/wp/wp1828679.jpg",
  },
  {
    name: "Emily Chen",
    role: "Eco-conscious Traveler",
    quote:
      "As someone who prioritizes sustainability, I appreciate Gariflex's selection of electric vehicles. It's great to see a company that cares about the environment.",
    image: "https://wallpapercave.com/wp/wp1828679.jpg",
  },
  {
    name: "John Doe",
    role: "Family Man",
    quote:
      "Gariflex's spacious minivans are perfect for our family road trips. The kids love the comfort, and I love the peace of mind knowing we're in a safe, reliable vehicle.",
    image: "https://wallpapercave.com/wp/wp1828679.jpg",
  },
  {
    name: "Lisa Wang",
    role: "Corporate Event Planner",
    quote:
      "I've used Gariflex for multiple corporate events, and they never disappoint. Their fleet of luxury vehicles adds a touch of class to our executive transportation needs.",
    image: "https://wallpapercave.com/wp/wp1828679.jpg",
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    const animate = async () => {
      await controls.start({
        x: [0, -100],
        transition: { duration: 15, ease: "linear" },
      })
      nextSlide()
      controls.set({ x: 0 })
    }

    if (!isHovered) {
      interval = setInterval(animate, 15000)
    }

    return () => clearInterval(interval)
  }, [isHovered, controls, nextSlide])

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (window.innerWidth <= 640) {
        if (e.deltaY > 0) {
          nextSlide()
        } else {
          prevSlide()
        }
      }
    }

    window.addEventListener("wheel", handleScroll)
    return () => window.removeEventListener("wheel", handleScroll)
  }, [nextSlide, prevSlide])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (window.innerWidth <= 640) {
      timer = setTimeout(nextSlide, 20000)
    }
    return () => clearTimeout(timer)
  }, [nextSlide])

  const getVisibleTestimonials = () => {
    const visibleIndices = [
      (currentIndex - 2 + testimonials.length) % testimonials.length,
      (currentIndex - 1 + testimonials.length) % testimonials.length,
      currentIndex,
      (currentIndex + 1) % testimonials.length,
      (currentIndex + 2) % testimonials.length,
    ]
    return visibleIndices.map((index) => testimonials[index])
  }

  return (
    <section className="py-20 bg-background overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12"
        >
          What Our Customers Say
        </motion.h2>
        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="sm:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="bg-card rounded-lg shadow-lg p-8"
              >
                <Quote className="w-12 h-12 text-teal-500 mb-4" />
                <p className="text-xl mb-6">{testimonials[currentIndex].quote}</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonials[currentIndex].name}</p>
                    <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden sm:block">
            <motion.div className="flex space-x-6" animate={controls}>
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={`bg-card rounded-lg shadow-lg p-8 flex-shrink-0 w-1/3 transition-all duration-1000 ${
                    index === 2 ? "scale-100 z-10" : index === 1 || index === 3 ? "scale-95 z-5" : "scale-90 z-0"
                  }`}
                  style={{
                    filter: `blur(${Math.abs(2 - index) * 2}px)`,
                    opacity: 1 - Math.abs(2 - index) * 0.2,
                  }}
                >
                  <Quote className="w-12 h-12 text-teal-500 mb-4" />
                  <p className="text-lg mb-6 line-clamp-4">{testimonial.quote}</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <button
            onClick={prevSlide}
            aria-label="Previous Testimonial"
            className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg transition duration-300 hover:bg-gray-100 z-20"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Testimonial"
            className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg transition duration-300 hover:bg-gray-100 z-20"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}

