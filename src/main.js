// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 1. Importa tu logo desde assets
import faviconUri from './assets/Images/logo.png' // Reemplaza 'logo.png' por el nombre exacto de tu archivo

// 2. Función para recortar la imagen en forma circular
const applyCircularFavicon = (imageSrc) => {
  const img = new Image()
  img.src = imageSrc
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const size = Math.min(img.width, img.height)
    canvas.width = size
    canvas.height = size

    const ctx = canvas.getContext('2d')
    if (ctx) {
      // Crear máscara circular
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      // Dibujar la imagen centrada dentro del círculo
      ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size)

      // Asignar la nueva imagen recortada a la pestaña
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link')
      link.type = 'image/png'
      link.rel = 'shortcut icon'
      link.href = canvas.toDataURL('image/png')
      document.getElementsByTagName('head')[0].appendChild(link)
    }
  }
}

// Ejecutar la función
applyCircularFavicon(faviconUri)

const app = createApp(App)
app.use(router)
app.mount('#app')