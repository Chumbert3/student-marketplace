'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function SellItemPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Electronics')
  const [condition, setCondition] = useState('Used')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    let image_url = ''

    if (image) {
      const fileExt = image.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, image, {
          cacheControl: '3600',
          upsert: false,
          contentType: image.type
        })
      if (data) {
        const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
        image_url = urlData.publicUrl
      }
      if (error) console.log('Upload error:', error)
    }

    await supabase.from('items').insert({
      title,
      description,
      price: parseFloat(price),
      category,
      condition,
      image_url,
    })
    setLoading(false)
    router.push('/items')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-bold">Student Marketplace</h1>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">List an item for sale</h2>

        <div className="bg-white rounded-xl border p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="What are you selling?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              rows={3}
              placeholder="Describe the item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Textbooks</option>
              <option>Clothing</option>
              <option>Sports</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Condition</label>
            <select
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option>New</option>
              <option>Like New</option>
              <option>Used</option>
              <option>For Parts</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Price ($)</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="0.00"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Photo</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Listing...' : 'List item'}
          </button>
        </div>
      </div>
    </main>
  )
}