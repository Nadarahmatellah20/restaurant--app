import { createContext, useContext, useState, ReactNode } from 'react'

export type Role = 'admin' | 'client'

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => { success: boolean; error?: string }
  register: (name: string, email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
  isAdmin: boolean
  isClient: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEY = 'restaurant_auth_user'
const USERS_KEY = 'restaurant_users'

const DEFAULT_USERS = [
  { id: 'admin-1', name: 'Admin', email: 'admin@restaurant.com', password: 'admin123', role: 'admin' as Role },
]

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : DEFAULT_USERS
  } catch {
    return DEFAULT_USERS
  }
}

function saveUsers(users: typeof DEFAULT_USERS) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

if (!localStorage.getItem(USERS_KEY)) {
  saveUsers(DEFAULT_USERS)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  function login(email: string, password: string) {
    const users = getUsers()
    const found = users.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    )
    if (!found) return { success: false, error: 'Email ou mot de passe incorrect.' }
    const { password: _pw, ...userData } = found
    setUser(userData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    return { success: true }
  }

  function register(name: string, email: string, password: string) {
    const users = getUsers()
    if (users.find((u: { email: string }) => u.email === email)) {
      return { success: false, error: 'Cet email est déjà utilisé.' }
    }
    const newUser = { id: `client-${Date.now()}`, name, email, password, role: 'client' as Role }
    saveUsers([...users, newUser])
    const { password: _pw, ...userData } = newUser
    setUser(userData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    return { success: true }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === 'admin', isClient: user?.role === 'client' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
