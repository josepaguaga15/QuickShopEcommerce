import { reactive, computed } from 'vue'

// Cargar carrito desde localStorage si existe
const savedCart = localStorage.getItem('cart_items')
const initialItems = savedCart ? JSON.parse(savedCart) : []

// Estado del carrito
export const cartState = reactive({
  items: initialItems
})

// Función auxiliar para guardar en localStorage
const saveCartToStorage = () => {
  localStorage.setItem('cart_items', JSON.stringify(cartState.items))
}

// Acciones para modificar el carrito
export const cartActions = {
  addToCart(product, color = null) {
    // 1. Verificar si el usuario ha iniciado sesión leyendo 'currentUser' (como se guarda en Cuenta.vue)
    const storedUser = localStorage.getItem('currentUser')
    const user = storedUser ? JSON.parse(storedUser) : null

    if (!user || !user.username) {
      alert('Debes iniciar sesión para realizar una compra')
      return false // Detiene la ejecución si no hay usuario
    }

    // 2. Determinar color seleccionado o por defecto
    const selectedColorName = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : null)
    const cartItemId = `${product.id}-${selectedColorName || 'default'}`

    const existingItem = cartState.items.find(item => item.cartItemId === cartItemId)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cartState.items.push({
        ...product,
        cartItemId,
        selectedColor: selectedColorName,
        quantity: 1
      })
    }

    // Guardar cambios en localStorage
    saveCartToStorage()
    return true
  },

  removeFromCart(cartItemId) {
    cartState.items = cartState.items.filter(item => item.cartItemId !== cartItemId)
    saveCartToStorage()
  },

  updateQuantity(cartItemId, quantity) {
    const item = cartState.items.find(i => i.cartItemId === cartItemId)
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(cartItemId)
      } else {
        item.quantity = quantity
        saveCartToStorage()
      }
    }
  },

  clearCart() {
    cartState.items = []
    localStorage.removeItem('cart_items') // Borra los datos del almacenamiento local
  }
}

// Valores computados para el header y checkout
export const totalCartCount = computed(() => {
  return cartState.items.reduce((total, item) => total + item.quantity, 0)
})

export const totalCartPrice = computed(() => {
  return cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0)
})