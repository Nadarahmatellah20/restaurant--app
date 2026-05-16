import { Link } from 'wouter'
import Footer from '@/components/Footer'

const categories = [
  { name: 'Pizza', img: '/pizza.jpg' },
  { name: 'Burger', img: '/burger.jpg' },
  { name: 'Momo', img: '/momo.jpg' },
  { name: 'Pasta', img: '/pizza.jpg' },
  { name: 'Sandwich', img: '/burger.jpg' },
  { name: 'Dumplings', img: '/momo.jpg' },
  { name: 'BBQ', img: '/pizza.jpg' },
  { name: 'Wraps', img: '/burger.jpg' },
  { name: 'Noodles', img: '/momo.jpg' },
  { name: 'Tacos', img: '/pizza.jpg' },
  { name: 'Sushi', img: '/burger.jpg' },
  { name: 'Desserts', img: '/momo.jpg' },
]

export default function Categories() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Toutes les Catégories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <Link href="/foods" key={i}>
              <div className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow">
                <img src={cat.img} alt={cat.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                <h3 className="absolute bottom-3 left-3 text-white text-lg font-bold">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
