'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'

// This will be replaced with actual data fetching from Sanity
const breakingNews = [
  {
    id: '1',
    title: 'Isreal-Palestine Conflict',
    category: 'ASIA & OCEANIA',
    excerpt: 'Tensions remain high between Israelis and Palestinians, with sporadic violence and continued disputes over contested territories and the status of Jerusalem.',
    image: '/01.jpg',
    author: 'By Pigeon Team',
  },
  {
    id: '2',
    title: 'Ukraine Crisis Developments',
    category: 'EUROPE',
    excerpt: 'Latest updates on the ongoing situation in Ukraine as international community responds to recent developments.',
    image: '/03.jpg',
    author: 'By Pigeon Team',
  },
  {
    id: '3',
    title: 'South China Sea Tensions',
    category: 'ASIA & OCEANIA',
    excerpt: 'Rising concerns over maritime disputes and military presence in the South China Sea region.',
    image: '/placeholder3.jpg',
    author: 'By Pigeon Team',
  }
]

const mockArticles = [
  {
    id: '4',
    title: 'Understanding Global Tensions',
    excerpt: 'A comprehensive analysis of current global conflicts.',
    image: '/placeholder.jpg',
    date: '2024-03-22',
  },
  {
    id: '5',
    title: 'Peace Initiatives in Focus',
    excerpt: 'Examining international efforts for conflict resolution.',
    image: '/placeholder2.jpg',
    date: '2024-03-22',
  },
  {
    id: '6',
    title: 'Humanitarian Crisis Response',
    excerpt: 'How organizations are helping affected populations.',
    image: '/placeholder3.jpg',
    date: '2024-03-22',
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % breakingNews.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % breakingNews.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + breakingNews.length) % breakingNews.length)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Hero Section with Slideshow */}
        <section className="relative h-screen">
          {breakingNews.map((article, index) => (
            <div
              key={article.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Link href={`/article/${article.id}`}>
                <div className="relative h-screen w-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover brightness-75"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                      <span className="text-sm font-medium mb-2 md:mb-4 block">
                        {article.category}
                      </span>
                      <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
                        {article.title}
                      </h1>
                      <p className="text-base md:text-lg mb-2 md:mb-4">
                        {article.excerpt}
                      </p>
                      <span className="text-sm">
                        {article.author}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* Slideshow Controls */}
          <div className="absolute bottom-1/2 left-0 right-0 flex justify-between px-4 md:px-12 z-10">
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress Dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
            {breakingNews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockArticles.map((article) => (
              <Link 
                key={article.id} 
                href={`/article/${article.id}`}
                className="group"
              >
                <div className="relative h-64 w-full mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  {article.excerpt}
                </p>
                <time className="text-sm text-gray-500">
                  {new Date(article.date).toLocaleDateString()}
                </time>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
} 