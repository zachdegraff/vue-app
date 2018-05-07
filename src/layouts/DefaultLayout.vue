<template>
    <q-layout>
        <app-header></app-header>

        <q-page-container>
            <router-view/>
        </q-page-container>

        <app-footer></app-footer>
    </q-layout>
</template>

<script>
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'

    export default {
        data: () => {
            return {}
        },
        components: {AppHeader, AppFooter}
    }
</script>
