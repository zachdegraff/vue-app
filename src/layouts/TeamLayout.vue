<template>
    <q-layout>
        <app-header/>
        <q-page-container>
            <q-page>
                <div class="content-container">
                    <div class="row gutter-x-lg">
                        <div class="col-md-12 col-lg-2">
                            <teams-navigation></teams-navigation>
                            <div class="q-mt-lg text-center gt-md">
                                <q-btn flat label="return to feed" to="/"/>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-10 q-pr-lg">
                            <router-view :key="$route.fullPath"/>

                            <div class="q-mt-lg text-center lt-lg">
                                <q-btn flat label="return to feed" to="/"/>
                            </div>
                        </div>
                    </div>
                </div>
            </q-page>
        </q-page-container>
        <app-footer/>
        <dialogs-store/>
    </q-layout>
</template>

<script>
    import TeamsNavigation from '../components/team/TeamsNavigation.vue'
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'
    import DialogsStore from '../components/DialogsStore.vue'

    export default {
        components: {AppHeader, AppFooter, DialogsStore, TeamsNavigation}
    }
</script>