import Vue from 'vue'
import Vuex from 'vuex'

import cards from './cards'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        cards
    }
});

export default store
