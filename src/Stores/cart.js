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
  addToCart(product, color = null, size = null) {
    // 1. Verificar si el usuario ha iniciado sesión
    const storedUser = localStorage.getItem('currentUser')
    const user = storedUser ? JSON.parse(storedUser) : null

    if (!user || !user.username) {
      alert('Debes iniciar sesión para realizar una compra')
      return false // Detiene la ejecución si no hay usuario
    }

    // 2. Determinar color y talla seleccionados (toma la propiedad enviada en el objeto product o por parámetro)
    const selectedColorName = product.selectedColor || color || (product.colors && product.colors.length > 0 ? product.colors[0].name : null)
    const selectedSizeName = product.selectedSize || size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : null)

    // 3. Crear un identificador único que incluya ID + Color + Talla
    const cartItemId = `${product.id}-${selectedColorName || 'no-color'}-${selectedSizeName || 'no-size'}`

    const existingItem = cartState.items.find(item => item.cartItemId === cartItemId)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cartState.items.push({
        ...product,
        cartItemId,
        selectedColor: selectedColorName,
        selectedSize: selectedSizeName, // <- Guardamos la talla seleccionada
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