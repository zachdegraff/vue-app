import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import cards from './cards'
import route from './route'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        cards,
        route
    }
});

export default store
