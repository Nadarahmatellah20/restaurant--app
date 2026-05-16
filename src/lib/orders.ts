export interface OrderItem {
  foodId: number
  title: string
  img: string
  price: number
  qty: number
}

export interface Order {
  id: string
  userId: string
  userName: string
  userEmail: string
  item: OrderItem
  address: string
  phone: string
  total: number
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled'
  createdAt: string
}

const ORDERS_KEY = 'restaurant_orders'

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
  const orders = getOrders()
  const newOrder: Order = { ...order, id: `ORD-${Date.now()}`, status: 'pending', createdAt: new Date().toISOString() }
  localStorage.setItem(ORDERS_KEY, JSON.stringify([...orders, newOrder]))
  return newOrder
}

export function updateOrderStatus(orderId: string, status: Order['status']) {
  const orders = getOrders().map((o) => (o.id === orderId ? { ...o, status } : o))
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function getUserOrders(userId: string): Order[] {
  return getOrders().filter((o) => o.userId === userId)
}

export function deleteOrder(orderId: string) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(getOrders().filter((o) => o.id !== orderId)))
}
