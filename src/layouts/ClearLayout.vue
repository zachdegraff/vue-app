<template>
    <q-layout>
        <q-page-container>
            <q-page>
                <router-view></router-view>
            </q-page>
        </q-page-container>
        <dialogs-store></dialogs-store>
    </q-layout>
</template>
<script>
    import DialogsStore from '../components/DialogsStore.vue'

    export default {
        components: {DialogsStore}
    }
</script>