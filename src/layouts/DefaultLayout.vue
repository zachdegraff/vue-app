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
                                        <q-item-side icon="library_books"/>
                                        <q-item-main>
                                            <q-item-tile>Glossary</q-item-tile>
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
        <p class="back-to-top" v-if="scrolled" @click="scrollTop()">&uarr;</p>
    </q-layout>
</template>

<script>
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'
    import DialogsStore from '../components/DialogsStore.vue'
    import SearchForm from '../components/SearchForm'
    import {mapGetters} from 'vuex'
    import Vue from 'vue'
    import VueScrollTo from 'vue-scrollto';
    Vue.use(VueScrollTo);

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current'
            })
        },
        data () {
            return {
                scrolled: false
            };
        },
        methods: {
            handleScroll () {
                this.scrolled = window.scrollY > 200;
            },
            scrollTop () {
                VueScrollTo.scrollTo('#q-app');
            }
        },
        beforeMount () {
            window.addEventListener('scroll', this.handleScroll);
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.handleScroll);
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
    .back-to-top{
        background: #2fab65;
        color: #fff;
        position: fixed;
        right: 15px;
        bottom: 50px;
        width: 45px;
        height: 40px;
        font-size: 20px;
        text-align: center;
        padding-top: 6px;
        cursor: pointer;
    }
    .mobile-site-navigation {
        .q-item {
            &.router-link-active, &.router-link-exact-active {
                background: none;
            }
        }
    }
</style>
