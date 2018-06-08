<template>
    <q-layout>
        <app-header></app-header>
        <q-page-container>
            <q-page>
                <div class="row gutter-md q-pa-md">
                    <div class="col-xs-4">
                        <teams-navigation></teams-navigation>
                    </div>
                    <div class="col-xs-8">
                        <view-team></view-team>
                        <router-view :key="$route.fullPath"/>
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