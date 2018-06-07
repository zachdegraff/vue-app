<template>
    <q-layout>
        <app-header></app-header>

        <q-page-container>
            <router-view :key="$route.fullPath"/>
        </q-page-container>

        <app-footer></app-footer>
        <dialogs-store></dialogs-store>
    </q-layout>
</template>

<script>
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'
    import DialogsStore from '../components/DialogsStore.vue'

    export default {
        components: {
            AppHeader,
            AppFooter,
            DialogsStore
        }
    }
</script>
