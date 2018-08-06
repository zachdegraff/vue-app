import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import tags from './tags'
import feed from './feed'
import route from './route'
import cards from './cards'
import teams from './teams'
import users from './users'
import editor from './editor'
import modals from './modals'
import search from './search'
import members from './members'
import questions from './questions'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        tags,
        feed,
        route,
        cards,
        teams,
        users,
        editor,
        modals,
        search,
        members,
        questions
    }
});

export default store
