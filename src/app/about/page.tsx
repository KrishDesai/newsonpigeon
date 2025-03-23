'use client'

import Header from '@/components/Header'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-black mb-8">About Pigeon News</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-black mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Pigeon News aims to provide unbiased, comprehensive coverage of global conflicts and major news events. 
              We believe in transparency and the power of multiple perspectives to create a more informed world.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-black mb-4">Why Pigeon?</h2>
            <p className="text-gray-700 leading-relaxed">
              The pigeon, historically a symbol of communication and peace, represents our commitment to delivering 
              news that bridges divides rather than creating them. We believe in the power of information to foster 
              understanding and dialogue.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-black mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.jpg"
                    alt="Team member"
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-black">John Doe</h3>
                  <p className="text-gray-600">Founder & Editor-in-Chief</p>
                </div>
              </div>
              {/* Add more team members as needed */}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">Get in Touch</h2>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/pigeonnews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Twitter
              </a>
              <a 
                href="mailto:contact@pigeonnews.com" 
                className="text-blue-600 hover:underline"
              >
                Email
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  )
} 