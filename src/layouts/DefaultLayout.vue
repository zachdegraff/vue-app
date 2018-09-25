<template>
    <q-layout>
        <app-header></app-header>
        <q-page-container>
            <q-page>
                <div class="row q-ma-sm lt-lg" v-show="team">
                    <div class="col-xs-2 col-sm-1">
                        <q-btn flat icon="menu" class="q-mt-xs">
                            <q-popover>
                                <q-list link class="mobile-site-navigation">
                                    <q-item to="/">
                                        <q-item-side icon="home"/>
                                        <q-item-main>
                                            <q-item-tile>Feed</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item to="/glossary">
                                        <q-item-side icon="note"/>
                                        <q-item-main>
                                            <q-item-tile>Cards</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item to="/questions">
                                        <q-item-side icon="help"/>
                                        <q-item-main>
                                            <q-item-tile>Questions</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item to="/glossary/tags">
                                        <q-item-side icon="local_offer"/>
                                        <q-item-main>
                                            <q-item-tile>Tags</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                </q-list>
                            </q-popover>
                        </q-btn>
                    </div>
                    <div class="col-xs-10 col-sm-11">
                        <search-form class="full-width"/>
                    </div>
                </div>
                <router-view :key="$route.fullPath"/>
            </q-page>
        </q-page-container>
        <app-footer></app-footer>
        <dialogs-store></dialogs-store>
    </q-layout>
</template>

<script>
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'
    import DialogsStore from '../components/DialogsStore.vue'
    import SearchForm from '../components/SearchForm'
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current'
            })
        },
        components: {
            SearchForm,
            AppHeader,
            AppFooter,
            DialogsStore
        }
    }
</script>
<style lang="scss">
    .mobile-site-navigation {
        .q-item {
            &.router-link-active, &.router-link-exact-active {
                background: none;
            }
        }
    }
</style>
