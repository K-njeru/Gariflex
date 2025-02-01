"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Business Executive",
    quote:
      "Gariflex has been a game-changer for my business trips. Their luxury sedans are always impeccable, and the service is top-notch.",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbc.com%2Fpidgin%2Fworld-61383204&psig=AOvVaw2Wb47W4iXHKwdirjzZqnAj&ust=1738529150833000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPiY9_qro4sDFQAAAAAdAAAAABAE",
  },
  {
    name: "Mike Rodriguez",
    role: "Adventure Enthusiast",
    quote:
      "I love how Gariflex offers a wide range of vehicles. Whether I need an SUV for a camping trip or a sports car for a weekend getaway, they've got me covered.",
    image: "https://wallpapercave.com/wp/wp13148758.jpg",
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
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 10000); // Move to the next card every 10 seconds

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleSwipe = (direction: "left" | "right") => {
    setAutoPlay(false); // Stop auto-play on user interaction

    if (direction === "left") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    }
  };

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
        {/* Large Screen Continuous Scroll */}
        <div className="hidden lg:block relative max-w-7xl mx-auto overflow-hidden">
          <motion.div
            className="flex space-x-6"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-lg shadow-lg p-8 flex-shrink-0 w-1/3 transition-all duration-1000"
              >
                <Quote className="w-12 h-12 text-teal-500 mb-4" />
                <p className="text-lg mb-6 line-clamp-4">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={40} // Match the w-20 class (20 * 4px = 80px)
                    height={40} // Match the h-20 class
                    className="w-10 h-10 rounded-full object-cover overflow-hidden"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* Blurred Edges with Enhanced Blur */}
          <div className="absolute top-0 left-0 h-full w-[20%] bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute top-0 right-0 h-full w-[20%] bg-gradient-to-l from-background to-transparent z-10" />
        </div>
        {/* Medium and Small Screen Testimonial */}
        <div className="lg:hidden relative">
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
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover overflow-hidden"
              />
              <div>
                <p className="font-semibold">{testimonials[currentIndex].name}</p>
                <p className="text-gray-600">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => handleSwipe("right")}
              className="bg-card p-2 rounded-full shadow hover:bg-muted"
            >
              <ChevronLeft className="text-teal-500"/>
            </button>
          </div>
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => handleSwipe("left")}
              className="bg-card p-2 rounded-full shadow hover:bg-muted"
            >
              <ChevronRight className="text-teal-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
