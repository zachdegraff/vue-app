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
                                <q-item @click.native="flush(team.id)" v-close-overlay>
                                    <q-item-main label="Delete"/>
                                </q-item>
                            </q-list>
                        </q-popover>
                    </q-btn>
                </q-item-side>
            </q-item>
        </q-list>
        <edit-team v-if="isTeamEditing"/>
    </div>
</template>
<script>
    import EditTeam from '../../components/team/EditTeam.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                teams: null
            }
        },
        computed: {
            ...mapGetters({
                isTeamEditing: 'modals/isEditTeamOpen'
            })
        },
        components: {EditTeam},
        methods: {
            ...mapActions({
                allTeams: 'teams/allTeams',
                remove: 'teams/remove',
                edit: 'modals/openEditTeam',
            }),
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return path
            },
            isActive(item) {
                return item.id === parseInt(this.$route.params.id)
            },
        },
        created(){
            this.teams = this.allTeams().then(res => {
                this.teams = res;
            });
        }
    }
</script>