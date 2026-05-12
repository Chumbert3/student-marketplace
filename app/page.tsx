'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from './lib/supabase'

const categories = [
  { label: 'Tutoring', icon: '🎓' },
  { label: 'Moving', icon: '📦' },
  { label: 'Tech', icon: '💻' },
  { label: 'Cleaning', icon: '🧹' },
  { label: 'Rides', icon: '🚗' },
  { label: 'Handy', icon: '🔧' },
]

export default function Home() {
  const [listings, setListings] = useState<any[]>([])
  const [jobs, setJobs] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('All')

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = user?.email?.split('@')[0] ?? null

  useEffect(() => {
    supabase.from('listings').select('*').then(({ data }) => setListings(data || []))
    supabase.from('jobs').select('*').then(({ data }) => setJobs(data || []))
    supabase.from('items').select('*').then(({ data }) => setItems(data || []))
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => { listener.subscription.unsubscribe() }
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #ff8c42 0%, #ffb347 30%, #fff8ee 60%, #ffecd2 100%)', fontFamily: 'Georgia, serif' }}>

      {/* Nav */}
      <nav style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,140,66,0.2)' }} className="px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px' }}>
          Campus
        </Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span style={{ fontSize: '0.8rem', color: '#666', fontFamily: 'system-ui' }}>{user.email}</span>
              <button onClick={handleLogout} style={{ fontSize: '0.8rem', color: '#444', fontFamily: 'system-ui', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <Link href="/login" style={{ fontSize: '0.85rem', color: '#444', fontFamily: 'system-ui' }}>Login</Link>
          )}
          <Link href="/services" style={{ background: '#1a1a1a', color: '#fff', padding: '8px 18px', borderRadius: '999px', fontSize: '0.82rem', fontFamily: 'system-ui', fontWeight: 600 }}>
            + Post
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-5 pb-24">

        {/* Hero greeting */}
        <div className="pt-10 pb-6">
          {user ? (
            <p style={{ fontFamily: 'system-ui', fontSize: '0.9rem', color: '#7a4a1e', marginBottom: 4 }}>{greeting}, {firstName} 👋</p>
          ) : (
            <p style={{ fontFamily: 'system-ui', fontSize: '0.9rem', color: '#7a4a1e', marginBottom: 4 }}>Welcome to</p>
          )}
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '3rem', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Your campus,<br /><em style={{ color: '#cc5500' }}>connected.</em>
          </h1>
          <p style={{ fontFamily: 'system-ui', fontSize: '0.95rem', color: '#5a3a1a', marginTop: 12 }}>Buy, sell, hire, and hustle — all in one place.</p>
        </div>

        {/* Two big action cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div style={{ background: '#1a1a1a', borderRadius: 20, padding: '20px 16px' }}>
            <p style={{ fontFamily: 'system-ui', fontSize: '0.7rem', color: '#999', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Marketplace</p>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Buy or sell <em style={{ color: '#ff8c42' }}>stuff</em></p>
            <div className="flex gap-2 mt-4">
              <Link href="/items" style={{ background: '#fff', color: '#1a1a1a', padding: '6px 14px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, fontFamily: 'system-ui' }}>Buy</Link>
              <Link href="/marketplace" style={{ color: '#fff', padding: '6px 14px', borderRadius: 999, fontSize: '0.75rem', fontFamily: 'system-ui', border: '1px solid #444' }}>Sell</Link>
            </div>
          </div>

          <div style={{ background: '#fff3e0', borderRadius: 20, padding: '20px 16px', border: '1.5px solid #ffb347' }}>
            <p style={{ fontFamily: 'system-ui', fontSize: '0.7rem', color: '#cc5500', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Services</p>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>Need or offer a <em style={{ color: '#cc5500' }}>hand</em></p>
            <div className="flex gap-2 mt-4">
              <Link href="/hire" style={{ background: '#cc5500', color: '#fff', padding: '6px 14px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, fontFamily: 'system-ui' }}>I need help</Link>
              <Link href="/services" style={{ color: '#1a1a1a', padding: '6px 14px', borderRadius: 999, fontSize: '0.75rem', fontFamily: 'system-ui', border: '1px solid #ccc' }}>I'll do it</Link>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 16 }}>Browse by category</h2>
          <div className="grid grid-cols-6 gap-2">
            {categories.map((cat) => (
              <button key={cat.label} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 16, padding: '12px 4px', border: '1px solid rgba(255,140,66,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
                <span style={{ fontFamily: 'system-ui', fontSize: '0.65rem', color: '#444', fontWeight: 600 }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feed tabs */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-4">
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a' }}>On campus today</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['All', 'Services', 'Buy & Sell', 'Jobs'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab === tab ? '#1a1a1a' : 'rgba(255,255,255,0.6)', color: activeTab === tab ? '#fff' : '#444', padding: '7px 16px', borderRadius: 999, fontSize: '0.8rem', fontFamily: 'system-ui', fontWeight: 600, border: '1px solid', borderColor: activeTab === tab ? '#1a1a1a' : 'rgba(255,140,66,0.3)', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        {(activeTab === 'All' || activeTab === 'Services') && listings.map((listing) => (
          <div key={listing.id} style={{ background: 'rgba(255,255,255,0.75)', borderRadius: 20, padding: 16, marginBottom: 12, border: '1px solid rgba(255,140,66,0.2)', display: 'flex', gap: 14, alignItems: 'center' }}>
            {listing.image_url ? (
              <img src={listing.image_url} alt={listing.title} style={{ width: 72, height: 72, borderRadius: 14, objectFit: 'cover', flexShrink: 0 }} />
            ) : (
              <div style={{ width: 72, height: 72, borderRadius: 14, background: '#ffe5cc', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1 }}>
              <span style={{ background: '#fff3e0', color: '#cc5500', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999, fontFamily: 'system-ui', textTransform: 'uppercase', letterSpacing: 1 }}>SERVICE</span>
              <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: '#1a1a1a', fontSize: '1rem', marginTop: 4 }}>{listing.title}</p>
              <p style={{ fontFamily: 'system-ui', fontSize: '0.8rem', color: '#666', marginTop: 2 }}>{listing.description}</p>
              <p style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#1a1a1a', marginTop: 4, fontSize: '0.9rem' }}>${listing.price}/hr</p>
            </div>
          </div>
        ))}

        {/* Items */}
        {(activeTab === 'All' || activeTab === 'Buy & Sell') && items.map((item) => (
          <Link href={`/items/${item.id}`} key={item.id} style={{ background: 'rgba(255,255,255,0.75)', borderRadius: 20, padding: 16, marginBottom: 12, border: '1px solid rgba(255,140,66,0.2)', display: 'flex', gap: 14, alignItems: 'center', textDecoration: 'none' }}>
            {item.image_url ? (
              <img src={item.image_url} alt={item.title} style={{ width: 72, height: 72, borderRadius: 14, objectFit: 'cover', flexShrink: 0 }} />
            ) : (
              <div style={{ width: 72, height: 72, borderRadius: 14, background: '#ffe5cc', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1 }}>
              <span style={{ background: '#1a1a1a', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999, fontFamily: 'system-ui', textTransform: 'uppercase', letterSpacing: 1 }}>FOR SALE</span>
              {item.category && <span style={{ background: '#f5f5f5', color: '#666', fontSize: '0.65rem', fontWeight: 600, padding: '2px 8px', borderRadius: 999, fontFamily: 'system-ui', marginLeft: 6 }}>{item.category}</span>}
              <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: '#1a1a1a', fontSize: '1rem', marginTop: 4 }}>{item.title}</p>
              <p style={{ fontFamily: 'system-ui', fontSize: '0.8rem', color: '#666', marginTop: 2 }}>{item.description}</p>
              <p style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#1a1a1a', marginTop: 4, fontSize: '0.9rem' }}>${item.price}</p>
            </div>
          </Link>
        ))}

        {/* Jobs */}
        {(activeTab === 'All' || activeTab === 'Jobs') && jobs.map((job) => (
          <div key={job.id} style={{ background: 'rgba(255,255,255,0.75)', borderRadius: 20, padding: 16, marginBottom: 12, border: '1px solid rgba(255,140,66,0.2)', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: 14, background: '#e8f5e9', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>💼</div>
            <div style={{ flex: 1 }}>
              <span style={{ background: '#e8f5e9', color: '#2e7d32', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999, fontFamily: 'system-ui', textTransform: 'uppercase', letterSpacing: 1 }}>NEEDS HELP</span>
              <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: '#1a1a1a', fontSize: '1rem', marginTop: 4 }}>{job.title}</p>
              <p style={{ fontFamily: 'system-ui', fontSize: '0.8rem', color: '#666', marginTop: 2 }}>{job.description}</p>
              <p style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#2e7d32', marginTop: 4, fontSize: '0.9rem' }}>Budget: ${job.budget}</p>
            </div>
          </div>
        ))}

      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,140,66,0.2)', padding: '10px 0 16px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
          <span style={{ fontSize: '1.3rem' }}>🏠</span>
          <span style={{ fontFamily: 'system-ui', fontSize: '0.6rem', color: '#1a1a1a', fontWeight: 700 }}>Home</span>
        </Link>
        <Link href="/items" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
          <span style={{ fontSize: '1.3rem' }}>🔍</span>
          <span style={{ fontFamily: 'system-ui', fontSize: '0.6rem', color: '#888' }}>Browse</span>
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
