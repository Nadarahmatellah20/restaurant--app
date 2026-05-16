import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import Footer from '@/components/Footer'
import { getFoods, Food } from '@/lib/foods'

const categories = [
  { name: 'Pizza', img: '/pizza.jpg' },
  { name: 'Burger', img: '/burger.jpg' },
  { name: 'Momo', img: '/momo.jpg' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [foods, setFoods] = useState<Food[]>([])

  useEffect(() => { setFoods(getFoods().slice(0, 6)) }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cover bg-center bg-no-repeat py-28 md:py-40"
        style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.52)' }} />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Délicieux plats livrés</h1>
          <p className="text-white text-lg mb-8" style={{ opacity: 0.8 }}>Commandez votre plat préféré depuis notre menu</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center"
            onSubmit={(e) => { e.preventDefault(); window.location.href = '/foods' }}>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un plat..."
              className="w-full sm:w-96 px-4 py-3 rounded-xl text-gray-800 text-base focus:outline-none shadow-lg" />
            <button type="submit" className="text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
              style={{ backgroundColor: '#ff6b81' }}>Rechercher</button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Explorer les catégories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link href="/foods" key={cat.name}>
              <div className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow">
                <img src={cat.img} alt={cat.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="py-14" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Notre Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {foods.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4 items-start">
                <img src={item.img} alt={item.title} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-base">{item.title}</h4>
                  <p className="font-bold text-lg mt-0.5" style={{ color: '#ff6b81' }}>${item.price.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.desc}</p>
                  <Link href={`/order/${item.id}`}>
                    <button className="mt-3 text-white text-sm px-4 py-1.5 rounded-lg font-medium"
                      style={{ backgroundColor: '#ff6b81' }}>Commander</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/foods">
              <span className="font-semibold cursor-pointer" style={{ color: '#ff6b81' }}>Voir tout le menu →</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
