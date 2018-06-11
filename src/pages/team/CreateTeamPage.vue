<template>
    <q-page>
        <div class="row gutter-md q-pa-md">
            <div class="col-xs-4">
                <teams-navigation></teams-navigation>
            </div>
            <div class="col-xs-8">

            </div>
        </div>
    </q-page>
</template>
<script>
    import TeamsNavigation from '../../components/team/TeamsNavigation.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        watch: {
            isTeamAdding: function (val) {
                if (!val) {
                    this.$router.push({name: 'teams'})
                }
            }
        },
        computed: {
            ...mapGetters({
                isTeamAdding: 'modals/isCreateTeamOpen'
            })
        },
        components: {TeamsNavigation},
        created() {
            this.add()
        },
        methods: {
            ...mapActions({
                add: 'modals/openCreateTeam'
            })
        }
    }
</script>