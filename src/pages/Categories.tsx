import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { ArrowRight, Beef, CakeSlice, ChefHat, CircleEllipsis, Coffee, Flame, Pizza, Salad, Search, Soup, Utensils } from 'lucide-react'
import Footer from '@/components/Footer'
import { Food, getFoods } from '@/lib/foods'

const categories = [
  { name: 'Pizza', img: '/pizza.jpg', icon: Pizza, desc: 'Pizzas croustillantes, sauces maison et fromage fondant.' },
  { name: 'Burger', img: '/burger.jpg', icon: Beef, desc: 'Burgers généreux avec pain moelleux et garnitures fraîches.' },
  { name: 'Momo', img: '/momo.jpg', icon: Soup, desc: 'Momos vapeur servis avec une sauce relevée.' },
  { name: 'Pasta', img: '/menu-pasta.png', icon: Utensils, desc: 'Pâtes crémeuses ou épicées, servies bien chaudes.' },
  { name: 'Tacos', img: '/menu-tacos.png', icon: Flame, desc: 'Tacos garnis, sauces maison et fromage fondant.' },
  { name: 'Salade', img: '/menu-salad.png', icon: Salad, desc: 'Options fraîches, légères et préparées à la minute.' },
  { name: 'Grill', img: '/menu-grill.png', icon: Flame, desc: 'Viandes grillées, brochettes et assiettes généreuses.' },
  { name: 'Dessert', img: '/menu-dessert.png', icon: CakeSlice, desc: 'Douceurs gourmandes pour finir le repas.' },
  { name: 'Boissons', img: '/menu-drinks.png', icon: Coffee, desc: 'Jus frais, citronnades et boissons fraîches.' },
  { name: 'Autre', img: '/bg.jpg', icon: CircleEllipsis, desc: 'Suggestions du chef et plats spéciaux du moment.' },
]

export default function Categories() {
  const [foods, setFoods] = useState<Food[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => { setFoods(getFoods()) }, [])

  const categoryCards = categories.map((cat) => {
    const items = foods.filter((food) => food.category === cat.name)
    return { ...cat, items, count: items.length }
  }).filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()))

  const topItems = foods.slice(0, 3)

  return (
    <>
      <main style={{ backgroundColor: '#f9fafb' }}>
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8">
            <div className="grid lg:grid-cols-[1fr_22rem] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: '#fff0f3', color: '#ff6b81' }}>
                  <ChefHat size={16} /> Menu par catégorie
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Trouvez directement ce que vous voulez manger</h1>
                <p className="text-gray-500 mt-3 max-w-2xl">
                  Choisissez une catégorie, comparez rapidement les options, puis passez au menu complet pour commander.
                </p>
              </div>

              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher une catégorie..."
                  className="w-full border border-gray-200 bg-gray-50 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-[1fr_20rem] gap-6 items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {categoryCards.map((cat) => {
                const Icon = cat.icon
                return (
                  <Link href="/foods" key={cat.name}>
                    <article className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer">
                      <div className="grid grid-cols-[8rem_1fr] sm:grid-cols-[10rem_1fr] min-h-44">
                        <div className="relative overflow-hidden">
                          <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/10" />
                        </div>
                        <div className="p-5 flex flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#fff0f3', color: '#ff6b81' }}>
                              <Icon size={22} />
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                              {cat.count} plats
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-gray-900 mt-4">{cat.name}</h2>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{cat.desc}</p>
                          <span className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: '#ff6b81' }}>
                            Explorer <ArrowRight size={16} />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>

            <aside className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 lg:sticky lg:top-24">
              <h3 className="font-bold text-gray-900">Populaire maintenant</h3>
              <p className="text-sm text-gray-500 mt-1">Quelques plats à voir avant de choisir.</p>
              <div className="divide-y divide-gray-100 mt-4">
                {topItems.map((item) => (
                  <Link href={`/order/${item.id}`} key={item.id}>
                    <div className="flex gap-3 py-4 cursor-pointer group">
                      <img src={item.img} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-pink-500">{item.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.category}</p>
                        <p className="text-sm font-bold mt-1" style={{ color: '#ff6b81' }}>${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/foods">
                <button className="w-full mt-3 text-white text-sm px-4 py-2.5 rounded-xl font-semibold" style={{ backgroundColor: '#ff6b81' }}>
                  Voir tout le menu
                </button>
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
