import { supabase } from './lib/supabase'

export default async function Home() {
  const { data: listings } = await supabase.from('listings').select('*')

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Student Marketplace</h1>
        <div className="flex gap-4">
          <button className="text-gray-600 hover:text-black">Login</button>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">Sell an Item</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-2">Buy and sell on campus</h2>
        <p className="text-gray-500 mb-10">The marketplace for students, by students.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings?.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl border p-4 hover:shadow-md transition">
              <div className="bg-gray-100 rounded-lg h-40 mb-4"/>
              <h3 className="font-semibold">{listing.title}</h3>
              <p className="text-gray-500 text-sm">{listing.description}</p>
              <p className="font-bold mt-2">${listing.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}