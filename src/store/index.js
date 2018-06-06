import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import cards from './cards'
import teams from './teams'
import users from './users'
import route from './route'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        cards,
        teams,
        users,
        route
    }
});

export default store
