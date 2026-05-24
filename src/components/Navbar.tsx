import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { ChevronDown, LayoutDashboard, LogIn, LogOut, Menu, ShieldCheck, UserPlus, X } from 'lucide-react'
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

  function isActive(href: string) {
    return href === '/' ? location === '/' : location.startsWith(href)
  }

  function handleLogout() {
    logout()
    setLocation('/')
    setDrop(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <p className="text-base font-bold text-gray-900 leading-none">Restaurant</p>
              <p className="text-xs text-gray-500 mt-1">Fresh food delivery</p>
            </div>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-1 rounded-full border border-gray-100 bg-gray-50 p-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>
                <span
                  className="block rounded-full px-4 py-2 text-sm font-semibold cursor-pointer transition-colors"
                  style={isActive(l.href)
                    ? { backgroundColor: '#fff', color: '#ff6b81', boxShadow: '0 8px 24px rgba(15,23,42,0.08)' }
                    : { color: '#4b5563' }}
                >
                  {l.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="hidden md:flex items-center">
          {!user ? (
            <li className="flex gap-2">
              <Link href="/login">
                <button className="inline-flex items-center gap-2 border text-sm px-4 py-2 rounded-xl font-semibold transition-colors"
                  style={{ borderColor: '#fecdd3', color: '#ff6b81' }}>
                  <LogIn size={16} /> Connexion
                </button>
              </Link>
              <Link href="/register">
                <button className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-semibold text-white shadow-sm"
                  style={{ backgroundColor: '#ff6b81' }}>
                  <UserPlus size={16} /> S'inscrire
                </button>
              </Link>
            </li>
          ) : (
            <li className="relative">
              <button onClick={() => setDrop(!drop)}
                className="flex items-center gap-2 border border-gray-100 bg-white px-3 py-2 rounded-xl shadow-sm">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: '#ff6b81' }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[6rem] truncate">{user.name}</span>
                <ChevronDown size={15} className="text-gray-400" />
              </button>
              {drop && (
                <div className="absolute right-0 top-14 bg-white border border-gray-100 rounded-2xl shadow-xl w-56 p-2 z-50">
                  <div className="px-3 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button onClick={() => { setLocation(isAdmin ? '/admin' : '/dashboard'); setDrop(false) }}
                    className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2">
                    {isAdmin ? <ShieldCheck size={16} style={{ color: '#ff6b81' }} /> : <LayoutDashboard size={16} style={{ color: '#ff6b81' }} />}
                    {isAdmin ? 'Admin Panel' : 'Mon tableau de bord'}
                  </button>
                  <button onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl flex items-center gap-2">
                    <LogOut size={16} /> Déconnexion
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        <button className="md:hidden w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 shadow-lg">
          <ul className="flex flex-col gap-2 mt-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <span
                    onClick={() => setOpen(false)}
                    className="block font-semibold text-sm cursor-pointer rounded-xl px-3 py-2"
                    style={isActive(l.href) ? { color: '#ff6b81', backgroundColor: '#fff0f3' } : { color: '#374151' }}
                  >
                    {l.label}
                  </span>
                </Link>
              </li>
            ))}
            {!user ? (
              <li className="grid grid-cols-2 gap-2 pt-2">
                <Link href="/login"><button onClick={() => setOpen(false)} className="w-full border text-sm px-4 py-2 rounded-xl font-semibold" style={{ borderColor: '#fecdd3', color: '#ff6b81' }}>Connexion</button></Link>
                <Link href="/register"><button onClick={() => setOpen(false)} className="w-full text-sm px-4 py-2 rounded-xl font-semibold text-white" style={{ backgroundColor: '#ff6b81' }}>S'inscrire</button></Link>
              </li>
            ) : (
              <>
                <li className="border-t border-gray-100 pt-2 mt-1"><Link href={isAdmin ? '/admin' : '/dashboard'}><span onClick={() => setOpen(false)} className="block text-sm font-semibold cursor-pointer rounded-xl px-3 py-2" style={{ color: '#ff6b81', backgroundColor: '#fff0f3' }}>{isAdmin ? 'Admin Panel' : 'Mon tableau de bord'}</span></Link></li>
                <li><button onClick={() => { handleLogout(); setOpen(false) }} className="w-full text-left rounded-xl px-3 py-2 text-sm text-red-500 font-semibold">Déconnexion</button></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  )
}
