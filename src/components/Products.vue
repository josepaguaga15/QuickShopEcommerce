
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import ProductCard from '../components/ProductCard.vue'
import Footer from '../components/Footer.vue'
import { cartActions } from '../Stores/cart.js'

const router = useRouter()

// Nueva función para agregar el producto desde el modal
const handleAddToCartFromModal = () => {
  if (!selectedProduct.value) return

  cartActions.addToCart({
    ...selectedProduct.value,
    selectedColor: selectedColor.value
  })

  // Cerramos la ventana emergente tras agregar
  closeModal()
}

// Helper para resolver rutas dinámicas
const getAssetUrl = (path) => {
  return new URL(`../assets/Images/${path}`, import.meta.url).href
}

const categories = ref([
  { id: 1, name: 'Todos', icon: '' },
  { id: 2, name: 'Tecnología', icon: '' },
  { id: 3, name: 'Medicina', icon: '' },
  { id: 4, name: 'Accesorios', icon: '' },
  { id: 5, name: 'Perfumes', icon: '' }
])

const activeCategory = ref('Todos')
const selectedProduct = ref(null)
const selectedColor = ref('')

// Estado para controlar el FAB
const isFabOpen = ref(false)

const toggleFab = () => {
  isFabOpen.value = !isFabOpen.value
}

// Acciones del FAB para la vista de Artículos
const goToWhatsApp = () => {
  isFabOpen.value = false
  window.open('https://wa.me/50500000000', '_blank')
}

const goToHome = () => {
  isFabOpen.value = false
  router.push('/')
}

const allProducts = ref([
  { 
   id: 1, 
    name: 'Casio MQ24', 
    category: 'Accesorios', 
    price: 20, 
    description: 'Reloj analógico de cuarzo para hombre | Resistente al agua | Caja y correa de resina | Diseño clásico y ligero.', 
    reviews: 121, 
    image: getAssetUrl('Casio-MQ24.avif'),
    colors: [
      { name: 'Negro', hex: '#111111' },
      { name: 'Blanco', hex: '#F5F5F5' },
      { name: 'Dorado', hex: '#efb810' }
    ],
    specs: ['Batería: Hasta 24 horas con estuche', 'Movimiento: Cuarzo', 'Estilo: Clásico / Casual','Resistencia al agua: Sí, para uso cotidiano']
  },
  { 
    id: 2, 
    name: 'Sony WH-CH520', 
    category: 'Tecnología', 
    price: 45, 
    description: 'Audífonos inalámbricos Sony | Diseño ligero y cómodo | Hasta 50 horas de batería | Conectividad Bluetooth.', 
    reviews: 98, 
    image: getAssetUrl('Sony_WH-CH520.jpg'),
    colors: [
      { name: 'Gris Espacial', hex: '#4B4B4B' },
      { name: 'Plata', hex: '#E0E0E0' }
    ],
    specs: ['Batería: Hasta 50 horas', 'Tipo: Audífonos inalámbricos', 'Almohadillas de malla transpirable']
  },
  { 
    id: 3, 
    name: 'Nature Made Glicinato de magnesio 300 mg', 
    category: 'Medicina',
    price: 25, 
    description: 'Suplemento de glicinato de magnesio de 300 mg | Fórmula de alta absorción | Cápsulas para complementar la ingesta diaria de magnesio.', 
    reviews: 95, 
    image: getAssetUrl('Magnesio-NatureMade.avif'),
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
    id: 5, 
    name: 'Ariana Grande Thank U, Next Body Mist', 
    category: 'Perfumes', 
    price: 15, 
    description: 'Ariana Grande Thank U, Next Body Mist | Bruma corporal femenina | Fragancia dulce y floral para el uso diario.', 
    reviews: 210, 
    image: getAssetUrl('ArianaGrandeThankuNextBodyMist.avif'), 
  
    specs: ['Marca: Ariana Grande', 'Familia olfativa: Dulce / Floral','Uso recomendado: Uso diario']
  },
  { 
    id: 6, 
    name: 'Club de Nuit Intense Man', 
    category: 'Perfumes', 
    price: 30, 
    description: 'Club de Nuit Intense Man “La Bestia Negra” | Eau de Toilette para hombres | Fragancia cítrica, ahumada y amaderada con gran presencia.', 
    reviews: 200, 
    image: getAssetUrl('ClubDeNuit_Intense.webp'), 
  
    specs: ['Presentación: 105 ml', 'Familia olfativa: Cítrica / Frutal / Amaderada','Uso recomendado: Día, noche, citas y ocasiones especiales']
  }
])

const filteredProducts = computed(() => {
  if (activeCategory.value === 'Todos') return allProducts.value
  return allProducts.value.filter(p => p.category === activeCategory.value)
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
</script>

<template>
  <div class="articulos-page">
    <Header />
    <main class="main-container">
      <h1 class="page-title">Catálogo de Artículos</h1>

      <!-- Categorías -->
      <div class="categories-grid">
        <button 
          v-for="cat in categories" 
          :key="cat.id" 
          class="category-card"
          :class="{ active: activeCategory === cat.name }"
          @click="activeCategory = cat.name"
        >
          <span>{{ cat.icon }}</span>
          <span>{{ cat.name }}</span>
        </button>
      </div>

      <!-- Productos Filtrados -->
      <div class="products-grid">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product"
          @view="openModal"
        />
      </div>
    </main>

    <!-- POP-UP MODAL -->
    <div v-if="selectedProduct" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <button class="close-btn" @click="closeModal" aria-label="Cerrar ventana">✕</button>
        <div class="modal-grid">
          <div class="modal-image-wrapper">
            <img :src="selectedProduct.image" :alt="selectedProduct.name" class="modal-image" />
          </div>
          <div class="modal-info">
            <span class="category-badge">{{ selectedProduct.category }}</span>
            <h2 class="product-title">{{ selectedProduct.name }}</h2>
            <p class="product-price">${{ selectedProduct.price }} USD</p>
            <p class="product-description">{{ selectedProduct.description }}</p>

            <div v-if="selectedProduct.colors" class="section-block">
              <span class="section-label">Opción / Tamaño: <strong>{{ selectedColor }}</strong></span>
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

            <div v-if="selectedProduct.specs" class="section-block">
              <span class="section-label">Especificaciones Clave:</span>
              <ul class="specs-list">
                <li v-for="(spec, idx) in selectedProduct.specs" :key="idx">• {{ spec }}</li>
              </ul>
            </div>

            <button class="add-to-cart-btn" @click="handleAddToCartFromModal">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTÓN FLOTANTE (FAB): WHATSAPP + INICIO -->
    <div class="fab-container">
      <Transition name="fab-fade">
        <div v-if="isFabOpen" class="fab-options">
          <button class="fab-item whatsapp-item" @click="goToWhatsApp">
            <span class="fab-icon">💬</span>
            <span class="fab-label">WhatsApp</span>
          </button>
          <button class="fab-item" @click="goToHome">
            <span class="fab-icon"></span>
            <span class="fab-label">Inicio</span>
          </button>
        </div>
      </Transition>

      <button 
        class="fab-main-btn" 
        :class="{ active: isFabOpen }" 
        @click="toggleFab"
        aria-label="Menú rápido"
      >
        <!-- AQUÍ SE AGREGA TU SVG -->
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
.articulos-page { min-height: 100vh; background-color: #e3e5d8; }
.main-container { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
.page-title { font-size: 1.8rem; font-weight: 800; color: #060606; margin-bottom: 1.5rem; }
.categories-grid { 
  display: flex; 
  gap: 0.8rem; 
  margin-bottom: 2rem; 
  overflow-x: auto; 
  padding-bottom: 0.5rem;
  width: 100%;
  box-sizing: border-box;

  /* Habilita desplazamiento táctil fluido en iOS/Android */
  -webkit-overflow-scrolling: touch; 
  
  /* Oculta la barra de scroll para una interfaz limpia */
  scrollbar-width: none; /* Firefox */
}

.categories-grid::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
.category-card { 
  background: #fff; 
  border: 1px solid #dcdfd0; 
  padding: 0.75rem 1.25rem; 
  border-radius: 999px; 
  cursor: pointer; 
  display: flex; 
  align-items: center;
  gap: 0.5rem; 
  font-weight: 600; 
  white-space: nowrap; 
  flex-shrink: 0; /* IMPRESCINDIBLE: evita que el botón se comprima */
  color: #060606 !important; 
  -webkit-tap-highlight-color: transparent; /* Elimina el recuadro gris al tocar */
}
.category-card.active { 
  background: #0a0a0a; 
  color: #fff; 
}

.category-card span {
  color: inherit !important;
}

.category-card.active { 
  background: #0a0a0a !important; 
  color: #ffffff !important; 
}

.category-card.active span {
  color: #ffffff !important;
}
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.5rem; }

/* Modal */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
.modal-card { background: #ffffff; border-radius: 24px; max-width: 780px; width: 100%; padding: 2rem; position: relative; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); }
.close-btn { position: absolute; top: 1.2rem; right: 1.2rem; background: #f0f0f0; border: none; width: 36px; height: 36px; border-radius: 50%; font-size: 1rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.close-btn:hover { background: #000; color: #fff; }
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
.color-dot.selected { transform: scale(1.15); border-color: #000; }
.specs-list { list-style: none; padding: 0; font-size: 0.82rem; color: #444; }
.specs-list li { margin-bottom: 0.3rem; }
.add-to-cart-btn { width: 100%; padding: 0.85rem; border-radius: 999px; border: none; background: #000; color: #fff; font-weight: 700; font-size: 0.9rem; cursor: pointer; margin-top: 0.5rem; }

/* Botón Flotante (FAB) */
.fab-container { display: none; position: fixed; bottom: 24px; right: 24px; z-index: 999; flex-direction: column; align-items: flex-end; }
.fab-main-btn { width: 56px; height: 56px; border-radius: 50%; background-color: #000000; color: #ffffff; border: none; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; transition: transform 0.3s ease, background-color 0.3s ease; }
.fab-main-btn.active { transform: rotate(45deg); background-color: #c87a4b; }
.fab-options { display: flex; flex-direction: column; gap: 12px; margin-bottom: 12px; align-items: flex-end; }
.fab-item { display: flex; align-items: center; gap: 10px; background: #ffffff; color: #111111; border: 1px solid #e0e0e0; padding: 10px 16px; border-radius: 30px; font-weight: 700; font-size: 0.9rem; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); cursor: pointer; white-space: nowrap; transition: transform 0.2s ease, background 0.2s; }
.fab-item:active { transform: scale(0.95); }
.whatsapp-item { background: #25d366; color: #ffffff; border: none; }
.fab-icon { font-size: 1.1rem; }

.fab-fade-enter-active, .fab-fade-leave-active { transition: all 0.25s ease; }
.fab-fade-enter-from, .fab-fade-leave-to { opacity: 0; transform: translateY(15px) scale(0.9); }

@media (max-width: 768px) {
  .fab-container { display: flex; }
  .modal-grid { grid-template-columns: 1fr; }
  .modal-image-wrapper { height: 220px; }
}
</style>