<!-- src/views/Cuenta.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { cartActions } from '../Stores/cart.js'

const router = useRouter()

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



// Pestaña activa: 'login' o 'register'
const activeTab = ref('login')

// Formulario Login
const loginUsername = ref('')
const loginPassword = ref('')
const loginError = ref('')

// Formulario Registro
const regUsername = ref('')
const regEmail = ref('')
const regPassword = ref('')
const regError = ref('')
const regSuccess = ref('')

// Estado de usuario actual
const currentUser = ref(null)

onMounted(() => {
  const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser)
  }
})

// Función para simular el inicio de sesión
const handleLogin = () => {
  loginError.value = ''
  
  if (!loginUsername.value || !loginPassword.value) {
    loginError.value = 'Por favor, completa todos los campos.'
    return
  }

  // Obtener usuarios guardados localmente
  const registeredUsers = JSON.parse(localStorage.getItem('app_users') || '[]')
  
  // Buscar coincidencia de usuario y contraseña
  const user = registeredUsers.find(
    u => u.username.toLowerCase() === loginUsername.value.trim().toLowerCase() && u.password === loginPassword.value
  )

  if (user) {
    // Guardar usuario activo
    const sessionData = { username: user.username, email: user.email }
    localStorage.setItem('currentUser', JSON.stringify(sessionData))
    currentUser.value = sessionData
    
    // Disparar evento personalizado para notificar al Header
    window.dispatchEvent(new Event('auth-change'))
    
    // Redirigir al Inicio
    router.push('/')
  } else {
    loginError.value = 'Usuario o contraseña incorrectos.'
  }
}

// Función para simular el registro
const handleRegister = () => {
  regError.value = ''
  regSuccess.value = ''

  if (!regUsername.value || !regEmail.value || !regPassword.value) {
    regError.value = 'Por favor, completa todos los campos.'
    return
  }

  const registeredUsers = JSON.parse(localStorage.getItem('app_users') || '[]')

  // Validar si el usuario ya existe
  const exists = registeredUsers.some(
    u => u.username.toLowerCase() === regUsername.value.trim().toLowerCase()
  )

  if (exists) {
    regError.value = 'Este nombre de usuario ya está ocupado.'
    return
  }

  // Guardar nuevo usuario
  const newUser = {
    username: regUsername.value.trim(),
    email: regEmail.value.trim(),
    password: regPassword.value
  }

  registeredUsers.push(newUser)
  localStorage.setItem('app_users', JSON.stringify(registeredUsers))

  regSuccess.value = '¡Cuenta creada con éxito! Ahora puedes iniciar sesión.'
  
  // Limpiar campos y cambiar a pestaña de login
  regUsername.value = ''
  regEmail.value = ''
  regPassword.value = ''
  setTimeout(() => {
    activeTab.value = 'login'
    regSuccess.value = ''
  }, 1500)
}

// 2. Actualiza la función handleLogout
const handleLogout = () => {
  localStorage.removeItem('currentUser')
  currentUser.value = null
  
  // Vacía el carrito del estado reactivo y del localStorage
  cartActions.clearCart()

  window.dispatchEvent(new Event('auth-change'))
}

</script>

<template>
  <div class="account-page">
    <Header />

    <main class="account-container">
      <!-- Si el usuario YA inició sesión -->
      <div v-if="currentUser" class="auth-card logged-card">
        <div class="user-avatar-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <h2>¡Hola, {{ currentUser.username }}!</h2>
        <p class="user-email">{{ currentUser.email }}</p>
        <p class="welcome-text">Has iniciado sesión correctamente en tu cuenta.</p>

        <div class="account-actions">
          <button class="btn-secondary" @click="router.push('/')">Ir al Inicio</button>
          <button class="btn-logout" @click="handleLogout">Cerrar Sesión</button>
        </div>
      </div>

      <!-- Si NO ha iniciado sesión: Formulario de Login / Registro -->
      <div v-else class="auth-card">
        <!-- Pestañas (Tabs) -->
        <div class="tabs-header">
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'login' }"
            @click="activeTab = 'login'"
          >
            Iniciar Sesión
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'register' }"
            @click="activeTab = 'register'"
          >
            Registrarse
          </button>
        </div>

        <!-- FORMULARIO DE LOGIN -->
        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="auth-form">
          <h2 class="form-title">Bienvenido de nuevo</h2>
          <p class="form-subtitle">Ingresa tus credenciales para acceder</p>

          <div v-if="loginError" class="alert alert-error">
            {{ loginError }}
          </div>

          <div class="form-group">
            <label for="login-username">Usuario</label>
            <input 
              id="login-username" 
              v-model="loginUsername" 
              type="text" 
              placeholder="Escribe tu usuario"
              required 
            />
          </div>

          <div class="form-group">
            <label for="login-password">Contraseña</label>
            <input 
              id="login-password" 
              v-model="loginPassword" 
              type="password" 
              placeholder="••••••••"
              required 
            />
          </div>

          <button type="submit" class="btn-primary">Iniciar Sesión</button>
        </form>

        <!-- FORMULARIO DE REGISTRO -->
        <form v-else @submit.prevent="handleRegister" class="auth-form">
          <h2 class="form-title">Crear una cuenta</h2>
          <p class="form-subtitle">Regístrate para disfrutar de ofertas exclusivas</p>

          <div v-if="regError" class="alert alert-error">
            {{ regError }}
          </div>
          <div v-if="regSuccess" class="alert alert-success">
            {{ regSuccess }}
          </div>

          <div class="form-group">
            <label for="reg-username">Nombre de Usuario</label>
            <input 
              id="reg-username" 
              v-model="regUsername" 
              type="text" 
              placeholder="Ej: juan123"
              required 
            />
          </div>

          <div class="form-group">
            <label for="reg-email">Correo Electrónico</label>
            <input 
              id="reg-email" 
              v-model="regEmail" 
              type="email" 
              placeholder="ejemplo@correo.com"
              required 
            />
          </div>

          <div class="form-group">
            <label for="reg-password">Contraseña</label>
            <input 
              id="reg-password" 
              v-model="regPassword" 
              type="password" 
              placeholder="Crea una contraseña"
              required 
            />
          </div>

          <button type="submit" class="btn-primary">Crear Cuenta</button>
        </form>
      </div>
    </main>

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
.account-page {
  min-height: 100vh;
  background-color: #f3f4f3;
  font-family: system-ui, -apple-system, sans-serif;
}

.account-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1.5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
}

.auth-card {
  background: #ffffff;
  border-radius: 28px;
  width: 100%;
  max-width: 440px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
}

/* Tabs */
.tabs-header {
  display: flex;
  background: #f3f4f6;
  border-radius: 999px;
  padding: 4px;
  margin-bottom: 2rem;
}

.tab-btn {
  flex: 1;
  padding: 0.65rem;
  border: none;
  background: transparent;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.25s ease;
}

.tab-btn.active {
  background: #000000;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Formulario */
.auth-form {
  display: flex;
  flex-direction: column;
}

.form-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.form-subtitle {
  font-size: 0.88rem;
  color: #6b7280;
  margin-top: 0.25rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.2rem;
}

.form-group label {
  font-size: 0.82rem;
  font-weight: 700;
  color: #374151;
}

.form-group input {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #000000;
}

.btn-primary {
  background-color: #000000;
  color: #ffffff;
  border: none;
  padding: 0.85rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.btn-primary:hover {
  background-color: #222222;
}

/* Alertas */
.alert {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
}

.alert-error {
  background-color: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
}

.alert-success {
  background-color: #d1fae5;
  color: #059669;
  border: 1px solid #6ee7b7;
}

/* Usuario Logueado Card */
.logged-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111827;
  margin-bottom: 1rem;
}

.logged-card h2 {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0;
}

.user-email {
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 0.2rem;
}

.welcome-text {
  font-size: 0.95rem;
  color: #374151;
  margin: 1.5rem 0;
}

.account-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.btn-secondary {
  background: #f3f4f6;
  color: #111827;
  border: none;
  padding: 0.85rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
}

.btn-logout {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 0.85rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 640px) {
  .account-container {
    padding-top: 4.5rem;
  }
  .auth-card {
    padding: 1.75rem 1.25rem;
  }
}

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