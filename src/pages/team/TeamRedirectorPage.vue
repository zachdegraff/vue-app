<template>
    <div class="content-container">
        <div class="row q-ma-lg">
            <div class="col text-center">
                <q-spinner :size="50" color="red"></q-spinner>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                paths: {
                    'team_redirector' : '/teams/:id',
                    'plan_redirector' : '/teams/:id/plan',
                    'members_redirector': '/teams/:id/members'
                }
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current'
            })
        },
        watch: {
            team: function (val) {
                if (val) this.redirect(val)
            }
        },
        created() {
            if (this.team) this.redirect(this.team)
        },
        methods: {
            redirect(team) {
                const path = this.paths[this.$route.name];
                if (path === undefined) return;

                this.$router.push(path.replace(':id', team.id))
            }
        }
    }
</script>