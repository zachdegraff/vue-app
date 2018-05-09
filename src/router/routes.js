export default [
    {
        path: '/',
        component: () => import('layouts/DefaultLayout.vue'),
        children: [
            {path: '', component: () => import('pages/Home.vue')}
        ]
    },
    {
        path: '/cards/',
        component: () => import('layouts/CardLayout.vue'),
        children: [
            {path: 'search', name: 'search_cards', component: () => import('pages/card/SearchCards.vue')},
            {path: 'create', name: 'create_card', component: () => import('pages/card/CreateCard.vue')},
            {path: ':id', name: 'view_card', component: () => import('pages/card/ViewCard.vue'), props: true},
            {path: ':id/edit', name: 'edit_card', component: () => import('pages/card/EditCard.vue'), props: true},
            {path: '', name: 'cards_list', component: () => import('pages/card/CardsList.vue')}
        ]
    },

    { // Always leave this as last one
        path: '*',
        component: () => import('pages/404')
    }
]
