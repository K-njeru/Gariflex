"use client"

import { useState, useEffect } from "react"
import { Menu, X, Search, Loader2, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import ThemeSwitch from "@/components/ThemeSwitch"
import { motion } from "framer-motion"
import VehicleSearchResults from "@/components/VehicleSearchResults"
import { searchVehicles } from "@/utils/searchVehicles"
import { useDebounce } from "@/utils/useDebounce"
import type { Vehicle } from "@/types/vehicle"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("home")
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Vehicle[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 1000)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowSearch(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll("section")
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  useEffect(() => {
    if (debouncedSearchQuery.length > 0) {
      handleSearch(debouncedSearchQuery)
    } else {
      setSearchResults([])
      setSearchPerformed(false)
    }
  }, [debouncedSearchQuery])

  const navItems = [
    { name: "Home", href: "/dashboard" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "#contact" },
    { name: "Faqs", href: "/faqs" },
  ]

  const handleSearch = async (query: string) => {
    setSearchError(null)
    setIsSearching(true)
    setSearchPerformed(true)
    try {
      const results = await searchVehicles(query)
      setSearchResults(results)
    } catch (error) {
      console.error("Error searching vehicles:", error)
      setSearchError("An error occurred while searching. Please try again.")
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setSearchError(null)
    setSearchPerformed(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-card" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image className="h-8 w-auto" src="/globe.svg" alt="Gariflex" width={32} height={32} />
            </Link>
            <span className="ml-2 text-lg font-bold">Gariflex</span>
          </div>

          {/* Centered nav items */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item.href}
                  className={`text-base font-medium ${
                    activeSection === item.href.substring(1) ? "text-teal-500" : "text-foreground hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Get Started and Dark Mode Toggle */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <ThemeSwitch />
            <Link href="#home" className="rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold hover:bg-teal-700">
              Get Started
            </Link>
          </div>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Search Section */}
      {showSearch && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-card p-4 border-b border-muted">
          <div className="relative mx-auto w-full max-w-xl">
            <Input
              type="text"
              placeholder="Search your dream car"
              className="w-full bg-transparent text-foreground placeholder-foreground backdrop-blur-sm pr-12 border-search focus-visible:ring-1 focus-visible:ring-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearching ? (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 className="h-5 w-5 text-teal-500 animate-spin" />
              </div>
            ) : searchQuery ? (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-500 hover:text-teal-600 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            ) : (
              <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-500" />
            )}
          </div>
          {searchError && <p className="text-red-500 text-sm mt-2">{searchError}</p>}
          <VehicleSearchResults results={searchResults} searchPerformed={searchPerformed} />
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-y-0 right-0 z-50 w-full bg-background p-6 sm:max-w-sm flex flex-col justify-between "
        >
          {/* Top Section */}
          <div>
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <Image className="h-8 w-auto" src="/globe.svg" alt="Gariflex" width={32} height={32} />
              </Link>
              <span className="ml-2 text-lg font-bold ">Gariflex</span>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex mt-6 flex-col">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-muted "
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <hr className="border-teal-300 dark:border-teal-700" />
              <Link
                className="inline-flex items-center py-2 px-3 mt-2 text-base font-semibold rounded hover:text-teal-700 hover:bg-muted"
                href="#home"
              >
                Get Started <ArrowRight className="h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="relative w-full flex items-end justify-end">
            <ThemeSwitch />
          </div>
        </motion.div>
      )}
    </>
  )
}

