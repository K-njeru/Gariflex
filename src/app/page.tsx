'use client'

import Image from 'next/image'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'

export default function Home() {
  const steps = [
    { title: 'Create an account', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { title: 'Find your fit', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { title: 'Request the hire', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { title: 'Verification from team', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Set to Go', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://wallpapercave.com/wp/wp1828679.jpg"
            alt="Vintage Porsche 911"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>

        {/* Hero Content */}
        <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 lg:pt-32">
          <h1 className="max-w-4xl text-center text-4xl font-medium tracking-tight text-white sm:text-7xl">
            Rediscover the Joy of
            <br />
            the Open Road
          </h1>

          <div className="relative mt-12 w-full max-w-xl">
            <Input
              type="text"
              placeholder="Search your dream car"
              className="w-full bg-transparent text-white placeholder-white placeholder-search backdrop-blur-sm pr-12 border-search focus-visible:ring-1 focus-visible:ring-search"
            />
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-teal-500" />
          </div>
        </main>
      </div>

      <AboutSection />
      <TestimonialCarousel />
     
      {/* Steps Section */}
      <section className="bg-gray-900 py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Your Journey Starts Here</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mb-4 relative">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                  </svg>
                  <div className="absolute -right-1 -top-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-teal-500 font-bold">{index + 1}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{`Step ${index + 1}`}</p>
              </motion.div>
            ))}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-teal-500 hidden md:block" />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <Image
            src="grid-pattern.svg"
            alt="Grid Pattern"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </>
  )
}

