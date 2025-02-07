"use client"

import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold text-primary">
            Work Dey Here
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline">Log in</Button>
          <Button>Post job</Button>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t">
          <nav className="flex flex-col p-4">
            <a href="#" className="py-2 hover:text-primary transition-colors">
              Find Jobs
            </a>
            <a href="#" className="py-2 hover:text-primary transition-colors">
              Post a Job
            </a>
            <a href="#" className="py-2 hover:text-primary transition-colors">
              Remote Companies
            </a>
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="outline" className="w-full">
                Log in
              </Button>
              <Button className="w-full">Post job</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

