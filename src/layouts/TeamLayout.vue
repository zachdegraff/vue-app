<template>
    <q-layout>
        <app-header></app-header>
        <q-page-container>
            <q-page>
                <div class="content-container">
                    <div class="row gutter-md q-pa-md">
                        <teams-navigation class="col-lg-2 gt-md"></teams-navigation>
                        <div class="col-md-12 col-lg-7">
                            <router-view :key="$route.fullPath"/>
                        </div>
                        <div class="col-lg-3 q-px-xl gt-md"></div>
                    </div>
                </div>
            </q-page>
        </q-page-container>
        <app-footer></app-footer>
    </q-layout>
</template>

<script>
    import TeamsNavigation from '../components/team/TeamsNavigation.vue'
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'
    import ViewTeam from '../components/team/ViewTeam.vue'

    export default {
        data: () => {
            return {
                isCreation: false
            }
        },
        components: {AppHeader, AppFooter, ViewTeam, TeamsNavigation},
    }
</script>