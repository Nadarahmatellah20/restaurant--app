export interface Food {
  id: number
  title: string
  price: number
  img: string
  desc: string
  category: string
}

const DEFAULT_FOODS: Food[] = [
  { id: 1, title: 'Chicken Hawaiian Pizza', price: 12.99, img: '/menu-pizza.jpg', desc: 'Made with Italian sauce, chicken, and organic vegetables.', category: 'Pizza' },
  { id: 2, title: 'Smoky Burger', price: 8.49, img: '/menu-burger.jpg', desc: 'Juicy beef patty with smoky BBQ sauce and fresh toppings.', category: 'Burger' },
  { id: 3, title: 'Nice Burger', price: 7.99, img: '/menu-burger.jpg', desc: 'Classic burger with crispy lettuce, tomato, and special sauce.', category: 'Burger' },
  { id: 4, title: 'Margherita Pizza', price: 10.99, img: '/menu-pizza.jpg', desc: 'Fresh mozzarella, tomato basil sauce on crispy thin crust.', category: 'Pizza' },
  { id: 5, title: 'Pepperoni Feast', price: 13.49, img: '/menu-pizza.jpg', desc: 'Loaded with premium pepperoni, mozzarella, and marinara.', category: 'Pizza' },
  { id: 6, title: 'Chicken Steam Momo', price: 6.99, img: '/menu-momo.jpg', desc: 'Tender steamed dumplings stuffed with seasoned chicken.', category: 'Momo' },
  { id: 7, title: 'Veggie Momo', price: 5.99, img: '/menu-momo.jpg', desc: 'Fresh vegetable dumplings with tangy dipping sauce.', category: 'Momo' },
  { id: 8, title: 'Double Cheese Burger', price: 9.99, img: '/menu-burger.jpg', desc: 'Double patty with extra cheese, pickles and special sauce.', category: 'Burger' },
  { id: 9, title: 'BBQ Chicken Pizza', price: 14.49, img: '/menu-pizza.jpg', desc: 'Smoky BBQ sauce with grilled chicken, red onion and mozzarella.', category: 'Pizza' },
]

const FOODS_KEY = 'restaurant_foods'

export function getFoods(): Food[] {
  try {
    const raw = localStorage.getItem(FOODS_KEY)
    return raw ? JSON.parse(raw) : DEFAULT_FOODS
  } catch {
    return DEFAULT_FOODS
  }
}

export function saveFoods(foods: Food[]) {
  localStorage.setItem(FOODS_KEY, JSON.stringify(foods))
}

export function addFood(food: Omit<Food, 'id'>): Food {
  const foods = getFoods()
  const newFood: Food = { ...food, id: Date.now() }
  saveFoods([...foods, newFood])
  return newFood
}

export function updateFood(food: Food) {
  saveFoods(getFoods().map((f) => (f.id === food.id ? food : f)))
}

export function deleteFood(id: number) {
  saveFoods(getFoods().filter((f) => f.id !== id))
}

if (!localStorage.getItem(FOODS_KEY)) {
  saveFoods(DEFAULT_FOODS)
}
