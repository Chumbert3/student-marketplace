'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from './lib/supabase'

export default function Home() {
  const [listings, setListings] = useState<any[]>([])
  const [jobs, setJobs] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)

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
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Student Marketplace</Link>
        <div className="flex gap-4 items-center">
          <Link href="/jobs" className="text-gray-600 hover:text-black text-sm">Jobs Board</Link>
          <Link href="/items" className="text-gray-600 hover:text-black text-sm">Buy & Sell</Link>
          {user ? (
            <>
              <span className="text-gray-500 text-sm">{user.email}</span>
              <button onClick={handleLogout} className="text-gray-600 hover:text-black text-sm">Logout</button>
            </>
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-black text-sm">Login</Link>
          )}
          <Link href="/sell" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm">Launch Your Service</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="flex justify-between items-center mb-2">
          <h2 className="text-4xl font-bold">Student Services</h2>
          <Link href="/sell" className="text-sm border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition">Offer a Service</Link>
        </div>
        <p className="text-gray-500 mb-8">Browse services offered by students at your school.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl border p-4 hover:shadow-md transition">
              {listing.image_url ? (
                <img src={listing.image_url} alt={listing.title} className="rounded-lg h-40 w-full object-cover mb-4" />
              ) : (
                <div className="bg-gray-100 rounded-lg h-40 mb-4" />
              )}
              <h3 className="font-semibold">{listing.title}</h3>
              <p className="text-gray-500 text-sm">{listing.description}</p>
              <p className="font-bold mt-2">${listing.price}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-2">
          <h2 className="text-4xl font-bold">Buy & Sell</h2>
          <Link href="/sell-item" className="text-sm border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition">Sell an Item</Link>
        </div>
        <p className="text-gray-500 mb-8">Electronics, furniture, textbooks and more.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {items.map((item) => (
            <Link href={`/items/${item.id}`} key={item.id} className="bg-white rounded-xl border p-4 hover:shadow-md transition cursor-pointer block">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="rounded-lg h-40 w-full object-cover mb-4" />
              ) : (
                <div className="bg-gray-100 rounded-lg h-40 mb-4" />
              )}
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{item.title}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{item.condition}</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">{item.description}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold">${item.price}</p>
                <span className="text-xs text-gray-400">{item.category}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-between items-center mb-2">
          <h2 className="text-4xl font-bold">Jobs Board</h2>
          <Link href="/post-job" className="text-sm border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition">Post a Job</Link>
        </div>
        <p className="text-gray-500 mb-8">Students looking for help — apply to earn.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl border p-4 hover:shadow-md transition">
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{job.description}</p>
              <p className="font-bold mt-2 text-green-600">Budget: ${job.budget}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
