import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import route from './route'
import cards from './cards'
import teams from './teams'
import users from './users'
import members from './members'
import collections from './collections'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        route,
        cards,
        teams,
        users,
        members,
        collections
    }
});

export default store
