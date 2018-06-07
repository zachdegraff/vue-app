<template>
    <div id="q-app">
        <q-ajax-bar :delay="100" size="2px" color="red"/>
        <router-view/>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'App',
        created() {
            if (localStorage.getItem('access-token') !== null) {
                this.loadAuthUser();
                this.loadUserTeams()
            }
        },
        methods: {
            ...mapActions({
                loadAuthUser: 'auth/user',
                loadUserTeams: 'teams/all',
            })
        },
    }
</script>

<style>
</style>
