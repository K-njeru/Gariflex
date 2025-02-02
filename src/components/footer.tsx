import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"
import { BackToTop } from "./back-to-top"

export function Footer() {
  return (
    <footer className="relative text-foreground bg-card border-t border-muted">
      <div className="relative z-10 container mx-auto px-4 py-12 ">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Us Section */}
          <div>
            <h2 className="mb-2 text-xl font-bold">About Us</h2>
            <div className="mb-4 h-1 w-full bg-gray-600">
              <div className="h-full w-[10%] bg-teal-500" />
            </div>
            <p className="text-sm leading-relaxed">
              Gariflex is your trusted vehicle rental service provider. We offer a wide range of vehicles for both
              personal and business use, ensuring reliable transportation solutions with exceptional customer service.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="mb-2 text-xl font-bold">Quick Links</h2>
            <div className="mb-4 h-1 w-full bg-gray-600">
              <div className="h-full w-[10%] bg-teal-500" />
            </div>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-sm hover:text-teal-400">
                Home
              </Link>
              <Link href="/vehicles" className="text-sm hover:text-teal-400">
                Our Vehicles
              </Link>
              <Link href="/services" className="text-sm hover:text-teal-400">
                Services
              </Link>
              <Link href="/booking" className="text-sm hover:text-teal-400">
                Book Now
              </Link>
              <Link href="/about" className="text-sm hover:text-teal-400">
                About Us
              </Link>
              <Link href="/contact" className="text-sm hover:text-teal-400">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="mb-2 text-xl font-bold">Contact</h2>
            <div className="mb-4 h-1 w-full bg-gray-600">
              <div className="h-full w-[10%] bg-teal-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="mt-1 h-5 w-5 text-teal-400" />
                <span className="text-sm">123 Vehicle Street, Rental City, RC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-teal-400" />
                <a href="tel:+12345678900" className="text-sm hover:text-teal-400">
                  +254 794298696
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-teal-400" />
                <a href="mailto:info@gariflex.com" className="text-sm hover:text-teal-400">
                  info@gariflex.com
                </a>
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div>
            <h2 className="mb-2 text-xl font-bold">Follow Us</h2>
            <div className="mb-4 h-1 w-full bg-gray-600">
              <div className="h-full w-[10%] bg-teal-500" />
            </div>
    
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/gariflex"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-teal-500 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/gariflex"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-teal-500 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/gariflex"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-300 transition-colors hover:bg-teal-500 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm">© Copyright {new Date().getFullYear()}. ALL RIGHTS RESERVED</p>
        </div>
      </div>

      <BackToTop />
    </footer>
  )
}

