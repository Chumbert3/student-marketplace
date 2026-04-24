'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function PostJobPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    await supabase.from('jobs').insert({
      title,
      description,
      budget: parseFloat(budget),
    })
    setLoading(false)
    router.push('/jobs')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-bold">Student Marketplace</h1>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Post a job</h2>

        <div className="bg-white rounded-xl border p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">What do you need done?</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="e.g. Help me move furniture"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Details</label>
            <textarea
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              rows={3}
              placeholder="Describe what you need..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Budget ($)</label>
            <input
              className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="0.00"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post job'}
          </button>
        </div>
      </div>
    </main>
  )
}
