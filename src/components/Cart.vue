<!-- src/views/Cart.vue -->
<script setup>
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { cartState, cartActions, totalCartPrice, totalCartCount } from '../Stores/cart.js'
import html2pdf from 'html2pdf.js'

const router = useRouter()

const goToProducts = () => {
  router.push('/Products')
}

// Función para generar y descargar la factura en PDF
const downloadPDFInvoice = () => {
  if (cartState.items.length === 0) return

  const userName = localStorage.getItem('user_name') || 'Cliente'
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  // Estructura HTML para la factura
  const element = document.createElement('div')
  element.innerHTML = `
    <div style="padding: 30px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; max-width: 700px; margin: auto;">
      <!-- Encabezado de la Factura -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px;">
        <div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px;">QUICKSHOP</h1>
          <p style="margin: 5px 0 0 0; color: #666; font-size: 13px;">Comprobante de Compra</p>
        </div>
        <div style="text-align: right; font-size: 13px; color: #444;">
          <p style="margin: 0;"><strong>Fecha:</strong> ${currentDate}</p>
          <p style="margin: 3px 0 0 0;"><strong>Cliente:</strong> ${userName}</p>
        </div>
      </div>

      <!-- Tabla de Productos -->
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
        <thead>
          <tr style="background-color: #000; color: #fff; text-align: left;">
            <th style="padding: 10px; border: 1px solid #000;">Producto</th>
            <th style="padding: 10px; border: 1px solid #000; text-align: center;">Cant.</th>
            <th style="padding: 10px; border: 1px solid #000; text-align: right;">Precio Unit.</th>
            <th style="padding: 10px; border: 1px solid #000; text-align: right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${cartState.items.map(item => `
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; border: 1px solid #ddd;">
                <strong>${item.name}</strong>
                ${item.selectedColor ? `<br><small style="color: #666;">Color: ${item.selectedColor}</small>` : ''}
                ${item.selectedSize ? `<br><small style="color: #666;">Talla: ${item.selectedSize}</small>` : ''}
              </td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">$${item.price} USD</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">$${item.price * item.quantity} USD</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Resumen de Total -->
      <div style="margin-top: 30px; text-align: right;">
        <p style="font-size: 18px; font-weight: bold; margin: 0;">
          Total a Pagar: <span style="color: #000;">$${totalCartPrice.value} USD</span>
        </p>
      </div>

      <!-- Pie de página -->
      <div style="margin-top: 50px; border-top: 1px solid #ddd; padding-top: 15px; text-align: center; color: #777; font-size: 12px;">
        <p>¡Gracias por tu preferencia en <strong>QUICKSHOP</strong>!</p>
      </div>
    </div>
  `

  const options = {
    margin: 0.5,
    filename: `Factura_QUICKSHOP_${Date.now()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }

  html2pdf().set(options).from(element).save()
}

// Función para enviar el pedido por WhatsApp
const sendWhatsAppOrder = () => {
  if (cartState.items.length === 0) return

  const userName = localStorage.getItem('user_name') || 'un cliente'
  let message = `¡Hola, soy ${userName}! Quisiera realizar el siguiente pedido:\n\n`
  
  cartState.items.forEach((item, index) => {
    const details = []
    if (item.selectedColor) details.push(`Color: ${item.selectedColor}`)
    if (item.selectedSize) details.push(`Talla: ${item.selectedSize}`)
    
    const detailsText = details.length > 0 ? ` (${details.join(', ')})` : ''
    message += `${index + 1}. *${item.name}*${detailsText} x${item.quantity} - $${item.price * item.quantity} USD\n`
  })

  message += `\n*Total a pagar:* $${totalCartPrice.value} USD`

  const whatsappNumber = '50582363237'
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  
  window.open(url, '_blank')
}
</script>

<template>
  <div class="cart-page">
    <Header />

    <main class="main-container">
      <h1 class="page-title">Tu Carrito de Compras</h1>

      <!-- Estado Vacío -->
      <div v-if="cartState.items.length === 0" class="empty-cart">
        <span class="empty-icon">🛍️</span>
        <h2>Tu carrito está vacío</h2>
        <p>Parece que aún no has añadido ningún producto a tu bolsa.</p>
        <button class="btn-primary" @click="goToProducts">Explorar Productos</button>
      </div>

      <!-- Contenido del Carrito -->
      <div v-else class="cart-content">
        <div class="items-list">
          <div 
            v-for="item in cartState.items" 
            :key="item.cartItemId" 
            class="cart-item"
          >
            <img :src="item.image" :alt="item.name" class="item-image" />

            <div class="item-details">
              <h3 class="item-name">{{ item.name }}</h3>
              
              <!-- Color y Talla -->
              <div class="item-specs">
                <span v-if="item.selectedColor" class="item-color">Color: {{ item.selectedColor }}</span>
                <span v-if="item.selectedSize" class="item-size">Talla: {{ item.selectedSize }}</span>
              </div>

              <p class="item-price">${{ item.price }} USD c/u</p>
            </div>

            <!-- Controles de Cantidad -->
            <div class="quantity-controls">
              <button 
                class="qty-btn" 
                @click="cartActions.updateQuantity(item.cartItemId, item.quantity - 1)"
              >-</button>
              <span class="qty-number">{{ item.quantity }}</span>
              <button 
                class="qty-btn" 
                @click="cartActions.updateQuantity(item.cartItemId, item.quantity + 1)"
              >+</button>
            </div>

            <div class="item-total">
              ${{ item.price * item.quantity }} USD
            </div>

            <button 
              class="delete-btn" 
              @click="cartActions.removeFromCart(item.cartItemId)"
              title="Eliminar producto"
            >
              ✕
            </button>
          </div>

          <button class="clear-cart-btn" @click="cartActions.clearCart()">
            Vaciar Carrito
          </button>
        </div>

        <!-- Resumen del Pedido -->
        <div class="order-summary">
          <h2>Resumen del Pedido</h2>
          
          <div class="summary-row">
            <span>Productos ({{ totalCartCount }}):</span>
            <span>${{ totalCartPrice }} USD</span>
          </div>
          
          <div class="summary-row">
            <span>Envío:</span>
            <span class="free-shipping">A coordinar</span>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row total-row">
            <span>Total:</span>
            <span>${{ totalCartPrice }} USD</span>
          </div>

          <button class="pdf-btn" @click="downloadPDFInvoice">
             Descargar Factura
          </button>

          <button class="checkout-btn" @click="sendWhatsAppOrder">
             Completar Pedido por WhatsApp 
          </button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.cart-page {
  min-height: 100vh;
  background-color: #f3f4f3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.main-container {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  flex-grow: 1;
  box-sizing: border-box;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #111;
  margin-bottom: 1.2rem;
}

/* Estado Vacío */
.empty-cart {
  background: #fff;
  border-radius: 20px;
  padding: 3rem 1.5rem;
  text-align: center;
  border: 1px solid #dcdfd0;
}

.empty-icon {
  font-size: 3.5rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-cart h2 {
  font-size: 1.4rem;
  color: #111;
  margin-bottom: 0.5rem;
}

.empty-cart p {
  color: #666;
  margin-bottom: 1.5rem;
}

.btn-primary {
  background: #000;
  color: #fff;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
}

/* Layout Principal */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
  align-items: start;
  width: 100%;
  box-sizing: border-box;
}

.items-list {
  background: #fff;
  border-radius: 20px;
  padding: 1.25rem;
  border: 1px solid #dcdfd0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

/* Item del Carrito */
.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.item-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 12px;
  background-color: #f4f5f0;
  flex-shrink: 0;
}

.item-details {
  flex-grow: 1;
  min-width: 0;
}

.item-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #111;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-specs {
  display: flex;
  gap: 0.8rem;
  margin-top: 0.2rem;
}

.item-color, .item-size {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

.item-size {
  font-weight: 600;
  color: #333;
}

.item-price {
  font-size: 0.85rem;
  color: #888;
  margin: 0.2rem 0 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: #f3f4f3;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  flex-shrink: 0;
}

.qty-btn {
  background: none;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  padding: 0 0.3rem;
  color: #111;
}

.qty-number {
  font-weight: 700;
  font-size: 0.9rem;
  min-width: 18px;
  text-align: center;
}

.item-total {
  font-weight: 800;
  font-size: 0.95rem;
  color: #111;
  text-align: right;
  flex-shrink: 0;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #999;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.4rem;
  transition: color 0.2s;
  flex-shrink: 0;
}

.delete-btn:hover {
  color: #e53935;
}

.clear-cart-btn {
  align-self: flex-end;
  background: transparent;
  border: none;
  color: #888;
  font-size: 0.85rem;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 0.5rem;
}

/* Resumen */
.order-summary {
  background: #fff;
  border-radius: 20px;
  padding: 1.25rem;
  border: 1px solid #dcdfd0;
  width: 100%;
  box-sizing: border-box;
}

.order-summary h2 {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: #444;
}

.free-shipping {
  color: #2e7d32;
  font-weight: 600;
}

.summary-divider {
  height: 1px;
  background: #eee;
  margin: 1rem 0;
}

.total-row {
  font-size: 1.1rem;
  font-weight: 800;
  color: #111;
}

.pdf-btn {
  width: 100%;
  padding: 0.9rem;
  border-radius: 999px;
  border: none;
  background: #000000;
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
  box-sizing: border-box;
}

.pdf-btn:hover {
  background: #222222;
}

.checkout-btn {
  width: 100%;
  padding: 0.9rem;
  border-radius: 999px;
  border: none;
  background: #25d366;
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 0.6rem;
  transition: background 0.2s;
  box-sizing: border-box;
}

.checkout-btn:hover {
  background: #1eb954;
}

/* Adaptación Responsive para Móvil */
@media (max-width: 768px) {
  .main-container {
    padding: 1.5rem 0.8rem;
  }

  .cart-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .items-list {
    padding: 1rem;
  }

  .cart-item {
    display: grid;
    grid-template-columns: 60px 1fr auto;
    grid-template-rows: auto auto;
    gap: 0.5rem 0.8rem;
    align-items: center;
  }

  .item-image {
    width: 60px;
    height: 60px;
    grid-row: span 2;
  }

  .item-details {
    grid-column: 2;
  }

  .delete-btn {
    grid-column: 3;
    justify-self: end;
  }

  .quantity-controls {
    grid-column: 2;
    justify-self: start;
    margin-top: 0.2rem;
  }

  .item-total {
    grid-column: 3;
    justify-self: end;
  }
}
</style>