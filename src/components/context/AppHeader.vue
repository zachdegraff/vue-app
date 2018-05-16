<template>
    <q-layout-header>
        <q-toolbar color="primary">
            <q-toolbar-title v-if="teams.length > 0">
                Teams
                <q-popover>
                    <q-list link>
                        <q-item v-for="team in teams" :key="team.id" :to="{name:'view_team', params: {id : team.id}}">
                            <q-item-main :label="team.name"/>
                        </q-item>
                        <q-item-separator/>
                        <q-item :to="{name:'create_team'}">
                            <q-item-main label="Create Team"/>
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
                <img :src="photo(user.photo)" class="header-icon vertical-middle"/>
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
                teams: 'teams/items'
            })
        },
        methods: {
            ...mapActions({
                logout: 'auth/logout'
            }),
            exit() {
                this.logout().then(() => this.$router.push({name: 'login_user'}))
            },
            create() {
                this.$router.push({name: 'create_card'})
            },
            photo(path) {
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

    .short-add-button {
        padding: 4px 10px;
    }

    @media all and (max-width: 576px) {
        .app-logo {
            text-align: center;
        }
    }

</style>