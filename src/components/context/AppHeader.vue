<template>
    <q-layout-header>
        <q-toolbar color="primary">
            <q-toolbar-title link v-if="teams.length > 0">
                <img :src="photo(current.photo)" class="team-photo round-borders vertical-middle" v-if="current"/><span class="gt-xs">{{current.name}}</span>
                <q-popover max-height="1000px">
                    <q-list link>
                        <q-item v-close-overlay v-for="team in teams" :key="team.id" @click.native="changeTeam(team.id)">
                            <q-item-side>
                                <q-item-tile >
                                    <img :src="photo(team.photo)" class="vertical-middle round-borders" style="width: 50px"/>
                                </q-item-tile>
                            </q-item-side>
                            <q-item-main :label="team.name"/>
                        </q-item>
                        <q-item-separator/>
                        <q-item :to="{name:'teams'}">
                            <q-item-main label="Manage Teams"/>
                        </q-item>
                    </q-list>
                </q-popover>
            </q-toolbar-title>
            <q-toolbar-title v-if="teams.length === 0">
                <q-btn color="white" class="text-black" icon="add" label="Create Team" @click="$router.push({name:'create_team'})"/>
            </q-toolbar-title>
            <q-toolbar-title class="app-logo">
                <router-link :to="{name: 'home'}" class="text-white" style="text-decoration: none">Wonderus</router-link>
            </q-toolbar-title>
            <q-btn color="white" class="text-black gt-xs" icon="add" label="Add Card" @click="create"/>
            <q-btn color="white" class="short-add-button text-black lt-sm" icon="add" @click="create"/>
            <div class="auth-user q-ml-md" v-if="user">
                <img :src="avatar(user.photo)" class="header-icon vertical-middle"/>
                <q-popover>
                    <q-list separator link>
                        <q-item>
                            <q-item-main>
                                <q-item-tile>My Profile</q-item-tile>
                            </q-item-main>
                        </q-item>
                        <q-item @click.native="exit">
                            <q-item-main>
                                <q-item-tile>Logout</q-item-tile>
                            </q-item-main>
                        </q-item>
                    </q-list>
                </q-popover>
            </div>
        </q-toolbar>
    </q-layout-header>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                user: 'auth/authUser',
                current: 'teams/current',
                teams: 'teams/items'
            })
        },
        methods: {
            ...mapActions({
                logout: 'auth/logout',
                changeTeam: 'teams/current'
            }),
            exit() {
                this.logout().then(() => this.$router.push({name: 'login_user'}))
            },
            create() {
                this.$router.push({name: 'create_card'})
            },
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return process.env.API_HOST + path
            },
            avatar(path) {
                if (!path) {
                    return 'statics/profile.jpg'
                }
                return process.env.API_HOST + path
            }
        }
    }
</script>

<style lang="scss">
    .app-logo {
        padding-left: 90px;
    }

    .header-icon {
        cursor: pointer;
        width: 35px;
        border-radius: 50%;
    }
    .team-photo {
        cursor: pointer;
        width: 35px;
        margin: 0 10px 0 -10px
    }

    .short-add-button {
        padding: 4px 10px;
    }

    @media all and (max-width: 576px) {
        .app-logo {
            text-align: center;
        }
    }

</style>