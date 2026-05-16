import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import Footer from '@/components/Footer'
import { getFoods, Food } from '@/lib/foods'

const CATEGORIES = ['Tout', 'Pizza', 'Burger', 'Momo', 'Autre']

export default function Foods() {
  const [foods, setFoods] = useState<Food[]>([])
  const [search, setSearch] = useState('')
  const [active, setActive] = useState('Tout')

  useEffect(() => { setFoods(getFoods()) }, [])

  const filtered = foods.filter((f) => {
    const matchCat = active === 'Tout' || f.category === active
    const matchSearch = f.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Notre Menu</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-8 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors border"
                style={active === cat
                  ? { backgroundColor: '#ff6b81', color: '#fff', borderColor: '#ff6b81' }
                  : { color: '#4b5563', borderColor: '#e5e7eb' }}>
                {cat}
              </button>
            ))}
          </div>
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..." className="w-full sm:w-64 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none text-sm" />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">Aucun plat trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                <img src={item.img} alt={item.title} className="w-full h-44 object-cover" />
                <div className="p-4">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#fff0f3', color: '#ff6b81' }}>{item.category}</span>
                  <h4 className="font-semibold text-gray-800 text-base mt-2">{item.title}</h4>
                  <p className="font-bold text-lg" style={{ color: '#ff6b81' }}>${item.price.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.desc}</p>
                  <Link href={`/order/${item.id}`}>
                    <button className="mt-3 w-full text-white text-sm py-2 rounded-xl font-medium" style={{ backgroundColor: '#ff6b81' }}>
                      Commander
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
