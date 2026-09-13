
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Products from '../components/Products.vue'
import Cuenta from '../components/Cuenta.vue'
import Cart from '../components/Cart.vue'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home ,
    meta: { title: 'QUICKSHOP | Inicio' }
  },
  { 
    path: '/products', 
    name: 'Products', 
    component: Products ,
    meta: { title: 'QUICKSHOP | Productos' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { title: 'QUICKSHOP | Carrito' }
  },
   { 
    path: '/cuenta', 
    name: 'Cuenta', 
    component: Cuenta ,
    meta: { title: 'QUICKSHOP | Mi Cuenta' }
  }

]

const router = createRouter({
  history: createWebHashHistory('/QuickShopEcommerce/'),
  routes
})

// Cambia el título de la pestaña cada vez que cambias de página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'QUICKSHOP'
  next()
})

export default router