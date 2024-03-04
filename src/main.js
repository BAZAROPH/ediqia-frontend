import Vue from 'vue'
import '@/libs/sweet-alerts'
import setAuthHeader from "../src/auth/jwt/token"
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import CustomGoogleAutocomplete from 'vue-custom-google-autocomplete'
//localisation
import VueTelInput from 'vue-tel-input'
import Vuex from 'vuex'


import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'

// import Vue from "vue"
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
// import App from "./App.vue"

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// install rules
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

// Install components globally
Vue.use(BootstrapVue)
Vue.use(CustomGoogleAutocomplete)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false

// new Vue({
//   render: h => h(App)
// }).$mount("#app")

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(Vuex)

// Composition API
Vue.use(VueCompositionAPI)

//localisation
Vue.use(VueTelInput)

// Sweetalert
Vue.use(VueSweetalert2);

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

// import assets customize css
require('@/assets/css/customize.css')

//localisation
import 'vue-tel-input/dist/vue-tel-input.css';

Vue.config.productionTip = false
if (localStorage.getItem('token')) {
  setAuthHeader(localStorage.getItem('token'))
} else {
  setAuthHeader(false)
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
