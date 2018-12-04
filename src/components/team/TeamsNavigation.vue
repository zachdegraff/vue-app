<template>
    <div>
        <q-select filter :options="options" v-model="selected"/>
        <q-list link no-border class="teams-navigation q-mt-lg">
            <q-item :to="`/teams/${id}`" :class="{active:isActive('view')}">
                <q-icon name="info" size="1.4rem" class="q-mr-sm"/>
                About
            </q-item>
            <q-item :to="`/teams/${id}/members`" :class="{active:isActive('members')}">
                <q-icon name="group" size="1.4rem" class="q-mr-sm"/>
                Members
            </q-item>
            <q-item :to="`/teams/${id}/plan`" :class="{active:isActive('plan')}">
                <q-icon name="account_balance_wallet" size="1.4rem" class="q-mr-sm"/>
                Plan
            </q-item>
        </q-list>
        <div class="q-mt-lg text-center">
            <q-btn label="create team" color="primary" @click="create"/>
        </div>
        <div class="q-mt-lg text-center"></div>
        <create-team v-if="isTeamAdding"/>
    </div>
</template>
<script>
    import CreateTeam from '../../components/team/CreateTeam.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                selected: null,
                patterns: {
                    view: '^/teams/[0-9]+$',
                    plan: '^/teams/[0-9]+/plan$',
                    members: '^/teams/[0-9]+/members$'
                }
            }
        },
        watch: {
            selected: function (val) {
                if (!val) return;

                this.$router.push(`/teams/${val}`)
            }
        },
        computed: {
            ...mapGetters({
                teams: 'teams/all',
                isTeamAdding: 'modals/isCreateTeamOpen'
            }),
            id() {
                return this.$route.params.id
            },
            options() {
                return this.teams.map(team => {
                    return {value: team.id, label: team.name}
                })
            }
        },
        components: {CreateTeam},
        created() {
            this.selected = parseInt(this.$route.params.id)
        },
        methods: {
            ...mapActions({
                create: 'modals/openCreateTeam',
                changeTeam: 'teams/changeCurrentTeam'
            }),
            isActive(name) {
                const pattern = this.patterns[name] || '';

                return this.$route.fullPath.match(pattern)
            }
        }
    }
</script>
<style lang="scss">
    .teams-navigation {
        .q-item {
            border-left: solid 10px transparent;
            padding: 8px 25px;

            &.router-link-active, &.router-link-exact-active {
                background: none;
            }

            &.active, &:hover {
                background: none;
                border-left-color: #2fab65;
                color: #2fab65
            }
        }
    }
</style>