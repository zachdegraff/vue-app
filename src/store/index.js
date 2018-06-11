import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import route from './route'
import cards from './cards'
import note from './note'
import teams from './teams'
import users from './users'
import modals from './modals'
import members from './members'
import collections from './collections'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        route,
        cards,
        note,
        teams,
        users,
        modals,
        members,
        collections
    }
});

export default store
