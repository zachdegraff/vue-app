<template>
    <div id="q-app">
        <q-ajax-bar :delay="100" size="2px" color="white"/>
        <router-view/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'App',
        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        },
        created() {
            if (localStorage.getItem('access-token') !== null) {
                this.loadAuthUser().then(res => {
                    this.loadFavorite();
                    this.loadPaidPlans();
                    this.loadUserRoles();
                    if (res.isSuperAdmin !== 1) {
                        this.loadUserTeams().then(teams => {
                            if (teams.length === 0) {
                                this.$router.push('/welcome')
                            }
                        });
                    }
                }).catch(err => {
                    this.logout().then(() => this.$router.push({name: 'login_user'}))
                });
            }
        },
        watch: {
            user: function (val) {
                if (val !== null) {
                    this.logCanny(val);
                    this.logFullStory(val)
                }
            }
        },
        methods: {
            ...mapActions({
                logout: 'auth/flush',
                loadAuthUser: 'auth/user',
                loadPaidPlans: 'plans/all',
                loadUserTeams: 'teams/all',
                loadFavorite: 'users/loadFavorite',
                loadUserRoles: 'users/loadRoles'
            }),
            logCanny(user) {
                Canny('identify', {
                    appID: '5b6c996d366d036c04d07a62',
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.firstName,
                        avatarURL: user.photo
                    }
                })
            },
            logFullStory(user) {
                if (localStorage.getItem('access-token')) {
                    FS.identify(user.id, {
                        displayName: user.firstName,
                        email: user.email,
                    });
                }
            }
        },
    }
</script>

<style>
</style>
