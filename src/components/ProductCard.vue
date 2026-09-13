<!-- src/components/ProductCard.vue -->
<script setup>
import { cartActions } from '../Stores/cart.js'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['view'])

// Función directa para agregar al carrito la propiedad product que recibe esta tarjeta
const handleAddToCart = () => {
  cartActions.addToCart(props.product)
}
</script>

<template>
  <div class="product-card">
    <div class="image-container">
      <img :src="product.image" :alt="product.name" class="product-image" />
    </div>

    <div class="product-info">
      <div class="header-row">
        <h3 class="product-title">{{ product.name }}</h3>
        <span class="product-price">${{ product.price }}</span>
      </div>

      <p class="product-description">{{ product.description }}</p>

      <!-- Botones de Acción -->
      <div class="card-actions">
        <button class="btn-view" @click="$emit('view', product)">
          Ver
        </button>
        <button class="btn-add" @click="handleAddToCart">
          Agregar al Carrito
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 1rem;
  border: 1px solid #dcdfd0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: inherit;
}

.image-container {
  width: 100%;
  height: 180px;
  background-color: #f4f5f0;
  border-radius: 14px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.product-title {
  font-size: 1rem;
  font-weight: 700;
  color: #060606;
  font-family: inherit;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 800;
  color: #060606;
  font-family: inherit;
}

.product-description {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
  font-family: inherit;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.btn-view {
  padding: 0.65rem 1rem;
  border-radius: 999px;
  border: 1px solid #060606;
  background: transparent;
  color: #060606;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-view:hover {
  background: #000000;
  color: #ffffff;
}

.btn-add {
  flex: 1;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  border: 1px solid #060606;
  background: #060606;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-add:hover {
  background: #222222;
}
</style>