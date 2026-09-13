<!-- src/components/Header.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { totalCartCount } from '../Stores/cart.js'


const currentUser = ref(null)

const checkAuth = () => {
  const user = localStorage.getItem('currentUser')
  currentUser.value = user ? JSON.parse(user) : null
}

onMounted(() => {
  checkAuth()
  window.addEventListener('auth-change', checkAuth)
})

onUnmounted(() => {
  window.removeEventListener('auth-change', checkAuth)
})


</script>

<template>
  <header class="header">
    <div class="header-container">
      
      <!-- Logo -->
      <router-link to="/" class="logo">
        QUICKSHOP
      </router-link>

      <!-- Saludo en Escritorio (Desktop) -->
      <div v-if="currentUser" class="user-greeting desktop-only">
        hello, <span class="username-highlight">{{ currentUser.username }}</span>
      </div>

      <!-- Enlaces de navegación -->
      <nav class="nav-links">
        <router-link to="/" class="nav-link">Inicio</router-link>
        <router-link to="/products" class="nav-link">Productos</router-link>
        <router-link to="/cuenta" class="nav-link">Cuenta</router-link>
      </nav>

      <!-- Botón Carrito -->
      <div class="header-actions">
        <router-link to="/cart">
          <button class="cart-btn" @click="goToCart" style="cursor: pointer;">
          <span>🛒 Carrito</span>
          <span v-if="totalCartCount > 0" class="cart-badge">{{ totalCartCount }}</span>
        </button>
        </router-link>
      </div>

    </div>

    <!-- Banner Saludo para Mobile (Solo se muestra en pantallas pequeñas) -->
    <div v-if="currentUser" class="mobile-greeting-bar mobile-only">
      <span>Hello, <strong>{{ currentUser.username }}</strong></span>
    </div>
  </header>
</template>

<style scoped>
/* Estilos Base del Header */
.header {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #c2c5b3;
  padding: 1.25rem 1.5rem 0.8rem;
  box-sizing: border-box;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* Typography y Logo */
.logo {
  font-size: 1.35rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #23261a;
  text-decoration: none;
  font-family: system-ui, -apple-system, sans-serif;
}

/* Saludo Desktop */
.user-greeting {
  font-size: 0.88rem;
  font-weight: 600;
  color: #4a4e3d;
  background-color: #f4f5f0;
  border: 1px solid #c2c5b3;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-family: system-ui, -apple-system, sans-serif;
  white-space: nowrap;
}

.username-highlight {
  color: #1a1c13;
  font-weight: 800;
}

/* Enlaces */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.nav-link {
  color: #4a4e3d;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  padding-bottom: 0.25rem;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.nav-link:hover {
  color: #1a1c13;
}

.nav-link.router-link-active {
  color: #1a1c13;
  border-bottom: 2px solid #3a3f28;
}

/* Botón Carrito */
.header-actions {
  display: flex;
  align-items: center;
  
}

* {
  text-decoration: none !important;
}

.cart-btn {
  background-color: #000000;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: background-color 0.2s ease, transform 0.1s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.cart-btn:hover {
  background-color: #292d1c;
}

.cart-btn:active {
  transform: scale(0.98);
}

.cart-badge {
  background-color: #ffffff;
  color: #3a3f28;
  font-size: 0.75rem;
  font-weight: 800;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Clases utilitarias Mobile vs Desktop */
.mobile-only {
  display: none;
}

.desktop-only {
  display: block;
}

/* Estilo para la barra de saludo en Mobile */
.mobile-greeting-bar {
  text-align: right;
  padding-top: 0.5rem;
  font-size: 0.78rem;
  color: #4a4e3d;
  font-family: system-ui, -apple-system, sans-serif;
}

.mobile-greeting-bar strong {
  color: #1a1c13;
}

/* Adaptación Mobile */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }

  .header {
    padding: 0.85rem 1rem 0.5rem;
  }

  .logo {
    font-size: 1.15rem;
  }

  .cart-btn {
    padding: 0.45rem 0.85rem;
    font-size: 0.8rem;
  }
}
</style>