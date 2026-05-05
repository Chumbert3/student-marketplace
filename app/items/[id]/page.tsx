'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function ItemDetailPage() {
  const params = useParams()
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.id) return
    supabase.from('items').select('*').eq('id', params.id).single().then(({ data }) => {
      setItem(data)
      setLoading(false)
    })
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </main>
    )
  }

  if (!item) {
    return (
      <main className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b px-6 py-4">
          <Link href="/" className="text-xl font-bold">Student Marketplace</Link>
        </nav>
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Item not found</h2>
          <Link href="/items" className="text-blue-600 hover:underline">← Back to Buy & Sell</Link>
        </div>
      </main>
    )
  }

  const postedDate = new Date(item.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Student Marketplace</Link>
        <Link href="/items" className="text-gray-600 hover:text-black text-sm">← Back to Buy & Sell</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl border overflow-hidden">
          {item.image_url ? (
            <img src={item.image_url} alt={item.title} className="w-full h-96 object-cover" />
          ) : (
            <div className="w-full h-96 bg-gray-100" />
          )}

          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{item.title}</h1>
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{item.condition}</span>
            </div>

            <p className="text-3xl font-bold text-green-600 mb-6">${item.price}</p>

            <div className="border-t border-b py-4 mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">Description</h2>
              <p className="text-gray-800 whitespace-pre-wrap">{item.description || 'No description provided.'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium">{item.category}</p>
              </div>
              <div>
                <p className="text-gray-500">Condition</p>
                <p className="font-medium">{item.condition}</p>
              </div>
              <div>
                <p className="text-gray-500">Listed</p>
                <p className="font-medium">{postedDate}</p>
              </div>
            </div>

            <button
              onClick={() => alert('Messaging coming soon! 💬')}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 font-medium"
            >
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
