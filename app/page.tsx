import { supabase } from './lib/supabase'

export default async function Home() {
  const { data: listings } = await supabase.from('listings').select('*')
  const { data: jobs } = await supabase.from('jobs').select('*')
  const { data: items } = await supabase.from('items').select('*')

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Student Marketplace</h1>
        <div className="flex gap-4">
          <a href="/jobs" className="text-gray-600 hover:text-black text-sm">Jobs Board</a>
          <a href="/items" className="text-gray-600 hover:text-black text-sm">Buy & Sell</a>
          <a href="/sell" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm">Launch Your Service</a>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Student Services */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-4xl font-bold">Student Services</h2>
          <a href="/sell" className="text-sm border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition">Offer a Service</a>
        </div>
        <p className="text-gray-500 mb-8">Browse services offered by students at your school.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {listings?.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl border p-4 hover:shadow-md transition">
              <div className="bg-gray-100 rounded-lg h-40 mb-4"/>
              <h3 className="font-semibold">{listing.title}</h3>
              <p className="text-gray-500 text-sm">{listing.description}</p>
              <p className="font-bold mt-2">${listing.price}</p>
            </div>
          ))}
        </div>

        {/* Buy & Sell */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-4xl font-bold">Buy & Sell</h2>
          <a href="/sell-item" className="text-sm border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition">Sell an Item</a>
        </div>
        <p className="text-gray-500 mb-8">Electronics, furniture, textbooks and more.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {items?.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border p-4 hover:shadow-md transition">
              <div className="bg-gray-100 rounded-lg h-40 mb-4"/>
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{item.title}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{item.condition}</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">{item.description}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold">${item.price}</p>
                <span className="text-xs text-gray-400">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Jobs Board */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-4xl font-bold">Jobs Board</h2>
          <a href="/post-job" className="text-sm border border-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition">Post a Job</a>
        </div>
        <p className="text-gray-500 mb-8">Students looking for help — apply to earn.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jobs?.map((job) => (
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