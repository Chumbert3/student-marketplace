'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('jobs').select('*').then(({ data }) => {
      setJobs(data || [])
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
        <Link href="/post-job" style={{ background: '#cc5500', color: '#fff', padding: '8px 18px', borderRadius: '999px', fontSize: '0.82rem', fontFamily: 'system-ui', fontWeight: 600 }}>
          + Post a Job
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-5 py-10 pb-24">

        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.8rem', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 8 }}>
          Jobs <em style={{ color: '#cc5500' }}>board.</em>
        </h1>
        <p style={{ fontFamily: 'system-ui', fontSize: '0.95rem', color: '#7a4a1e', marginBottom: 32 }}>
          Students looking for help — apply to earn.
        </p>

        {loading ? (
          <p style={{ fontFamily: 'system-ui', color: '#aaa' }}>Loading...</p>
        ) : jobs.length === 0 ? (
          <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 20, padding: 32, textAlign: 'center' }}>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#888' }}>No jobs posted yet.</p>
            <Link href="/post-job" style={{ display: 'inline-block', marginTop: 16, background: '#cc5500', color: '#fff', padding: '10px 24px', borderRadius: 999, fontFamily: 'system-ui', fontWeight: 600, fontSize: '0.9rem' }}>
              Post the first one
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {jobs.map((job) => (
              <div key={job.id} style={{ background: 'rgba(255,255,255,0.75)', borderRadius: 20, padding: 16, border: '1px solid rgba(255,140,66,0.2)', display: 'flex', gap: 14, alignItems: 'center' }}>
                {job.image_url ? (
                  <img src={job.image_url} alt={job.title} style={{ width: 80, height: 80, borderRadius: 14, objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 80, height: 80, borderRadius: 14, background: '#e8f5e9', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>💼</div>
                )}
                <div style={{ flex: 1 }}>
                  <span style={{ background: '#e8f5e9', color: '#2e7d32', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999, fontFamily: 'system-ui', textTransform: 'uppercase', letterSpacing: 1 }}>NEEDS HELP</span>
                  <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: '#1a1a1a', fontSize: '1.05rem', marginTop: 4 }}>{job.title}</p>
                  <p style={{ fontFamily: 'system-ui', fontSize: '0.82rem', color: '#666', marginTop: 2 }}>{job.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <p style={{ fontFamily: 'system-ui', fontWeight: 700, color: '#2e7d32', fontSize: '0.95rem' }}>Budget: ${job.budget}</p>
                    <button style={{ background: '#1a1a1a', color: '#fff', padding: '6px 16px', borderRadius: 999, fontSize: '0.75rem', fontFamily: 'system-ui', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                      Apply
                    </button>
                  </div>
                </div>
              </div>
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
          <span style={{ fontFamily: 'system-ui', fontSize: '0.6rem', color: '#888' }}>Browse</span>
        </Link>
        <Link href="/sell" style={{ background: '#cc5500', width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', boxShadow: '0 4px 16px rgba(204,85,0,0.4)' }}>
          <span style={{ color: '#fff', fontSize: '1.6rem', lineHeight: 1 }}>+</span>
        </Link>
        <Link href="/jobs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
          <span style={{ fontSize: '1.3rem' }}>💼</span>
          <span style={{ fontFamily: 'system-ui', fontSize: '0.6rem', color: '#1a1a1a', fontWeight: 700 }}>Jobs</span>
        </Link>
        <Link href="/login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
          <span style={{ fontSize: '1.3rem' }}>👤</span>
          <span style={{ fontFamily: 'system-ui', fontSize: '0.6rem', color: '#888' }}>Profile</span>
        </Link>
      </div>

    </main>
  )
}
