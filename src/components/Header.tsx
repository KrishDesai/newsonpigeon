'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="bg-white rounded-full px-6 py-2 shadow-lg max-w-4xl w-[95vw] relative">
        <div className="flex justify-between items-center h-12">
          <Link href="/" className="relative w-24 h-8">
            <Image
              src="/logo.png"
              alt="Pigeon News"
              fill
              className="object-contain"
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/"
              className="text-gray-700 hover:text-black transition-colors text-sm"
            >
              Articles
            </Link>
            <Link 
              href="/about"
              className="text-gray-700 hover:text-black transition-colors text-sm"
            >
              About Us
            </Link>
            <a 
              href="https://submit.pigeonnews.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors text-sm"
            >
              Submit Issue
            </a>
            <a 
              href="https://donate.pigeonnews.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors text-sm"
            >
              Donate
            </a>
            <Link
              href="/map"
              className="bg-[#2B2B3C] text-white px-4 py-1.5 rounded-full text-sm hover:bg-[#1F1F2C] transition-colors"
            >
              Map
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-10 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 w-5 bg-black transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-5 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-black transform transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`
            absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[90vw] max-w-md
            bg-white rounded-2xl shadow-xl transition-all duration-300 md:hidden
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
          `}
        >
          <div className="flex flex-col p-6 space-y-4">
            <Link 
              href="/"
              className="text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Articles
            </Link>
            <Link 
              href="/about"
              className="text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <a 
              href="https://submit.pigeonnews.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Submit Issue
            </a>
            <a 
              href="https://donate.pigeonnews.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Donate
            </a>
            <Link
              href="/map"
              className="bg-[#2B2B3C] text-white px-4 py-2 rounded-full text-center hover:bg-[#1F1F2C] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Map
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
} 