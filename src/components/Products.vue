<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import ProductCard from '../components/ProductCard.vue'
import Footer from '../components/Footer.vue'
import { cartActions } from '../Stores/cart.js'

// Estado para controlar el modal de Guía de Tallas
const isSizeGuideOpen = ref(false)

const openSizeGuide = () => {
  isSizeGuideOpen.value = true
}

const closeSizeGuide = () => {
  isSizeGuideOpen.value = false
}

const router = useRouter()

// Helper para resolver rutas dinámicas de imágenes
const getAssetUrl = (path) => {
  return new URL(`../assets/Images/${path}`, import.meta.url).href
}

const categories = ref([
  { id: 1, name: 'Todos', icon: '' },
  { id: 2, name: 'Tecnología', icon: '' },
  { id: 3, name: 'Medicina', icon: '' },
  { id: 4, name: 'Accesorios', icon: '' },
  { id: 5, name: 'Perfumes', icon: '' },
  { id: 6, name: 'Ropa', icon: '' }
])

const activeCategory = ref('Todos')
const selectedProduct = ref(null)
const selectedColor = ref('')
const selectedSize = ref('')

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
    id: 2, 
    name: 'Sony WH-CH520', 
    category: 'Tecnología', 
    price: 45, 
    description: 'Audífonos inalámbricos Sony | Diseño ligero y cómodo | Hasta 50 horas de batería | Conectividad Bluetooth.', 
    reviews: 98, 
    image: getAssetUrl('Sony_WH-CH520.png'),
    colors: [
      { name: 'Negro',
        hex: '#4B4B4B',
        variantImage: getAssetUrl('Sony_WH-CH520.png')
      },
      { name: 'Gris Espacial', 
        hex: '#E0E0E0', 
        variantImage: getAssetUrl('Sony_WH-CH520_Grey.png') }
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
  },
  { 
    id: 7, 
    name: 'Basic Camiseta', 
    category: 'Ropa', 
    price: 16, 
    description: 'Camiseta básica de algodón 100% | Diseño moderno y cómodo | Ideal para el uso diario.', 
    reviews: 200, 
    image: getAssetUrl('CamisetaBasicBlack.png'), 
    colors: [
      { 
        name: 'Negro', 
        hex: '#111111', 
        variantImage: getAssetUrl('CamisetaBasicBlack.png') 
      },
      { 
        name: 'Blanco', 
        hex: '#F5F5F5', 
        variantImage: getAssetUrl('CamisetaBasicWhite.png') 
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: ['Material: 100% Algodón', 'Corte: Regular Fit', 'Cuidado: Lavado a máquina con agua fría']
  },
  { 
    id: 8, 
    name: 'Casio MQ24 Gold', 
    category: 'Accesorios', 
    price: 60, 
    description: 'Reloj analógico de cuarzo para hombre | Resistente al agua | Caja y correa de resina | Diseño clásico y ligero.', 
    reviews: 121, 
    image: getAssetUrl('Casio-MQ24_Gold.jpg'),
    colors: [
      { 
        name: 'Dorado', 
        hex: '#efb810', 
        variantImage: getAssetUrl('Casio-MQ24_Gold.jpg') 
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
    id: 9, 
    name: 'Casio MQ24 White', 
    category: 'Accesorios', 
    price: 60, 
    description: 'Reloj analógico de cuarzo para hombre | Resistente al agua | Caja y correa de resina | Diseño clásico y ligero.', 
    reviews: 121, 
    image: getAssetUrl('Casio-MQ24_White.png'),
    colors: [
      { 
        name: 'Blanco', 
        hex: '#F5F5F5', 
        variantImage: getAssetUrl('Casio-MQ24_White.png') 
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
    id: 10, 
    name: 'Reebok C 85', 
    category: 'Ropa', 
    price: 90, 
    description: 'Zapatos urbanos de diseño moderno y suela ergonómica. Máximo confort y estilo para el uso diario.', 
    reviews: 42, 
    image: getAssetUrl('ReebookC85WhiteGreen.png'), 
  
    sizes: ['8', '9', '10'], 
    sizeGuide: [
      { size: '8 US', cm: '26.0 cm' },
      { size: '9 US', cm: '27.0 cm' },
      { size: '10 US', cm: '28.0 cm' }
    ],
    specs: ['Material exterior: Sintético de alta durabilidad', 'Suela: Goma antideslizante', 'Ajuste: Cordones']
  }
])

const filteredProducts = computed(() => {
  if (activeCategory.value === 'Todos') return allProducts.value
  return allProducts.value.filter(p => p.category === activeCategory.value)
})

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
  if (product.sizes && product.sizes.length > 0) {
    selectedSize.value = product.sizes[0]
  } else {
    selectedSize.value = ''
  }
}

const closeModal = () => {
  selectedProduct.value = null
  selectedColor.value = ''
  selectedSize.value = ''
}

const handleAddToCartFromModal = () => {
  if (!selectedProduct.value) return

  cartActions.addToCart({
    ...selectedProduct.value,
    selectedColor: selectedColor.value,
    selectedSize: selectedSize.value,
    image: currentProductImage.value
  })

  closeModal()
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

    <!-- POP-UP MODAL PRINCIPAL DE PRODUCTO -->
    <div v-if="selectedProduct" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <button class="close-btn" @click="closeModal" aria-label="Cerrar ventana">✕</button>
        <div class="modal-grid">
          <div class="modal-image-wrapper">
            <img :src="currentProductImage" :alt="selectedProduct.name" class="modal-image" />
          </div>
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

            <!-- Opciones de Talla + Botón Guía de Tallas -->
            <div v-if="selectedProduct.sizes" class="section-block">
              <div class="size-header">
                <span class="section-label">Talla: <strong>{{ selectedSize }}</strong></span>
                
                <button 
                  v-if="selectedProduct.sizeGuide" 
                  class="size-guide-link" 
                  @click="openSizeGuide"
                >
                   Guía de tallas
                </button>
              </div>

              <div class="size-options">
                <button 
                  v-for="size in selectedProduct.sizes" 
                  :key="size"
                  class="size-btn"
                  :class="{ selected: selectedSize === size }"
                  @click="selectedSize = size"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Especificaciones -->
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

    <!-- SUB-MODAL: GUÍA DE TALLAS -->
    <div v-if="isSizeGuideOpen" class="modal-overlay size-guide-overlay" @click.self="closeSizeGuide">
      <div class="size-guide-card">
        <button class="close-btn" @click="closeSizeGuide" aria-label="Cerrar guía">✕</button>
        <h3 class="guide-title"> Guía de Tallas de Calzado</h3>
        <p class="guide-subtitle">Mide la longitud de tu pie desde el talón hasta el dedo más largo.</p>

        <table class="size-guide-table">
          <thead>
            <tr>
              <th>Talla (US)</th>
              <th>Equivalencia (CM)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in selectedProduct?.sizeGuide" :key="item.size">
              <td><strong>{{ item.size }}</strong></td>
              <td>{{ item.cm }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- BOTÓN FLOTANTE (FAB): WHATSAPP + INICIO -->
    <div class="fab-container">
      <Transition name="fab-fade">
        <div v-if="isFabOpen" class="fab-options">
          <button class="fab-item whatsapp-item" @click="goToWhatsApp">
            <span class="fab-icon"></span>
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
  -webkit-overflow-scrolling: touch; 
  scrollbar-width: none;
}

.categories-grid::-webkit-scrollbar {
  display: none;
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
  flex-shrink: 0;
  color: #060606 !important; 
  -webkit-tap-highlight-color: transparent;
}
.category-card.active { 
  background: #0a0a0a !important; 
  color: #ffffff !important; 
}

.category-card span {
  color: inherit !important;
}

.category-card.active span {
  color: #ffffff !important;
}
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.5rem; }

/* Modal Principal */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
.modal-card { background: #ffffff; border-radius: 24px; max-width: 780px; width: 100%; padding: 2rem; position: relative; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); }
.close-btn { color: #111111 !important; position: absolute; top: 1.2rem; right: 1.2rem; background: #f0f0f0; border: none; width: 36px; height: 36px; border-radius: 50%; font-size: 1rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; }
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

/* Header de Tallas con botón de Guía */
.size-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.size-header .section-label {
  margin-bottom: 0;
}
.size-guide-link {
  background: none;
  border: none;
  color: #000000;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}
.size-guide-link:hover {
  color: #000;
}

/* Botones de Talla */
.size-options { display: flex; gap: 0.5rem; }
.size-btn { 
  color: #111111 !important;
  min-width: 38px; 
  height: 38px; 
  border-radius: 8px; 
  border: 1px solid #ddd; 
  background: #f9f9f9; 
  font-weight: 700; 
  font-size: 0.85rem; 
  cursor: pointer; 
  transition: all 0.2s ease; 
}
.size-btn.selected { 
  background: #000000 !important;
  color: #ffffff !important;
  border-color: #000000 !important;
}

/* Sub-modal Guía de Tallas */
.size-guide-overlay {
  z-index: 1100;
}
.size-guide-card {
  background: #ffffff;
  border-radius: 20px;
  max-width: 420px;
  width: 100%;
  padding: 1.8rem;
  position: relative;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}
.guide-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #111;
  margin-bottom: 0.3rem;
}
.guide-subtitle {
  font-size: 0.82rem;
  color: #666;
  margin-bottom: 1.2rem;
}
.size-guide-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.size-guide-table th {
  background-color: #f4f5f0;
  color: #111;
  text-align: left;
  padding: 0.6rem 0.8rem;
  font-weight: 700;
  border-bottom: 2px solid #ddd;
}
.size-guide-table td {
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid #eee;
  color: #333;
}

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