'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import type { MarkerData } from '@/components/Map'

// Dynamically import Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), { ssr: false })

const mockMarkers: MarkerData[] = [
  {
    id: '1',
    title: 'Israel-Palestine Conflict',
    location: [31.7683, 35.2137],
    articles: [
      {
        title: 'Latest Developments in Gaza',
        url: '/article/gaza-latest',
        source: 'Pigeon News',
        date: '2024-03-20'
      },
      {
        title: 'Humanitarian Aid Efforts',
        url: '/article/gaza-aid',
        source: 'Pigeon News',
        date: '2024-03-19'
      }
    ],
    externalSources: [
      {
        title: 'UN Security Council Resolution',
        url: 'https://news.un.org',
        source: 'United Nations',
        biasRating: 'center'
      },
      {
        title: 'Peace Process Analysis',
        url: 'https://example.com',
        source: 'Think Tank',
        biasRating: 'center-left'
      }
    ],
    socialMedia: [
      {
        platform: 'Twitter',
        handle: '@UNPeacekeeper',
        url: 'https://twitter.com/UNPeacekeeper'
      }
    ]
  },
  // Add more markers as needed
]

export default function MapPage() {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)
  const [activeTab, setActiveTab] = useState<'articles' | 'sources' | 'social'>('articles')

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker)
  }

  const handleClosePanel = () => {
    setSelectedMarker(null)
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Map markers={mockMarkers} onMarkerClick={handleMarkerClick} />
      
      <div className={`absolute w-full top-0 left-0 z-10 transition-opacity duration-300 ${
        selectedMarker ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <Header />
      </div>
      
      {selectedMarker && (
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-white/95 backdrop-blur-sm border-l border-gray-200 overflow-y-auto z-20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{selectedMarker.title}</h2>
              <button
                onClick={handleClosePanel}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              {(['articles', 'sources', 'social'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors
                    ${activeTab === tab
                      ? 'bg-white text-black shadow'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === 'articles' && (
              <div className="space-y-4">
                {selectedMarker.articles.map((article, i) => (
                  <a
                    key={i}
                    href={article.url}
                    className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <h3 className="font-medium mb-2">{article.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{article.source}</span>
                      <span className="mx-2">•</span>
                      <span>{article.date}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {activeTab === 'sources' && (
              <div className="space-y-4">
                {selectedMarker.externalSources.map((source, i) => (
                  <a
                    key={i}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <h3 className="font-medium mb-2">{source.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{source.source}</span>
                      {source.biasRating && (
                        <span className={`px-2 py-1 rounded text-xs font-medium
                          ${source.biasRating === 'center' ? 'bg-green-100 text-green-800' :
                            source.biasRating === 'center-left' ? 'bg-blue-100 text-blue-800' :
                            source.biasRating === 'center-right' ? 'bg-purple-100 text-purple-800' :
                            source.biasRating === 'left' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {source.biasRating.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-4">
                {selectedMarker.socialMedia.map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="mr-3">
                      {social.platform === 'Twitter' && (
                        <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{social.handle}</div>
                      <div className="text-sm text-gray-500">{social.platform}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 