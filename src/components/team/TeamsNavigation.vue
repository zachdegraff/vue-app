<template>
    <q-list highlight inset-separator link class="q-mt-md" v-if="teams.length>0">
        <q-item v-for="team in teams" :key="team.id" :active="isActive(team)" :to="{name: 'view_team', params: {id: team.id}}">
            <q-item-side>
                <img :src="photo(team.photo)" class="round-borders" width="50px"/>
            </q-item-side>
            <q-item-main :label="team.name"/>
            <q-item-side right>
                <q-btn flat round dense icon="more_vert">
                    <q-popover>
                        <q-list link>
                            <q-item :to="{name: 'edit_team', params: {id: team.id}}" v-close-overlay>
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
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                teams: 'teams/items'
            })
        },
        methods: {
            ...mapActions({
                remove: 'teams/remove'
            }),
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return process.env.API_HOST + path
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
                    title: 'Prompt',
                    message: 'Are you sure?',
                    cancel: true,
                    color: 'secondary'
                });
            }
        }
    }
</script>