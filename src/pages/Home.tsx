import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { ArrowRight, ChefHat, Clock, Search, ShoppingBag, Star, Truck } from 'lucide-react'
import Footer from '@/components/Footer'
import { getFoods, Food } from '@/lib/foods'

const categories = [
  { name: 'Pizza', img: '/pizza.jpg' },
  { name: 'Burger', img: '/burger.jpg' },
  { name: 'Momo', img: '/momo.jpg' },
  { name: 'Pasta', img: '/menu-pasta.png' },
  { name: 'Tacos', img: '/menu-tacos.png' },
  { name: 'Dessert', img: '/menu-dessert.png' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [foods, setFoods] = useState<Food[]>([])
  const [, setLocation] = useLocation()

  useEffect(() => { setFoods(getFoods().slice(0, 6)) }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setLocation('/foods')
  }

  return (
    <>
      <section className="home-animated-hero relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(17,24,39,0.92), rgba(17,24,39,0.70), rgba(17,24,39,0.26))' }} />
        <div className="hero-light hero-light-one" />
        <div className="hero-light hero-light-two" />
        <div className="hero-pattern" />
        <div className="relative max-w-6xl mx-auto px-4 min-h-[660px] grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center py-16">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-5 border border-white/15" style={{ backgroundColor: 'rgba(255,255,255,0.13)' }}>
              <Star size={16} fill="#facc15" color="#facc15" /> Livraison premium à Casablanca
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">Commandez un vrai bon repas, sans attendre</h1>
            <p className="text-lg md:text-xl mb-8 max-w-xl" style={{ color: 'rgba(255,255,255,0.84)' }}>
              Des pizzas généreuses, burgers fondants et momos maison préparés à la minute, emballés proprement et livrés vite.
            </p>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl rounded-2xl p-2 border border-white/10" style={{ backgroundColor: 'rgba(255,255,255,0.13)' }}>
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher pizza, burger..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl text-gray-800 text-base focus:outline-none"
                />
              </div>
              <button type="submit" className="inline-flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl font-semibold shadow-lg" style={{ backgroundColor: '#ff6b81' }}>
                Voir le menu <ArrowRight size={18} />
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 max-w-2xl">
              {[
                { icon: Clock, label: '30 min', text: 'Livraison moyenne' },
                { icon: Truck, label: 'Casablanca', text: 'Zone de livraison' },
                { icon: ShoppingBag, label: 'Commande', text: 'Simple et rapide' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.13)' }}>
                    <Icon size={22} style={{ color: '#ffb3bf' }} />
                    <div>
                      <p className="font-bold text-sm">{item.label}</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.72)' }}>{item.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <img src="/menu-pizza.jpg" alt="Pizza signature" className="w-full h-[440px] object-cover rounded-2xl shadow-2xl border border-white/20" />
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-4 shadow-2xl w-64 border border-gray-100">
                <div className="flex gap-3">
                  <img src="/menu-burger.jpg" alt="Burger maison" className="w-20 h-20 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold" style={{ color: '#ff6b81' }}>Plat populaire</p>
                    <h3 className="font-bold text-gray-900 text-sm mt-1">Burger maison</h3>
                    <p className="text-xs text-gray-500 mt-1">Pain moelleux, sauce chef, service rapide.</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-6 -right-5 bg-white rounded-2xl px-4 py-3 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-2">
                  <ChefHat size={20} style={{ color: '#ff6b81' }} />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Fait maison</p>
                    <p className="text-xs text-gray-500">Chaque jour</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-10 z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-2xl bg-white p-4 shadow-xl border border-gray-100">
          {[
            { value: '4.8/5', label: 'Avis clients' },
            { value: '30 min', label: 'Livraison moyenne' },
            { value: '+25', label: 'Plats au menu' },
            { value: '7j/7', label: 'Service ouvert' },
          ].map((item) => (
            <div key={item.label} className="px-3 py-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#ff6b81' }}>Catégories</p>
            <h2 className="text-3xl font-bold text-gray-800">Choisissez votre envie</h2>
          </div>
          <Link href="/categories">
            <span className="font-semibold cursor-pointer" style={{ color: '#ff6b81' }}>Toutes les catégories</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link href="/foods" key={cat.name}>
              <div className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all border border-gray-100">
                <img src={cat.img} alt={cat.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.72), rgba(17,24,39,0.08))' }} />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <h3 className="text-white text-2xl font-bold">{cat.name}</h3>
                  <span className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center" style={{ color: '#ff6b81' }}>
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: '#ff6b81' }}>Menu</p>
              <h2 className="text-3xl font-bold text-gray-800">Les plats populaires</h2>
            </div>
            <Link href="/foods">
              <span className="font-semibold cursor-pointer" style={{ color: '#ff6b81' }}>Voir tout le menu</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {foods.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100">
                <div className="relative">
                  <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                  <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/95" style={{ color: '#ff6b81' }}>{item.category}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{item.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">Préparé à la commande</p>
                    </div>
                    <p className="font-bold text-lg whitespace-nowrap" style={{ color: '#ff6b81' }}>${item.price.toFixed(2)}</p>
                  </div>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.desc}</p>
                  <Link href={`/order/${item.id}`}>
                    <button className="mt-4 w-full inline-flex items-center justify-center gap-2 text-white text-sm px-4 py-2.5 rounded-xl font-semibold" style={{ backgroundColor: '#ff6b81' }}>
                      Commander <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
