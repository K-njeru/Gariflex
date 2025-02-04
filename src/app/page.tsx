
import Image from 'next/image'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/Navbar'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import ClientsSection from '@/components/ClientsSection'
import { Footer } from '@/components/footer'
import {VehicleHireForm} from '@/components/VehicleHireForm'
import { getVehicles } from "./actions/vehicle-hire"


export default async function Page() {
  const vehicles = await getVehicles()
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

      <VehicleHireForm vehicles={vehicles} />
      <AboutSection />
      <ClientsSection />
      <TestimonialCarousel />
      <Footer />
     
    </>
  )
}

