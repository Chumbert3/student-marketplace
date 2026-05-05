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
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Student Marketplace</Link>
        <Link href="/post-job" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm">Post a Job</Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-2">Jobs board</h2>
        <p className="text-gray-500 mb-10">Students looking for help — apply to earn.</p>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl border p-4 hover:shadow-md transition">
                {job.image_url ? (
                  <img src={job.image_url} alt={job.title} className="rounded-lg h-40 w-full object-cover mb-4" />
                ) : (
                  <div className="bg-gray-100 rounded-lg h-40 mb-4" />
                )}
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{job.description}</p>
                <p className="font-bold mt-2 text-green-600">Budget: ${job.budget}</p>
                <button className="mt-3 w-full border border-black text-black py-1.5 rounded-lg text-sm hover:bg-black hover:text-white transition">
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
