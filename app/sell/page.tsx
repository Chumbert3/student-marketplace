'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function SellPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/login')
      else setCheckingAuth(false)
    })
  }, [router])

  async function handleSubmit() {
    if (!title.trim() || !price) return
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      let image_url = ''
      if (image) {
        const fileExt = image.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { error } = await supabase.storage.from('images').upload(fileName, image, { cacheControl: '3600', upsert: false, contentType: image.type })
        if (error) throw error
        const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName)
        image_url = urlData.publicUrl
      }

      const { error } = await supabase.from('listings').insert({ title, description, price: parseFloat(price), image_url, user_id: user.id })
      if (error) throw error
      router.push('/')
    } catch (err) {
      console.error(err)
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (checkingAuth) return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ff8c42 0%, #ffb347 30%, #fff8ee 60%, #ffecd2 100%)' }}>
      <p style={{ fontFamily: 'system-ui', color: '#aaa' }}>Loading...</p>
    </main>
  )

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ff8c42 0%, #ffb347 30%, #fff8ee 60%, #ffecd2 100%)', fontFamily: 'Georgia, serif' }}>

      <nav style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,140,66,0.2)' }} className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px' }}>
          Campus
        </Link>
      </nav>

      <div className="max-w-lg mx-auto px-5 py-10 pb-24">
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.8rem', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 8 }}>
          Launch your <em style={{ color: '#cc5500' }}>service.</em>
        </h1>
        <p style={{ fontFamily: 'system-ui', fontSize: '0.95rem', color: '#7a4a1e', marginBottom: 32 }}>Tell students what you can do for them.</p>

        <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 24, padding: 28, border: '1px solid rgba(255,140,66,0.2)', display: 'flex', flexDirection: 'column', gap: 20 }}>

          <div>
            <label style={{ fontFamily: 'system-ui', fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>What service are you offering?</label>
            <input
              style={{ marginTop: 6, width: '100%', border: '1.5px solid #e5d5c5', borderRadius: 12, padding: '10px 14px', fontSize: '0.9rem', fontFamily: 'system-ui', outline: 'none', background: '#fffaf6', boxSizing: 'border-box' }}
              placeholder="e.g. Graphic design, tutoring, photography..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontFamily: 'system-ui', fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>Description</label>
            <textarea
              style={{ marginTop: 6, width: '100%', border: '1.5px solid #e5d5c5', borderRadius: 12, padding: '10px 14px', fontSize: '0.9rem', fontFamily: 'system-ui', outline: 'none', background: '#fffaf6', boxSizing: 'border-box', resize: 'vertical' }}
              rows={3}
              placeholder="Describe your service..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontFamily: 'system-ui', fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>Price ($/hr)</label>
            <input
              type="number"
              style={{ marginTop: 6, width: '100%', border: '1.5px solid #e5d5c5', borderRadius: 12, padding: '10px 14px', fontSize: '0.9rem', fontFamily: 'system-ui', outline: 'none', background: '#fffaf6', boxSizing: 'border-box' }}
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontFamily: 'system-ui', fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              style={{ marginTop: 6, width: '100%', border: '1.5px solid #e5d5c5', borderRadius: 12, padding: '10px 14px', fontSize: '0.85rem', fontFamily: 'system-ui', background: '#fffaf6', boxSizing: 'border-box' }}
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ background: '#cc5500', color: '#fff', padding: '14px', borderRadius: 12, fontSize: '0.95rem', fontFamily: 'system-ui', fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Posting...' : 'Launch service'}
          </button>
        </div>
      </div>
    </main>
  )
}
