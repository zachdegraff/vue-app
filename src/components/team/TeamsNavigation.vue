<template>
    <div>
        <q-list highlight inset-separator link class="q-mt-md" v-if="teams.length>0">
            <q-item v-for="team in teams" :key="team.id" :active="isActive(team)" :to="{name: 'view_team', params: {id: team.id}}">
                <q-item-side>
                    <img :src="photo(team.photo)" class="round-borders" width="50px"/>
                </q-item-side>
                <q-item-main :label="team.name"/>
                <q-item-side right>
                    <q-btn flat round dense icon="more_vert" v-if="team.isEditable">
                        <q-popover>
                            <q-list link>
                                <q-item @click.native="edit(team)" v-close-overlay>
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
        <edit-team :id="team.id" v-if="team" @closed="closeEditing"></edit-team>
    </div>
</template>
<script>
    import EditTeam from '../../components/team/EditTeam.vue'
    import ModalManager from '../../mixins/ModalManager'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                team: null
            }
        },
        computed: {
            ...mapGetters({
                teams: 'teams/items'
            })
        },
        mixins: [ModalManager],
        components: {EditTeam},
        methods: {
            ...mapActions({
                remove: 'teams/remove'
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
            edit(team) {
                this.openModalWindow('edit_team', {id: team.id});
                this.team = team
            },
            closeEditing() {
                this.closeModalWindow();
                this.team = null
            },
            isActive(item) {
                return item.id === parseInt(this.$route.params.id)
            },
            confirm() {
                return this.$q.dialog({
                    title: 'Prompt',
                    message: 'Are you sure?',
                    cancel: true,
                    color: 'secondary'
                });
            }
        }
    }
</script>