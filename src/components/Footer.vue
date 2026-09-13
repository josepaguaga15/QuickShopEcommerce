<!-- src/components/Footer.vue -->
<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      
      <!-- Sección Marca y Redes -->
      <div class="footer-brand">
        <h2 class="footer-logo">QUICKSHOP</h2>
        <p class="footer-tagline">
          Tu tienda de confianza para productos de audio y tecnología premium.
        </p>

        <!-- Iconos de Redes Sociales -->
        <div class="social-links">
          <!-- WhatsApp -->
          <a href="https://wa.me/" target="_blank" rel="noopener" class="social-icon" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>

          <!-- Instagram -->
          <a href="https://www.instagram.com/quickshop_nic?stkn=bXF0d2RwdWVoeHE5&utm_source=qr" target="_blank" rel="noopener" class="social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>

      <!-- Links Rápidos -->
      <div class="footer-links">
        <h3 class="footer-title">Navegación</h3>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/products">Productos</router-link></li>
          <li><a href="#">Ofertas</a></li>
        </ul>
      </div>

      <!-- Atención al Cliente -->
      <div class="footer-links">
        <h3 class="footer-title">Soporte</h3>
        <ul>
          <li><a href="#">Preguntas Frecuentes</a></li>
          <li><a href="#">Políticas de Envío</a></li>
          <li><a href="#">Garantía y Devoluciones</a></li>
        </ul>
      </div>

    </div>

    <!-- Barra Inferior de Créditos -->
    <div class="footer-bottom">
      <div class="bottom-container">
        <p>© {{ currentYear }} QUICKSHOP. Todos los derechos reservados.</p>
        <p class="credits">Desarrollado por <a href="https://l.instagram.com/?u=https%3A%2F%2Fjosepaguaga15.github.io%2FMyfirstportafolio%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaeo1XyaCnJjuXo7yzGeDnzfJvwBMHM9ZeU5CWvwECef2FCKYzsjaJNApMI4ew_aem_5RGFbB7DN6gYONTksGZdTg&e=AUCQKQ9vgjGApCnlZWBFJ58HadOPsDp93xjUusIrai22GzvbBh-td12u7_APZDTdUihJrxeUuhqRhRbqElcXFe8YDLt6jWA5m0GI3qSvlzObjoWe8Zm2usYXQ_T_34sYYwjSr2r4bWCVCLUBYrHwenM" target="_blank" rel="noopener" class="JAKPortfolio" aria-label="Github">JAK Technologies</a></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000000;
  color: #ffffff;
  padding-top: 3.5rem;
  margin-top: 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2.5rem;
}

/* Marca y Descripción */
.footer-logo {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: #ffffff;
  margin-bottom: 0.8rem;
}

.footer-tagline {
  font-size: 0.9rem;
  color: #a1a1a1;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  max-width: 320px;
}

/* Social Icons */
.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #1a1a1a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  text-decoration: none;
}

.social-icon:hover {
  background-color: #c87a4b;
  transform: translateY(-2px);
}

/* Estilos de Lista y Links */
.footer-title {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.6rem;
}

.footer-links a {
  color: #a1a1a1;
  text-decoration: none;
  font-size: 0.88rem;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #ffffff;
}

/* Footer Bottom / Créditos */
.footer-bottom {
  border-top: 1px solid #1a1a1a;
  padding: 1.25rem 1.5rem;
  background-color: #050505;
}

.bottom-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #717171;
}

.credits span,
.credits a {
  color: #ffffff;            /* Cambia el morado por blanco brillante */
  font-weight: 700;
  letter-spacing: 0.03em;
  text-decoration: none;     /* Quita la línea subrayada */
  transition: color 0.2s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .bottom-container {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>