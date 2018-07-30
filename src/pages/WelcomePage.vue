<template>
    <div class="row flex-center q-mt-xl">
        <div class="col-xs-11 col-sm-10 col-md-8 col-lg-6">
            <h1>Welcome to Wonderus!</h1>
            <p>Wonderus is your team's new home for sharing internal knowledge and asking questions. You'll need a team to get started.</p>

            <q-btn label="create team" color="primary" @click="openTeamCreator" class="q-mt-md"/>

            <p class="q-mt-lg" v-if="user">If you are expecting an invite for an existing Wonderus team, please make sure a team admin sent the invitation to {{user.email}}.</p>
        </div>
        <create-team v-if="isTeamAdding"/>
    </div>
</template>
<script>
    import CreateTeam from '../components/team/CreateTeam.vue'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                user: 'auth/user',
                team: 'teams/current',
                isTeamAdding: 'modals/isCreateTeamOpen'
            })
        },
        components: {CreateTeam},
        watch: {
            team: function (val) {
                if (val) {
                    this.$router.push({name: 'home'})
                }
            }
        },
        methods: {
            ...mapActions({
                openTeamCreator: 'modals/openCreateTeam'
            })
        }
    }
</script>