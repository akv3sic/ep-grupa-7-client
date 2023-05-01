import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

//primevue
import PrimeVue from 'primevue/config';

//theme
import "primevue/resources/themes/tailwind-light/theme.css";   
    
//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";

//toast
import ToastService from 'primevue/toastservice';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.use(PrimeVue);

app.use(ToastService);
