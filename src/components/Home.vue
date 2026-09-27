<!-- src/views/Home.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import ProductCard from '../components/ProductCard.vue'
import Footer from '../components/Footer.vue'
import { cartActions } from '../Stores/cart.js'

const router = useRouter()

// Helper para resolver rutas dinámicas desde src/assets/
const getAssetUrl = (path) => {
  return new URL(`../assets/Images/${path}`, import.meta.url).href
}

// Estado para el modal y color seleccionado
const selectedProduct = ref(null)
const selectedColor = ref('')

// Estado para controlar el FAB
const isFabOpen = ref(false)

const toggleFab = () => {
  isFabOpen.value = !isFabOpen.value
}

// Acciones del FAB para la vista Home
const goToWhatsApp = () => {
  isFabOpen.value = false
  window.open('https://wa.me/50582363237', '_blank')
}

const goToProducts = () => {
  isFabOpen.value = false
  router.push('/Products')
}

const goToAccount = () => {
  isFabOpen.value = false
  router.push('/Cuenta')
}

// Artículos de oferta
const offerProducts = ref([
{ 
    id: 1, 
    name: 'Casio MQ24', 
    category: 'Accesorios', 
    price: 20, 
    description: 'Reloj analógico de cuarzo para hombre | Resistente al agua | Caja y correa de resina | Diseño clásico y ligero.', 
    reviews: 121, 
    image: getAssetUrl('Casio-MQ24.jpg'),
    colors: [
      { 
        name: 'Negro', 
        hex: '#111111', 
        variantImage: getAssetUrl('Casio-MQ24.jpg') 
      }
      
    ],
    specs: [
      'Batería: Hasta 24 horas con estuche', 
      'Movimiento: Cuarzo', 
      'Estilo: Clásico / Casual',
      'Resistencia al agua: Sí, para uso cotidiano'
    ]
  },
  { 
    id: 3, 
    name: 'Nature Made Glicinato de magnesio 300 mg', 
    category: 'Medicina',
    price: 25, 
    description: 'Suplemento de glicinato de magnesio de 300 mg | Fórmula de alta absorción | Cápsulas para complementar la ingesta diaria de magnesio.', 
    reviews: 95, 
    image: getAssetUrl('Magnesio-NatureMade.png'),
    specs: ['Tipo: Glicinato de magnesio', 'Presentación: Cápsulas', 'Cantidad: 300 mg']
  },
  { 
    id: 4, 
    name: 'Hawas Ice', 
    category: 'Perfumes',
    price: 40, 
    description: 'Hawas Ice | Eau de parfum para hombres | Fragancia fresca y moderna con un estilo elegante y versátil.', 
    reviews: 64, 
    image: getAssetUrl('Hawas-Ice.avif'),
    specs: ['Tipo: Eau de Parfum', 'Duración del aroma 3 horas', 'Concentración de fragancia Eau de parfum','Uso recomendado: Día a día y ocasiones especiales']
  },
  { 
    id: 2, 
    name: 'Sony WH-CH520', 
    category: 'Tecnología', 
    price: 45, 
    description: 'Audífonos inalámbricos Sony | Diseño ligero y cómodo | Hasta 50 horas de batería | Conectividad Bluetooth.', 
    reviews: 98, 
    image: getAssetUrl('Sony_WH-CH520.png'),
    colors: [
      { 
        name: 'Negro', 
        hex: '#4B4B4B', 
        variantImage: getAssetUrl('Sony_WH-CH520.png') 
      },
      { 
        name: 'Gris Espacial', 
        hex: '#E0E0E0', 
        variantImage: getAssetUrl('Sony_WH-CH520_Grey.png') 
      }
    ],
    specs: ['Batería: Hasta 50 horas', 'Tipo: Audífonos inalámbricos', 'Almohadillas de malla transpirable']
  }
])

const scrollToOffers = () => {
  const section = document.getElementById('ofertas-seccion')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

// Estructura que devuelve la imagen correspondiente al color seleccionado
const currentProductImage = computed(() => {
  if (!selectedProduct.value) return ''
  
  if (selectedProduct.value.colors && selectedProduct.value.colors.length > 0) {
    const activeColorObj = selectedProduct.value.colors.find(
      c => c.name === selectedColor.value
    )
    if (activeColorObj && activeColorObj.variantImage) {
      return activeColorObj.variantImage
    }
  }
  
  return selectedProduct.value.image
})

const openModal = (product) => {
  selectedProduct.value = product
  if (product.colors && product.colors.length > 0) {
    selectedColor.value = product.colors[0].name
  }
}

const closeModal = () => {
  selectedProduct.value = null
}

const handleAddToCartFromModal = () => {
  if (!selectedProduct.value) return

  cartActions.addToCart({
    ...selectedProduct.value,
    selectedColor: selectedColor.value,
    image: currentProductImage.value
  })

  closeModal()
}
</script>

<template>
  <div class="home-page">
    <Header />

    <main class="main-container">
      <!-- Hero Banner -->
      <section class="hero-card">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <span class="hero-tag">EDICIÓN LIMITADA</span>
          <h1 class="hero-title">OFERTAS EXCLUSIVAS DE TEMPORADA</h1>
          <p class="hero-description">Todo lo que necesitas, a los mejores precios, sin salir de casa.</p>
          
          <div class="hero-buttons">
            <button class="btn-primary" @click="scrollToOffers">Ver Ofertas Especiales ↓</button>
          </div>
        </div>
      </section>

      <!-- Sección de Ofertas Especiales -->
      <section id="ofertas-seccion" class="offers-section">
        <div class="section-header">
          <h2 class="section-title">Ofertas Especiales</h2>
        </div>

        <div class="offers-grid">
          <ProductCard 
            v-for="product in offerProducts" 
            :key="product.id" 
            :product="product" 
            @view="openModal"
          />
        </div>
      </section>
    </main>

    <!-- POP-UP / MODAL DETALLADO DE OFERTAS -->
    <div v-if="selectedProduct" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <button class="close-btn" @click="closeModal" aria-label="Cerrar ventana">✕</button>
        
        <div class="modal-grid">
          <!-- Foto Ampliada dinámicamente -->
          <div class="modal-image-wrapper">
            <img :src="currentProductImage" :alt="selectedProduct.name" class="modal-image" />
          </div>

          <!-- Información Extendida -->
          <div class="modal-info">
            <span class="category-badge">{{ selectedProduct.category }}</span>
            <h2 class="product-title">{{ selectedProduct.name }}</h2>
            <p class="product-price">${{ selectedProduct.price }} USD</p>
            <p class="product-description">{{ selectedProduct.description }}</p>

            <!-- Opciones de Color -->
            <div v-if="selectedProduct.colors" class="section-block">
              <span class="section-label">Color: <strong>{{ selectedColor }}</strong></span>
              <div class="color-options">
                <button 
                  v-for="color in selectedProduct.colors" 
                  :key="color.name"
                  class="color-dot"
                  :class="{ selected: selectedColor === color.name }"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                  @click="selectedColor = color.name"
                ></button>
              </div>
            </div>

            <!-- Lista de Especificaciones -->
            <div v-if="selectedProduct.specs" class="section-block">
              <span class="section-label">Especificaciones Clave:</span>
              <ul class="specs-list">
                <li v-for="(spec, idx) in selectedProduct.specs" :key="idx">
                  • {{ spec }}
                </li>
              </ul>
            </div>

            <button class="add-to-cart-btn" @click="handleAddToCartFromModal">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTÓN FLOTANTE (FAB): WHATSAPP + PRODUCTOS -->
    <div class="fab-container">
      <Transition name="fab-fade">
        <div v-if="isFabOpen" class="fab-options">
          <button class="fab-item whatsapp-item" @click="goToWhatsApp">
            <span class="fab-label">WhatsApp</span>
          </button>

          <button class="fab-item" @click="goToProducts">
            <span class="fab-label">Productos</span>
          </button>

          <button class="fab-item" @click="goToAccount">
            <span class="fab-label">Cuenta</span>
          </button>
        </div>
      </Transition>

      <button 
        class="fab-main-btn" 
        :class="{ active: isFabOpen }" 
        @click="toggleFab"
        aria-label="Menú rápido"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu">
          <path d="M4 5h16"/>
          <path d="M4 12h16"/>
          <path d="M4 19h16"/>
        </svg>
      </button>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.home-page { min-height: 100vh; background-color: #f3f4f3; font-family: system-ui, -apple-system, sans-serif; }
.main-container { max-width: 1200px; margin: 0 auto; padding: 4rem 1.5rem 1.5rem; }

.hero-card {
  position: relative; width: 100%; min-height: 380px; border-radius: 28px; overflow: hidden;
  display: flex; align-items: center; background-image: url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop');
  background-size: cover; background-position: center; margin-bottom: 3rem;
}
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(9, 9, 9, 0.8) 0%, rgba(20, 22, 15, 0.2) 100%); }
.hero-content { position: relative; z-index: 10; max-width: 500px; padding: 2.5rem; color: #fff; }
.hero-tag { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; color: #e3e5d8; }
.hero-title { font-size: 2.2rem; font-weight: 900; margin: 0.5rem 0 1rem; line-height: 1.1; }
.hero-description { font-size: 0.95rem; color: #d1d5db; margin-bottom: 1.5rem; }

.btn-primary {
  background-color: #000000; color: #ffffff; border: none; padding: 0.8rem 1.75rem;
  border-radius: 999px; font-weight: 700; cursor: pointer; transition: background-color 0.2s ease;
}

.section-title { font-size: 1.5rem; font-weight: 800; color: #010101; margin-bottom: 1.5rem; }

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

/* Modal */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
.modal-card { background: #ffffff; border-radius: 24px; max-width: 780px; width: 100%; padding: 2rem; position: relative; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); }
.close-btn { position: absolute; top: 1.2rem; right: 1.2rem; background: #f0f0f0; border: none; width: 36px; height: 36px; border-radius: 50%; font-size: 1rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
.close-btn:hover { background: #000000; color: #ffffff; }
.modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; }
.modal-image-wrapper { width: 100%; height: 320px; background-color: #f4f5f0; border-radius: 16px; overflow: hidden; }
.modal-image { width: 100%; height: 100%; object-fit: cover; }
.category-badge { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #c87a4b; letter-spacing: 0.05em; }
.product-title { font-size: 1.5rem; font-weight: 800; color: #060606; margin: 0.2rem 0; }
.product-price { font-size: 1.3rem; font-weight: 800; color: #060606; margin-bottom: 0.8rem; }
.product-description { font-size: 0.88rem; color: #555; line-height: 1.4; margin-bottom: 1.2rem; }
.section-block { margin-bottom: 1.2rem; }
.section-label { display: block; font-size: 0.85rem; color: #333; margin-bottom: 0.5rem; }
.color-options { display: flex; gap: 0.6rem; }
.color-dot { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #ddd; cursor: pointer; transition: transform 0.2s, border-color 0.2s; }
.color-dot.selected { transform: scale(1.15); border-color: #000000; }
.specs-list { list-style: none; padding: 0; font-size: 0.82rem; color: #444; }
.specs-list li { margin-bottom: 0.3rem; }
.add-to-cart-btn { width: 100%; padding: 0.85rem; border-radius: 999px; border: none; background: #000000; color: #ffffff; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: background 0.2s ease; margin-top: 0.5rem; }
.add-to-cart-btn:hover { background: #222222; }

/* Botón Flotante (FAB) */
.fab-container {
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  flex-direction: column;
  align-items: flex-end;
}

.fab-main-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #000000;
  color: #ffffff;
  border: none;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.fab-main-btn.active {
  transform: rotate(45deg);
  background-color: #c87a4b;
}

.fab-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
  align-items: flex-end;
}

.fab-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  color: #111111;
  border: 1px solid #e0e0e0;
  padding: 10px 16px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.2s ease, background 0.2s;
}

.fab-item:active {
  transform: scale(0.95);
}

.whatsapp-item {
  background: #25d366;
  color: #ffffff;
  border: none;
}

/* Transición animada */
.fab-fade-enter-active,
.fab-fade-leave-active {
  transition: all 0.25s ease;
}

.fab-fade-enter-from,
.fab-fade-leave-to {
  opacity: 0;
  transform: translateY(15px) scale(0.9);
}

@media (max-width: 768px) {
  .fab-container { display: flex; }
  .modal-grid { grid-template-columns: 1fr; }
  .modal-image-wrapper { height: 220px; }
}
</style>