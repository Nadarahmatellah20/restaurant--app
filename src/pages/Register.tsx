import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuth } from '@/lib/auth'

export default function Register() {
  const { register } = useAuth()
  const [, setLocation] = useLocation()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas.'); return }
    if (form.password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères.'); return }
    const result = register(form.name, form.email, form.password)
    if (!result.success) { setError(result.error || 'Erreur d\'inscription.'); return }
    setLocation('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo" className="h-14 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-800">Créer un compte</h1>
          <p className="text-gray-500 text-sm mt-1">Rejoignez-nous et commencez à commander</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>}
            {[
              { label: 'Nom complet', name: 'name', type: 'text', placeholder: 'Jean Dupont' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'votre@email.com' },
              { label: 'Mot de passe', name: 'password', type: 'password', placeholder: 'Min. 6 caractères' },
              { label: 'Confirmer le mot de passe', name: 'confirm', type: 'password', placeholder: '••••••••' },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input type={f.type} value={(form as Record<string, string>)[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  required placeholder={f.placeholder}
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none text-sm" />
              </div>
            ))}
            <button type="submit" className="w-full text-white font-semibold py-3 rounded-xl" style={{ backgroundColor: '#ff6b81' }}>
              Créer mon compte
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{' '}
            <Link href="/login"><span className="font-medium cursor-pointer" style={{ color: '#ff6b81' }}>Se connecter</span></Link>
          </p>
        </div>
      </div>
    </div>
  )
}
