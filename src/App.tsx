import { Switch, Route } from 'wouter'
import { AuthProvider } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import Categories from '@/pages/Categories'
import Foods from '@/pages/Foods'
import Order from '@/pages/Order'
import Contact from '@/pages/Contact'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ClientDashboard from '@/pages/ClientDashboard'
import AdminDashboard from '@/pages/AdminDashboard'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4" style={{ color: '#ff6b81' }}>404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page introuvable</h2>
      <a href="/" className="mt-4 inline-block text-white px-6 py-2.5 rounded-xl font-semibold" style={{ backgroundColor: '#ff6b81' }}>Retour à l'accueil</a>
    </div>
  )
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/admin" component={AdminDashboard} />
      <Route>
        {() => (
          <>
            <Navbar />
            <main>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/categories" component={Categories} />
                <Route path="/foods" component={Foods} />
                <Route path="/order/:id" component={Order} />
                <Route path="/contact" component={Contact} />
                <Route path="/dashboard" component={ClientDashboard} />
                <Route component={NotFound} />
              </Switch>
            </main>
          </>
        )}
      </Route>
    </Switch>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
