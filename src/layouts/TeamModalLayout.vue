<template>
    <q-layout>
        <app-header></app-header>
        <q-page-container>
            <q-page>
                <div class="row gutter-md q-pa-md">
                    <div class="col-xs-4">
                        <teams-navigation></teams-navigation>
                        <div class="q-pt-lg text-center">
                            <q-btn label="create team" color="primary" @click="$router.push({name: 'create_team'})"/>
                        </div>
                    </div>
                    <div class="col-xs-8">
                        <router-view :key="$route.fullPath"></router-view>
                    </div>
                </div>
            </q-page>
        </q-page-container>
        <app-footer></app-footer>
    </q-layout>
</template>

<script>
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'
    import TeamsNavigation from '../components/team/TeamsNavigation.vue'
    import {mapActions} from 'vuex'

    export default {
        components: {AppHeader, AppFooter, TeamsNavigation},
    }
</script>