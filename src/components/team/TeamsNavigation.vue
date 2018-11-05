<template>
    <div>
        <q-list highlight inset-separator link class="bg-white q-mt-md" v-if="teams.length>0">
            <q-item v-for="team in teams" :key="team.id" :active="isActive(team)" :to="{name: 'view_team', params: {id: team.id}}">
                <q-item-side>
                    <img :src="photo(team.photo)" class="round-borders" width="50px"/>
                </q-item-side>
                <q-item-main :label="team.name"/>
                <q-item-side right>
                    <q-btn flat round dense icon="more_vert" v-if="team.isEditable">
                        <q-popover>
                            <q-list link>
                                <q-item @click.native="edit(team.id)" v-close-overlay>
                                    <q-item-main label="Edit"/>
                                </q-item>
                                <q-item @click.native="flush(team.id)" v-if="team.isOwner" v-close-overlay>
                                    <q-item-main label="Delete"/>
                                </q-item>
                            </q-list>
                        </q-popover>
                    </q-btn>
                </q-item-side>
            </q-item>
        </q-list>
        <div class="q-pt-lg text-center">
            <q-btn label="create team" color="primary" @click="create"/>
        </div>
        <edit-team v-if="isTeamEditing"/>
        <create-team v-if="isTeamAdding"/>
    </div>
</template>
<script>
    import CreateTeam from '../../components/team/CreateTeam.vue'
    import EditTeam from '../../components/team/EditTeam.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                teams: 'teams/all',
                isTeamEditing: 'modals/isEditTeamOpen',
                isTeamAdding: 'modals/isCreateTeamOpen'
            })
        },
        components: {CreateTeam, EditTeam},
        methods: {
            ...mapActions({
                remove: 'teams/remove',
                edit: 'modals/openEditTeam',
                create: 'modals/openCreateTeam',
            }),
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return path
            },
            flush(id) {
                this.confirm().then(() => {
                    this.remove(id).then(() => {
                        if (this.teams.length === 0) {
                            return this.$router.push({name: 'home'})
                        }
                        return this.$router.push({name: 'view_team', params: {id: this.teams[0].id}})
                    })
                }).catch(() => {
                })
            },
            isActive(item) {
                return item.id === parseInt(this.$route.params.id)
            },
            confirm() {
                return this.$q.dialog({
                    title: 'Confirm',
                    message: 'Are you sure?',
                    cancel: true,
                    color: 'secondary'
                });
            }
        }
    }
</script>