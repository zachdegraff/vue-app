import Vue from 'vue'
import Vuex from 'vuex'

import cards from './cards'
import route from './route'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        cards,
        route
    }
});

export default store
