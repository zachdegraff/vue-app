<template>
    <q-layout>
        <app-header></app-header>
        <q-page-container>
            <q-page>
                <div class="row flex-center q-pa-md">
                    <div class="col-xs-12 col-md-6">
                        <router-view :key="$route.fullPath"/>
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

    export default {
        components: {AppHeader, AppFooter, TeamsNavigation},
    }
</script>