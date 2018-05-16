import store from '../store'

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters['auth/isAuthenticated']) {
        next();
        return
    }
    next('/')
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters['auth/isAuthenticated']) {
        next();
        return
    }
    next('/auth/login')
};

export default [
    {
        path: '/',
        component: () => import('layouts/DefaultLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: '', name: 'home', component: () => import('pages/Home.vue')}
        ]
    },
    {
        path: '/auth/',
        component: () => import('layouts/AuthLayout.vue'),
        beforeEnter: ifNotAuthenticated,
        children: [
            {path: 'login', name: 'login_user', component: () => import('pages/auth/LoginUser.vue')},
            {path: 'register', name: 'register_user', component: () => import('pages/auth/RegisterUser.vue')},
            {path: 'forgot', name: 'forgot_password', component: () => import('pages/auth/ForgotPassword.vue')},

        ]
    },
    {
        path: '/reset/',
        component: () => import('layouts/ClearLayout.vue'),
        beforeEnter: ifNotAuthenticated,
        children: [
            {path: ':token', name: 'reset_password', component: () => import('pages/auth/ResetPassword.vue')}
        ]
    },
    {
        path: '/cards/',
        component: () => import('layouts/CardLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: 'search', name: 'search_cards', component: () => import('pages/card/SearchCards.vue')},
            {path: 'create', name: 'create_card', component: () => import('pages/card/CreateCard.vue')},
            {path: ':id', name: 'view_card', component: () => import('pages/card/ViewCard.vue'), props: true},
            {path: ':id/edit', name: 'edit_card', component: () => import('pages/card/EditCard.vue'), props: true},
            {path: '', name: 'cards_list', component: () => import('pages/card/CardsList.vue')}
        ]
    },
    {
        path: '/teams/',
        name: 'teams',
        component: () => import('layouts/TeamLayout.vue'),
        beforeEnter: ifAuthenticated,
        children: [
            {path: 'create', name: 'create_team', component: () => import('pages/team/CreateTeam.vue')},
            {path: ':id/edit', name: 'edit_team', component: () => import('pages/team/EditTeam.vue'), props: true},
            {path: ':id', name: 'view_team', component: () => import('pages/team/ViewTeam.vue'), props: true},
        ]
    },

    { // Always leave this as last one
        path: '*',
        component: () => import('pages/404')
    }
]
