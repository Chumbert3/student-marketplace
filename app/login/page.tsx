'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit() {
    setLoading(true)
    setError('')
    setMessage('')
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('Check your email to confirm your account!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ff8c42 0%, #ffb347 30%, #fff8ee 60%, #ffecd2 100%)' }}>

      <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: 24, padding: '40px 36px', width: '100%', maxWidth: 420, border: '1px solid rgba(255,140,66,0.2)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>

        <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px', display: 'block', marginBottom: 4 }}>
          Campus
        </Link>
        <p style={{ fontFamily: 'system-ui', fontSize: '0.9rem', color: '#7a4a1e', marginBottom: 32 }}>
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontFamily: 'system-ui', fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>Email</label>
            <input
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginTop: 6, width: '100%', border: '1.5px solid #e5d5c5', borderRadius: 12, padding: '10px 14px', fontSize: '0.9rem', fontFamily: 'system-ui', outline: 'none', background: '#fffaf6', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontFamily: 'system-ui', fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginTop: 6, width: '100%', border: '1.5px solid #e5d5c5', borderRadius: 12, padding: '10px 14px', fontSize: '0.9rem', fontFamily: 'system-ui', outline: 'none', background: '#fffaf6', boxSizing: 'border-box' }}
            />
          </div>

          {error && <p style={{ fontFamily: 'system-ui', fontSize: '0.85rem', color: '#cc0000' }}>{error}</p>}
          {message && <p style={{ fontFamily: 'system-ui', fontSize: '0.85rem', color: '#2e7d32' }}>{message}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ background: '#cc5500', color: '#fff', padding: '12px', borderRadius: 12, fontSize: '0.95rem', fontFamily: 'system-ui', fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, marginTop: 8 }}
          >
            {loading ? 'Loading...' : isSignUp ? 'Create account' : 'Sign in'}
          </button>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ fontFamily: 'system-ui', fontSize: '0.85rem', color: '#7a4a1e', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </main>
  )
}
