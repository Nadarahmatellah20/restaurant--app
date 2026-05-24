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
  { id: 10, title: 'Alfredo Chicken Pasta', price: 11.99, img: '/menu-pasta.png', desc: 'Creamy alfredo sauce with grilled chicken and parmesan.', category: 'Pasta' },
  { id: 11, title: 'Penne Arrabbiata', price: 9.49, img: '/menu-pasta.png', desc: 'Penne with spicy tomato sauce, garlic and fresh herbs.', category: 'Pasta' },
  { id: 12, title: 'Chicken Tacos', price: 7.49, img: '/menu-tacos.png', desc: 'Soft tacos filled with marinated chicken, salad and house sauce.', category: 'Tacos' },
  { id: 13, title: 'Beef Tacos', price: 8.49, img: '/menu-tacos.png', desc: 'Seasoned beef tacos with cheese, salsa and crunchy vegetables.', category: 'Tacos' },
  { id: 14, title: 'Caesar Salad', price: 6.49, img: '/menu-salad.png', desc: 'Crisp lettuce, chicken, croutons and creamy Caesar dressing.', category: 'Salade' },
  { id: 15, title: 'Fresh Moroccan Salad', price: 5.49, img: '/menu-salad.png', desc: 'Tomato, cucumber, onion, herbs and olive oil dressing.', category: 'Salade' },
  { id: 16, title: 'Mixed Grill Plate', price: 15.99, img: '/menu-grill.png', desc: 'Grilled meat selection served with fries and fresh salad.', category: 'Grill' },
  { id: 17, title: 'Chicken Brochettes', price: 12.49, img: '/menu-grill.png', desc: 'Tender chicken skewers with spices, fries and house sauce.', category: 'Grill' },
  { id: 18, title: 'Chocolate Fondant', price: 4.99, img: '/menu-dessert.png', desc: 'Warm chocolate cake with a soft melting center.', category: 'Dessert' },
  { id: 19, title: 'Tiramisu Cup', price: 5.49, img: '/menu-dessert.png', desc: 'Coffee cream dessert with mascarpone and cocoa.', category: 'Dessert' },
  { id: 20, title: 'Fresh Orange Juice', price: 3.49, img: '/menu-drinks.png', desc: 'Freshly squeezed orange juice served chilled.', category: 'Boissons' },
  { id: 21, title: 'Mint Lemonade', price: 3.99, img: '/menu-drinks.png', desc: 'Refreshing lemonade with mint and crushed ice.', category: 'Boissons' },
]

const FOODS_KEY = 'restaurant_foods'

export function getFoods(): Food[] {
  try {
    const raw = localStorage.getItem(FOODS_KEY)
    if (!raw) return DEFAULT_FOODS
    const foods: Food[] = JSON.parse(raw)
    const foodIds = new Set(foods.map((food) => food.id))
    const foodsWithUpdatedDefaults = foods.map((food) => {
      const defaultFood = DEFAULT_FOODS.find((item) => item.id === food.id)
      if (!defaultFood) return food
      return { ...food, img: defaultFood.img }
    })
    const missingDefaults = DEFAULT_FOODS.filter((food) => !foodIds.has(food.id))
    if (missingDefaults.length === 0 && foodsWithUpdatedDefaults.every((food, index) => food === foods[index])) return foods
    const mergedFoods = [...foodsWithUpdatedDefaults, ...missingDefaults]
    saveFoods(mergedFoods)
    return mergedFoods
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
