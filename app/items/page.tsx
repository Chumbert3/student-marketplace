'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default function ItemsPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('items').select('*').then(({ data }) => {
      setItems(data || [])
      setLoading(false)
    })
  }, [])

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ff8c42 0%, #ffb347 30%, #fff8ee 60%, #ffecd2 100%)', fontFamily: 'Georgia, serif' }}>

      {/* Nav */}
      <nav style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,140,66,0.2)' }} className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px' }}>
          Campus
        </Link>
        <Link href="/marketplace" style={{ background: '#cc5500', color: '#fff', padding: '8px 18px', borderRadius: '999px', fontSize: '0.82rem', fontFamily: 'system-ui', fontWeight: 600 }}>
          + Sell an Item
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-5 py-10 pb-24">

        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.8rem', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 8 }}>
          Buy & <em style={{ color: '#cc5500' }}>Sell.</em>
        </h1>
        <p style={{ fontFamily: 'system-ui', fontSize: '0.95rem', color: '#7a4a1e', marginBottom: 32 }}>
          Electronics, furniture, textbooks and more.
        </p>

        {loading ? (
          <p style={{ fontFamily: 'system-ui', color: '#aaa' }}>Loading...</p>
        ) : items.length === 0 ? (
          <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 20, padding: 32, textAlign: 'center' }}>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#888' }}>No items listed yet.</p>
            <Link href="/marketplace" style={{ display: 'inline-block', marginTop: 16, background: '#cc5500', color: '#fff', padding: '10px 24px', borderRadius: 999, fontFamily: 'system-ui', fontWeight: 600, fontSize: '0.9rem' }}>
              List the first one
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((item) => (
              <Link href={`/items/${item.id}`} key={item.id} style={{ background: 'rgba(255,255,255,0.75)', borderRadius: 20, padding: 16, border: '1px solid rgba(255,140,66,0.2)', display: 'flex', gap: 14, alignItems: 'center', textDecoration: 'none' }}>
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} style={{ width: 80, height: 80, borderRadius: 14, objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 80, height: 80, borderRadius: 14, background: '#ffe5cc', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>📦</div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                    <span style={{ background: '#1a1a1a', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999, fontFamily: 'system-ui', textTransform: 'uppercase', letterSpacing: 1 }}>FOR SALE</span>
                    {item.condition && <span style={{ background: '#f5f5f5', color: '#666', fontSize: '0.65rem', fontWeight: 600, padding: '2px 8px', borderRadius: 999, fontFamily: 'system-ui' }}>{item.condition}</span>}
                    {item.category && <span style={{ background: '#fff3e0', color: '#cc5500', fontSize: '0.65rem', fontWeight: 600, padding: '2px 8px', borderRadius: 999, fontFamily: 'system-ui' }}>{item.category}</span>}
                  </div>
                  <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: '#1a1a1a', fontSize: '1.05rem', marginTop: 2 }}>{item.title}</p>
                  <p style={{ fontFamily: 'system-ui', fontSize: '0.82rem', color: '#666', marginTop: 2 }}>{item.description}</p>
                  <p style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#1a1a1a', marginTop: 6, fontSize: '0.95rem' }}>${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,140,66,0.2)', padding: '10px 0 16px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
          <span style={{ fontSize: '1.3rem' }}>🏠</span>
          <span style={{ fontFamily: 'system-ui', fontSize: '0.6rem', color: '#888' }}>Home</span>
        </Link>
        <Link href="/items" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
          <span style={{ fontSize: '1.3rem' }}>🔍</span>
          <span style={{ fontFamily: 'system-ui', fontSize: '0.6rem', color: '#1a1a1a', fontWeight: 700 }}>Browse</span>
        </Link>
        <Link href="/services" style={{ background: '#cc5500', width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', boxShadow: '0 4px 16px rgba(204,85,0,0.4)' }}>
          <span style={{ color: '#fff', fontSize: '1.6rem', lineHeight: 1 }}>+</span>
        </Link>
        <Link href="/gigs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
          <span style={{ fontSize: '1.3rem' }}>💼</span>
          <span style={{ fontFamily: 'system-ui', fontSize: '0.6rem', color: '#888' }}>Jobs</span>
        </Link>
        <Link href="/login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
          <span style={{ fontSize: '1.3rem' }}>👤</span>
          <span style={{ fontFamily: 'system-ui', fontSize: '0.6rem', color: '#888' }}>Profile</span>
        </Link>
      </div>

    </main>
  )
}
