<template>
    <div class="row flex-center window-height">
        <q-spinner-circles color="primary" :size="70"/>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        props: {
            hash: {
                required: true,
                type: String
            }
        },
        computed: {
            ...mapGetters({
                accessToken: 'auth/token'
            })
        },
        mounted() {
            if (this.accessToken) {
                return this.join(this.hash).then(member => {
                    this.$router.push({name: 'view_team', params: {id: member.team_id}})
                })
            }
            localStorage.setItem('join-token', this.hash);
            this.$router.push({name: 'login_user'})
        },
        methods: {
            ...mapActions({
                join: 'teams/join'
            })
        }
    }
</script>