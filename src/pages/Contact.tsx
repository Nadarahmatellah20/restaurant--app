import { useState } from 'react'
import Footer from '@/components/Footer'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Contactez-nous</h2>
        <p className="text-center text-gray-500 mb-10">Une question ? Nous sommes là pour vous aider.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { icon: '📍', label: 'Adresse', value: '123 Rue de la Paix, Alger' },
            { icon: '📞', label: 'Téléphone', value: '+213 555 123 456' },
            { icon: '✉️', label: 'Email', value: 'contact@restaurant.com' },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 rounded-2xl" style={{ backgroundColor: '#fff0f3' }}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-semibold text-gray-700 text-sm">{item.label}</p>
              <p className="text-gray-500 text-sm mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
        {sent ? (
          <div className="text-center py-10 bg-green-50 rounded-2xl">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-semibold text-gray-800">Message envoyé !</h3>
            <p className="text-gray-500 mt-1">Nous vous répondrons sous 24h.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            {[
              { label: 'Nom', name: 'name', type: 'text', placeholder: 'Votre nom' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'votre@email.com' },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input type={f.type} value={(form as Record<string, string>)[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  placeholder={f.placeholder} required
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none text-sm" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5} placeholder="Votre message..." required
                className="w-full border border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none text-sm resize-none" />
            </div>
            <button type="submit" className="w-full text-white font-semibold py-3 rounded-xl" style={{ backgroundColor: '#ff6b81' }}>
              Envoyer
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  )
}
