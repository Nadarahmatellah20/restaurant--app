import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useAuth } from '@/lib/auth'
import { getOrders, updateOrderStatus, deleteOrder, Order } from '@/lib/orders'
import { getFoods, addFood, updateFood, deleteFood, Food } from '@/lib/foods'
import { getContactMessages, deleteContactMessage, ContactMessage } from '@/lib/contactMessages'

const TABS = ['Aperçu', 'Commandes', 'Messages', 'Menu', 'Utilisateurs'] as const
type Tab = typeof TABS[number]

const STATUS_COLORS: Record<string, string> = {
  pending: '#fef3c7|#d97706',
  preparing: '#dbeafe|#2563eb',
  delivered: '#dcfce7|#16a34a',
  cancelled: '#fee2e2|#dc2626',
}
const STATUS_OPTIONS = ['pending', 'preparing', 'delivered', 'cancelled']
const STATUS_FR: Record<string, string> = { pending: 'En attente', preparing: 'En préparation', delivered: 'Livré', cancelled: 'Annulé' }
const CATEGORIES = ['Pizza', 'Burger', 'Momo', 'Pasta', 'Tacos', 'Salade', 'Grill', 'Dessert', 'Boissons', 'Autre']
const IMG_OPTIONS = ['/menu-pizza.jpg', '/menu-burger.jpg', '/menu-momo.jpg', '/menu-pasta.png', '/menu-tacos.png', '/menu-salad.png', '/menu-grill.png', '/menu-dessert.png', '/menu-drinks.png', '/pizza.jpg', '/burger.jpg', '/momo.jpg', '/bg.jpg']

const EMPTY_FORM = { title: '', price: '', img: IMG_OPTIONS[0], desc: '', category: CATEGORIES[0] }

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [, setLocation] = useLocation()
  const [tab, setTab] = useState<Tab>('Aperçu')
  const [orders, setOrders] = useState<Order[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [foods, setFoods] = useState<Food[]>([])
  const [users, setUsers] = useState<{ id: string; name: string; email: string; role: string }[]>([])
  const [editFood, setEditFood] = useState<Food | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    if (!user || user.role !== 'admin') { setLocation('/login'); return }
    refresh()
  }, [user])

  function refresh() {
    setOrders(getOrders().reverse())
    setMessages(getContactMessages().reverse())
    setFoods(getFoods())
    try {
      const raw = localStorage.getItem('restaurant_users')
      setUsers(raw ? JSON.parse(raw).map(({ id, name, email, role }: { id: string; name: string; email: string; role: string }) => ({ id, name, email, role })) : [])
    } catch { setUsers([]) }
  }

  if (!user || user.role !== 'admin') return null

  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0)

  function openAdd() { setEditFood(null); setForm(EMPTY_FORM); setShowForm(true) }
  function openEdit(food: Food) { setEditFood(food); setForm({ title: food.title, price: String(food.price), img: food.img, desc: food.desc, category: food.category }); setShowForm(true) }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const data = { title: form.title, price: parseFloat(form.price), img: form.img, desc: form.desc, category: form.category }
    if (editFood) updateFood({ ...data, id: editFood.id }); else addFood(data)
    setShowForm(false); refresh()
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="h-9" />
            <span className="font-bold text-gray-800 text-lg">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">👋 {user.name}</span>
            <button onClick={() => { logout(); setLocation('/') }} className="border border-gray-200 text-gray-600 text-sm px-3 py-1.5 rounded-lg">Déconnexion</button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors"
              style={{ borderColor: tab === t ? '#ff6b81' : 'transparent', color: tab === t ? '#ff6b81' : '#6b7280' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* OVERVIEW */}
        {tab === 'Aperçu' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Commandes', value: orders.length, color: '#1f2937', icon: '📦' },
                { label: 'En attente', value: orders.filter(o => o.status === 'pending').length, color: '#d97706', icon: '⏳' },
                { label: 'Messages', value: messages.length, color: '#0891b2', icon: '✉️' },
                { label: 'Revenus', value: `$${revenue.toFixed(2)}`, color: '#ff6b81', icon: '💰' },
                { label: 'Plats', value: foods.length, color: '#2563eb', icon: '🍽️' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between">
                <h3 className="font-semibold text-gray-800">Derniers messages</h3>
                <button onClick={() => setTab('Messages')} className="text-sm" style={{ color: '#ff6b81' }}>Voir tout →</button>
              </div>
              {messages.slice(0, 3).map((message) => (
                <div key={message.id} className="px-6 py-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{message.name}</p>
                      <p className="text-xs text-gray-500">{message.email} • {new Date(message.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#ecfeff', color: '#0891b2' }}>
                      Contact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{message.message}</p>
                </div>
              ))}
              {messages.length === 0 && <div className="text-center py-10 text-gray-400 text-sm">Aucun message</div>}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between">
                <h3 className="font-semibold text-gray-800">Dernières commandes</h3>
                <button onClick={() => setTab('Commandes')} className="text-sm" style={{ color: '#ff6b81' }}>Voir tout →</button>
              </div>
              {orders.slice(0, 5).map((order) => {
                const [bg, txt] = STATUS_COLORS[order.status].split('|')
                return (
                  <div key={order.id} className="px-6 py-4 flex items-center justify-between border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{order.item.title}</p>
                      <p className="text-xs text-gray-500">{order.userName} • {new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: bg, color: txt }}>{STATUS_FR[order.status]}</span>
                      <span className="text-sm font-bold" style={{ color: '#ff6b81' }}>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                )
              })}
              {orders.length === 0 && <div className="text-center py-10 text-gray-400 text-sm">Aucune commande</div>}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === 'Commandes' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Toutes les commandes ({orders.length})</h3>
            </div>
            {orders.length === 0 ? <div className="text-center py-16 text-gray-400 text-sm">Aucune commande</div> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      {['ID', 'Client', 'Plat', 'Total', 'Statut', 'Action'].map(h => (
                        <th key={h} className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-500 text-xs font-mono">{order.id}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-800">{order.userName}</p>
                          <p className="text-gray-400 text-xs">{order.userEmail}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-gray-700">{order.item.title}</p>
                          <p className="text-gray-400 text-xs">Qté: {order.item.qty}</p>
                        </td>
                        <td className="px-4 py-3 font-bold" style={{ color: '#ff6b81' }}>${order.total.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <select value={order.status} onChange={(e) => { updateOrderStatus(order.id, e.target.value as Order['status']); refresh() }}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none">
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_FR[s]}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => { if (confirm('Supprimer ?')) { deleteOrder(order.id); refresh() } }} className="text-red-400 hover:text-red-600 text-xs">Supprimer</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* MESSAGES */}
        {tab === 'Messages' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Messages de contact ({messages.length})</h3>
            </div>
            {messages.length === 0 ? <div className="text-center py-16 text-gray-400 text-sm">Aucun message</div> : (
              <div className="divide-y divide-gray-50">
                {messages.map((message) => (
                  <div key={message.id} className="px-6 py-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{message.name}</p>
                        <p className="text-gray-400 text-xs">{message.email}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(message.createdAt).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      <button
                        onClick={() => { if (confirm('Supprimer ce message ?')) { deleteContactMessage(message.id); refresh() } }}
                        className="self-start text-red-400 hover:text-red-600 text-xs"
                      >
                        Supprimer
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 whitespace-pre-line">{message.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* FOODS */}
        {tab === 'Menu' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-800">Plats ({foods.length})</h3>
              <button onClick={openAdd} className="text-white text-sm px-4 py-2 rounded-xl font-medium" style={{ backgroundColor: '#ff6b81' }}>+ Ajouter</button>
            </div>

            {showForm && (
              <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">{editFood ? 'Modifier le plat' : 'Ajouter un plat'}</h3>
                  <form onSubmit={handleSave} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                      <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full border border-gray-200 px-3 py-2 rounded-xl text-sm focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix ($)</label>
                        <input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="w-full border border-gray-200 px-3 py-2 rounded-xl text-sm focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-sm focus:outline-none">
                          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                      <select value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} className="w-full border border-gray-200 px-3 py-2 rounded-xl text-sm focus:outline-none">
                        {IMG_OPTIONS.map(img => <option key={img} value={img}>{img}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={2} required className="w-full border border-gray-200 px-3 py-2 rounded-xl text-sm focus:outline-none resize-none" />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm">Annuler</button>
                      <button type="submit" className="flex-1 text-white py-2 rounded-xl text-sm font-medium" style={{ backgroundColor: '#ff6b81' }}>{editFood ? 'Enregistrer' : 'Ajouter'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {foods.map((food) => (
                <div key={food.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <img src={food.img} alt={food.title} className="w-full h-36 object-cover" />
                  <div className="p-4">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#fff0f3', color: '#ff6b81' }}>{food.category}</span>
                    <h4 className="font-semibold text-gray-800 text-sm mt-2">{food.title}</h4>
                    <p className="font-bold" style={{ color: '#ff6b81' }}>${food.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{food.desc}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => openEdit(food)} className="flex-1 border border-gray-200 text-gray-600 text-xs py-1.5 rounded-lg">Modifier</button>
                      <button onClick={() => { if (confirm('Supprimer ?')) { deleteFood(food.id); refresh() } }} className="flex-1 border border-gray-200 text-red-400 text-xs py-1.5 rounded-lg">Supprimer</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === 'Utilisateurs' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Utilisateurs ({users.length})</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {users.map((u) => (
                <div key={u.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: u.role === 'admin' ? '#ff6b81' : '#60a5fa' }}>
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{u.name}</p>
                      <p className="text-gray-400 text-xs">{u.email}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={u.role === 'admin' ? { backgroundColor: '#fff0f3', color: '#ff6b81' } : { backgroundColor: '#dbeafe', color: '#2563eb' }}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
