<template>
    <div id="q-app">
        <q-ajax-bar :delay="100" size="2px" color="white"/>
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
                this.loadFavorite();
                this.loadUserTeams().then(teams => {
                    if (teams.length === 0) {
                        this.$router.push('/welcome')
                    }
                });
            }
        },
        methods: {
            ...mapActions({
                loadAuthUser: 'auth/user',
                loadUserTeams: 'teams/all',
                loadFavorite: 'users/loadFavorite'
            })
        },
    }
</script>

<style>
</style>
