import {createApp, ref} from 'vue'
import App from './App.vue'
import router from './router'

// import './assets/main.css'
import './assets/myTheme/main.css'

// import {Wow} from './assets/myTheme/lib/wow/wow.min'
import './assets/myTheme/lib/easing/easing.min'
import './assets/myTheme/lib/waypoints/waypoints.min'
import './assets/myTheme/lib/owlcarousel/owl.carousel.min'
import './assets/myTheme/lib/parallax/parallax.min'

const app = createApp(App)
app.provide('spinnerShow', ref(true))

app.use(router)
router.isReady().then(() => {
  app.mount('#app')
})

