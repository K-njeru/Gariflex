'use client'

import { useState, useEffect } from "react";
import { Menu, X, Search, ArrowRight } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { Input } from '@/components/ui/input'
import ThemeSwitch from '@/components/ThemeSwitch'
import { motion } from "framer-motion";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
//import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [showSearch, setShowSearch] = useState(false);
  //const [user, setUser] = useState(null); // State to store user information

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowSearch(window.scrollY > 100); // Show search bar after scrolling 100px
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navItems = [
    { name: "Home", href: "/dashboard" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "#contact" },
    { name: "Faqs", href: "/faqs" },
  ]; 

 /* Fetch user information
 useEffect(() => {
  const fetchUser = async () => {
    try {
      const { getUser } = getKindeServerSession();
      const userData = await getUser();
      setUser(userData); // Store user data in state
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };
  fetchUser();
}, []);
*/

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-background' : 'bg-transparent'
          }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                className="h-8 w-auto"
                src="globe.svg"
                alt="Gariflex"
                width={32}
                height={32}
              />
            </Link>
            <span className="ml-2 text-lg font-bold">Gariflex</span>
          </div>

          {/* Centered nav items */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`text-base font-medium ${activeSection === item.href.substring(1)
                    ? 'text-teal-500'
                    : 'text-foreground hover:text-white'
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
           
            <Button variant={"destructive"}> Log out <ArrowRight className="ml-1" size={16} /> </Button>
           
            <>
            <RegisterLink>
            <Button className="rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold hover:bg-teal-700"> Get Started </Button>
            </RegisterLink>
            <LoginLink>
           <Button variant={"ghost"}> Log in <ArrowRight className="ml-1" size={16} /> </Button>
           </LoginLink>
           </>
           
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
        <div className="fixed top-20 left-0 right-0 z-40 bg-background p-4">
          <div className="relative mx-auto w-full max-w-xl">
            <Input
              type="text"
              placeholder="Search your dream car"
              className="w-full bg-transparent text-white placeholder-white placeholder-search backdrop-blur-sm pr-12 border-search focus-visible:ring-1 focus-visible:ring-search"
            />
            <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-teal-500" />
          </div>
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
                <Image
                  className="h-8 w-auto"
                  src="globe.svg"
                  alt="Gariflex"
                  width={32}
                  height={32}
                />
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
            <div className="mt-6 flow-root">
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
              <Link
                href="/get-started"
                className="rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold hover:bg-teal-700"
              >
                Get Started
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
  );
}
