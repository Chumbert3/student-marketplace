'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function PostJobPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
      } else {
        setCheckingAuth(false)
      }
    })
  }, [router])

  async function handleSubmit() {
    if (!title.trim() || !budget) return
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      let image_url = ''
      if (image) {
        const fileExt = image.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { data, error } = await supabase.storage
          .from('images')
          .upload(fileName, image, { cacheControl: '3600', upsert: false, contentType: image.type })
        if (error) throw error
        const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
        image_url = urlData.publicUrl
      }

      const { error } = await supabase.from('jobs').insert({
        title,
        description,
        budget: parseFloat(budget),
        image_url,
        user_id: user.id,
      })
      if (error) throw error
      router.push('/jobs')
    } catch (err) {
      console.error('Failed to post job:', err)
      alert('Something went wrong. Check the console.')
    } finally {
      setLoading(false)
    }
  }

  if (checkingAuth) return <main className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-400">Loading...</p></main>

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4">
        <Link href="/" className="text-xl font-bold">Student Marketplace</Link>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Post a job</h2>

        <div className="bg-white rounded-xl border p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">What do you need done?</label>
            <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="e.g. Help me move furniture" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Details</label>
            <textarea className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" rows={3} placeholder="Describe what you need..." value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Budget ($)</label>
            <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="0.00" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Photo (optional)</label>
            <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>
          <button onClick={handleSubmit} disabled={loading} className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50">
            {loading ? 'Posting...' : 'Post job'}
          </button>
        </div>
      </div>
    </main>
  )
}
