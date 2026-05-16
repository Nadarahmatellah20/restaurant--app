import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuth } from '@/lib/auth'

export default function Login() {
  const { login } = useAuth()
  const [, setLocation] = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const result = login(form.email, form.password)
    if (!result.success) { setError(result.error || 'Erreur de connexion.'); return }
    const user = JSON.parse(localStorage.getItem('restaurant_auth_user') || '{}')
    setLocation(user.role === 'admin' ? '/admin' : '/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo" className="h-14 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-800">Connexion</h1>
          <p className="text-gray-500 text-sm mt-1">Connectez-vous à votre compte</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                required placeholder="votre@email.com"
                className="w-full border border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                required placeholder="••••••••"
                className="w-full border border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none text-sm" />
            </div>
            <button type="submit" className="w-full text-white font-semibold py-3 rounded-xl" style={{ backgroundColor: '#ff6b81' }}>
              Se connecter
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Pas encore de compte ?{' '}
            <Link href="/register"><span className="font-medium cursor-pointer" style={{ color: '#ff6b81' }}>S'inscrire</span></Link>
          </p>
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-500 space-y-1">
            <p className="font-semibold text-gray-600">Comptes de démonstration :</p>
            <p>🔑 Admin : <span className="font-mono">admin@restaurant.com</span> / <span className="font-mono"></span></p>
            <p>👤 Client : Créez un compte via "S'inscrire"</p>
          </div>
        </div>
      </div>
    </div>
  )
}
