import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, LayoutDashboard, LogOut, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/lib/auth'

export default function Navbar() {
  const [location, setLocation] = useLocation()
  const { user, logout, isAdmin } = useAuth()
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/categories', label: 'Catégories' },
    { href: '/foods', label: 'Menu' },
    { href: '/contact', label: 'Contact' },
  ]

  function handleLogout() {
    logout()
    setLocation('/')
    setDrop(false)
  }

  return (
    <nav style={{ backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/"><img src="/logo.png" alt="Logo" className="h-12 w-auto cursor-pointer" /></Link>

        <ul className="hidden md:flex gap-6 items-center">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>
                <span className="font-semibold text-sm cursor-pointer transition-colors"
                  style={{ color: location === l.href ? '#ff6b81' : '#374151' }}>
                  {l.label}
                </span>
              </Link>
            </li>
          ))}
          {!user ? (
            <li className="flex gap-2 ml-2">
              <Link href="/login">
                <button className="border text-sm px-4 py-1.5 rounded-xl font-medium transition-colors"
                  style={{ borderColor: '#ff6b81', color: '#ff6b81' }}>Connexion</button>
              </Link>
              <Link href="/register">
                <button className="text-sm px-4 py-1.5 rounded-xl font-medium text-white"
                  style={{ backgroundColor: '#ff6b81' }}>S'inscrire</button>
              </Link>
            </li>
          ) : (
            <li className="relative ml-2">
              <button onClick={() => setDrop(!drop)}
                className="flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-xl">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: '#ff6b81' }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[6rem] truncate">{user.name}</span>
              </button>
              {drop && (
                <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-2xl shadow-lg w-48 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button onClick={() => { setLocation(isAdmin ? '/admin' : '/dashboard'); setDrop(false) }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    {isAdmin ? <ShieldCheck size={14} style={{ color: '#ff6b81' }} /> : <LayoutDashboard size={14} style={{ color: '#ff6b81' }} />}
                    {isAdmin ? 'Admin Panel' : 'Mon tableau de bord'}
                  </button>
                  <button onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2">
                    <LogOut size={14} /> Déconnexion
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <ul className="flex flex-col gap-3 mt-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <span onClick={() => setOpen(false)} className="block font-semibold text-sm cursor-pointer"
                    style={{ color: location === l.href ? '#ff6b81' : '#374151' }}>{l.label}</span>
                </Link>
              </li>
            ))}
            {!user ? (
              <li className="flex gap-2 pt-1">
                <Link href="/login"><button onClick={() => setOpen(false)} className="border text-sm px-4 py-1.5 rounded-xl font-medium" style={{ borderColor: '#ff6b81', color: '#ff6b81' }}>Connexion</button></Link>
                <Link href="/register"><button onClick={() => setOpen(false)} className="text-sm px-4 py-1.5 rounded-xl font-medium text-white" style={{ backgroundColor: '#ff6b81' }}>S'inscrire</button></Link>
              </li>
            ) : (
              <>
                <li><Link href={isAdmin ? '/admin' : '/dashboard'}><span onClick={() => setOpen(false)} className="block text-sm font-medium cursor-pointer" style={{ color: '#ff6b81' }}>{isAdmin ? 'Admin Panel' : 'Mon tableau de bord'}</span></Link></li>
                <li><button onClick={() => { handleLogout(); setOpen(false) }} className="text-sm text-red-500 font-medium">Déconnexion</button></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  )
}
