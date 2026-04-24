import { supabase } from '../lib/supabase'

export default async function ItemsPage() {
  const { data: items } = await supabase.from('items').select('*')

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Student Marketplace</h1>
        <a href="/sell-item" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm">Sell an Item</a>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-2">Buy & Sell</h2>
        <p className="text-gray-500 mb-10">Electronics, furniture, textbooks and more.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
      </div>
    </main>
  )
}
