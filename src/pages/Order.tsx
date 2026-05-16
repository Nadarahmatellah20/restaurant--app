import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'wouter'
import { useAuth } from '@/lib/auth'
import { saveOrder } from '@/lib/orders'
import { getFoods, Food } from '@/lib/foods'
import Footer from '@/components/Footer'

export default function Order() {
  const params = useParams<{ id: string }>()
  const { user } = useAuth()
  const [, setLocation] = useLocation()
  const [foods, setFoods] = useState<Food[]>([])
  const [food, setFood] = useState<Food | null>(null)
  const [qty, setQty] = useState(1)
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const all = getFoods()
    setFoods(all)
    setFood(all.find((f) => f.id === parseInt(params.id || '1')) || all[0])
  }, [params.id])

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, name: user.name, email: user.email }))
  }, [user])

  const total = food ? food.price * qty : 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!food) return
    if (!user) { setLocation('/login'); return }
    saveOrder({ userId: user.id, userName: form.name, userEmail: form.email, item: { foodId: food.id, title: food.title, img: food.img, price: food.price, qty }, address: form.address, phone: form.phone, total })
    setSubmitted(true)
  }

  if (!food) return null

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col text-center px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Commande confirmée !</h2>
        <p className="text-gray-500 mb-6">Merci <strong>{form.name}</strong> ! Votre commande de <strong>{food.title} ×{qty}</strong> (total: <span style={{ color: '#ff6b81' }}>${total.toFixed(2)}</span>) a été reçue.</p>
        <div className="flex gap-3">
          <button onClick={() => setLocation('/')} className="text-white px-6 py-2.5 rounded-xl font-semibold" style={{ backgroundColor: '#ff6b81' }}>Accueil</button>
          {user && <button onClick={() => setLocation(user.role === 'admin' ? '/admin' : '/dashboard')} className="border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl font-semibold">Mes commandes</button>}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative bg-cover bg-center py-16" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} />
        <div className="relative max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Confirmer votre commande</h2>
          {!user && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 text-center" style={{ backgroundColor: 'rgba(251,191,36,0.9)' }}>
              ⚠️ Vous devez <button onClick={() => setLocation('/login')} className="underline font-bold">vous connecter</button> pour commander.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <fieldset className="rounded-2xl p-5" style={{ border: '1px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <legend className="text-white font-semibold px-2 text-sm">Plat sélectionné</legend>
              <div className="flex gap-4 items-start mb-3">
                <img src={food.img} alt={food.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                <div>
                  <h3 className="text-white font-bold text-lg">{food.title}</h3>
                  <p className="font-semibold" style={{ color: '#ffb3be' }}>${food.price.toFixed(2)} / unité</p>
                </div>
              </div>
              <div className="flex gap-3 items-center mb-3">
                <label className="text-white text-sm">Changer :</label>
                <select value={food.id} onChange={(e) => setFood(foods.find((f) => f.id === parseInt(e.target.value)) || food)}
                  className="flex-1 text-sm px-3 py-1.5 rounded-xl text-gray-800 focus:outline-none">
                  {foods.map((f) => <option key={f.id} value={f.id}>{f.title} — ${f.price.toFixed(2)}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-white text-sm">Quantité :</label>
                <input type="number" min={1} max={20} value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-2 py-1.5 rounded-xl text-gray-800 text-sm focus:outline-none" />
                <span className="text-white text-sm">Total : <strong style={{ color: '#ffb3be' }}>${total.toFixed(2)}</strong></span>
              </div>
            </fieldset>

            <fieldset className="rounded-2xl p-5 space-y-3" style={{ border: '1px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <legend className="text-white font-semibold px-2 text-sm">Détails de livraison</legend>
              {[
                { label: 'Nom complet', name: 'name', type: 'text', placeholder: 'ex: Jean Dupont' },
                { label: 'Téléphone', name: 'phone', type: 'tel', placeholder: 'ex: +213 555 0000' },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'ex: hello@email.com' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-white text-sm font-medium block mb-1">{f.label}</label>
                  <input type={f.type} name={f.name} value={(form as Record<string, string>)[f.name]}
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    placeholder={f.placeholder} required
                    className="w-full px-4 py-2.5 rounded-xl text-gray-800 focus:outline-none" />
                </div>
              ))}
              <div>
                <label className="text-white text-sm font-medium block mb-1">Adresse</label>
                <textarea name="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                  rows={3} placeholder="Rue, Ville, Pays" required
                  className="w-full px-4 py-2.5 rounded-xl text-gray-800 focus:outline-none resize-none" />
              </div>
              <button type="submit" className="w-full text-white font-semibold py-3 rounded-xl" style={{ backgroundColor: '#ff6b81' }}>
                {user ? 'Confirmer la commande' : 'Se connecter pour commander'}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
