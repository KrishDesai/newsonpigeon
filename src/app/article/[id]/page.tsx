import Header from '@/components/Header'
import Image from 'next/image'

// This will be replaced with actual data fetching from Sanity
const mockArticle = {
  id: '1',
  title: 'Understanding the Middle East Conflict',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  image: '/placeholder.jpg',
  date: '2024-03-22',
  author: 'John Doe',
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <div className="pt-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative h-[400px] w-full mb-8">
            <Image
              src={mockArticle.image}
              alt={mockArticle.title}
              fill
              className="object-cover grayscale"
            />
          </div>
          
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-4">
              {mockArticle.title}
            </h1>
            <div className="flex items-center text-gray-600">
              {mockArticle.author && (
                <span className="mr-4">By {mockArticle.author}</span>
              )}
              <time>{new Date(mockArticle.date).toLocaleDateString()}</time>
            </div>
          </header>
          
          <div className="prose prose-lg max-w-none">
            {mockArticle.content}
          </div>
        </article>
      </div>
    </>
  )
} 