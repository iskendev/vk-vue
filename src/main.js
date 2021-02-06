import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { domain, clientId, audience } from "../auth_config.json"
import { Auth0Plugin } from "./auth"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCamera, faVideo, faLink, faRetweet, faHeart, faComments, faEye, faBackspace, faFont } from '@fortawesome/free-solid-svg-icons'
import { faVk } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Autocomplete from 'v-autocomplete'
import '../node_modules/v-autocomplete/dist/v-autocomplete.css'

library.add(faVk, faCamera, faVideo, faLink, faRetweet, faHeart, faComments, faEye, faBackspace, faFont)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Autocomplete)
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

