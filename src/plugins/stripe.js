import VueStripeCheckout from 'vue-stripe-checkout'

export default ({Vue}) => {
    Vue.use(VueStripeCheckout, process.env.STRIPE_KEY)
}