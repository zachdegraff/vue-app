<template>
    <div>
        <q-list highlight inset-separator link class="bg-white q-mt-md" v-if="teams.length>0">
            <q-item v-for="team in teams" :key="team.id" :active="isActive(team)">
                <q-item-side>
                    <img :src="photo(team.photo)" class="round-borders" width="50px"/>
                </q-item-side>
                <q-item-main :label="team.name"/>
                <q-item-side right>
                    <q-btn flat round dense icon="more_vert" v-if="team.isEditable">
                        <q-popover>
                            <q-list link>
                                <q-item :to="{name: 'view_team', params: {id: team.id}}" v-close-overlay>
                                    <q-item-main label="View"/>
                                </q-item>
                                <q-item @click.native="flush(team.id)" v-close-overlay>
                                    <q-item-main label="Delete"/>
                                </q-item>
                                <q-item @click.native="reIndex(team.id)" v-close-overlay>
                                    <q-item-main label="Re-Index"/>
                                </q-item>
                                <q-item @click.native="enableSite(team)" v-if="team.isSiteAllowed == 0" v-close-overlay>
                                    <q-item-main label="Enable Public Site"/>
                                </q-item>
                                <q-item @click.native="disableSite(team)" v-if="team.isSiteAllowed == 1" v-close-overlay>
                                    <q-item-main label="Disable Public Site"/>
                                </q-item>
                            </q-list>
                        </q-popover>
                    </q-btn>
                </q-item-side>
            </q-item>
        </q-list>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import {notify, replace} from '../../helpers'

    export default {
        data: () => {
            return {
                teams: null
            }
        },
        methods: {
            ...mapActions({
                index: 'search/index',
                remove: 'teams/remove',
                update: 'teams/update',
                allTeams: 'teams/allTeams',
            }),
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return path
            },
            reIndex(id) {
                this.index(id).then(() => notify('Done'))
            },
            enableSite(id) {
                this.toggleSite(id, 1)
            },
            disableSite(id) {
                this.toggleSite(id, 0)
            },
            toggleSite(team, flag) {
                const data = new FormData();
                for (let i in team) {
                    data.append(i, team[i])
                }
                data.append('_method', 'PUT');
                data.append('isSiteAllowed', flag);

                this.update({id: team.id, form: data}).then(res => this.teams = replace(this.teams, res.team))
            },
            isActive(item) {
                return item.id === parseInt(this.$route.params.id)
            },
        },
        created() {
            this.teams = this.allTeams().then(res => this.teams = res);
        }
    }
</script>