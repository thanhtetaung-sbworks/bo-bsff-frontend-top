import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo)

export default (_, inject) => inject('scrollTo', VueScrollTo.scrollTo)
