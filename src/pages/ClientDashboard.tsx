import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuth } from '@/lib/auth'
import { getUserOrders, Order } from '@/lib/orders'
import Footer from '@/components/Footer'

const STATUS_COLORS: Record<string, string> = {
  pending: '#fef3c7|#d97706',
  preparing: '#dbeafe|#2563eb',
  delivered: '#dcfce7|#16a34a',
  cancelled: '#fee2e2|#dc2626',
}
const STATUS_ICONS: Record<string, string> = { pending: '⏳', preparing: '👨‍🍳', delivered: '✅', cancelled: '❌' }
const STATUS_LABELS: Record<string, string> = { pending: 'En attente', preparing: 'En préparation', delivered: 'Livré', cancelled: 'Annulé' }

export default function ClientDashboard() {
  const { user, logout } = useAuth()
  const [, setLocation] = useLocation()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!user) { setLocation('/login'); return }
    setOrders(getUserOrders(user.id).reverse())
  }, [user])

  if (!user) return null

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mon tableau de bord</h1>
            <p className="text-gray-500 text-sm mt-0.5">Bienvenue, <span style={{ color: '#ff6b81' }} className="font-medium">{user.name}</span></p>
          </div>
          <div className="flex gap-3">
            <Link href="/foods"><button className="text-white text-sm px-4 py-2 rounded-xl font-medium" style={{ backgroundColor: '#ff6b81' }}>Commander</button></Link>
            <button onClick={() => { logout(); setLocation('/') }} className="border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-xl">Déconnexion</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total commandes', value: orders.length, color: '#1f2937' },
            { label: 'Livrées', value: orders.filter(o => o.status === 'delivered').length, color: '#16a34a' },
            { label: 'Total dépensé', value: `$${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}`, color: '#ff6b81' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-3xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Mes commandes</h2>
          </div>
          {orders.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">🍽️</div>
              <p className="font-medium">Aucune commande pour le moment</p>
              <Link href="/foods"><button className="mt-4 text-white text-sm px-5 py-2 rounded-xl" style={{ backgroundColor: '#ff6b81' }}>Voir le menu</button></Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {orders.map((order) => {
                const [bg, txt] = STATUS_COLORS[order.status].split('|')
                return (
                  <div key={order.id} className="p-5 flex gap-4 items-start">
                    <img src={order.item.img} alt={order.item.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{order.item.title}</p>
                          <p className="text-gray-500 text-xs mt-0.5">Qté: {order.item.qty} × ${order.item.price.toFixed(2)}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{new Date(order.createdAt).toLocaleDateString('fr-FR')} • {order.id}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: bg, color: txt }}>
                            {STATUS_ICONS[order.status]} {STATUS_LABELS[order.status]}
                          </span>
                          <p className="font-bold text-sm mt-1" style={{ color: '#ff6b81' }}>${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
