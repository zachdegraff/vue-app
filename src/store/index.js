import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import route from './route'
import cards from './cards'
import teams from './teams'
import users from './users'
import editor from './editor'
import modals from './modals'
import search from './search'
import members from './members'
import questions from './questions'
import collections from './collections'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        route,
        cards,
        teams,
        users,
        editor,
        modals,
        search,
        members,
        questions,
        collections
    }
});

export default store
