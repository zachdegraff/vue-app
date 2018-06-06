<template>
    <div>
        <q-layout-header>
            <q-toolbar color="primary">
                <q-toolbar-title link v-if="teams.length > 0">
                    <img :src="photo(current.photo)" class="team-photo round-borders vertical-middle" v-if="current"/><span class="gt-xs" v-if="current">{{current.name}}</span>
                    <q-popover max-height="1000px">
                        <q-list link>
                            <q-item v-close-overlay v-for="team in teams" :key="team.id" @click.native="changeTeam(team.id)">
                                <q-item-side>
                                    <q-item-tile>
                                        <img :src="photo(team.photo)" class="vertical-middle round-borders" style="width: 50px"/>
                                    </q-item-tile>
                                </q-item-side>
                                <q-item-main :label="team.name"/>
                            </q-item>
                            <q-item-separator/>
                            <q-item :to="manage">
                                <q-item-main label="Manage Teams"/>
                            </q-item>
                        </q-list>
                    </q-popover>
                </q-toolbar-title>
                <q-toolbar-title v-if="teams.length === 0">
                    <q-btn color="white" class="text-black gt-xs" icon="add" label="Create Team" @click="$router.push({name:'create_team'})"/>
                    <q-btn color="white" class="short-add-button text-black lt-sm" icon="add" @click="$router.push({name:'create_team'})"/>
                </q-toolbar-title>
                <div class="app-logo">
                    <router-link :to="{name: 'home'}">
                        <img src="statics/header-logo.png"/>
                    </router-link>
                </div>
                <q-btn color="white" class="text-black gt-xs" icon="add" label="Add Card" @click="openCardCreation"/>
                <q-btn color="white" class="short-add-button text-black lt-sm" icon="add" @click="openCardCreation"/>
                <div class="auth-user q-ml-md" v-if="user">
                    <img :src="avatar(user.photo)" class="header-icon vertical-middle"/>
                    <q-popover>
                        <q-list separator link>
                            <q-item :to="{name: 'profile'}">
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
        <create-card v-if="isCardCreating" @closed="closeCardCreation"></create-card>
    </div>
</template>
<script>
    import CreateCard from '../../components/card/CreateCard.vue'
    import ModalManager from '../../mixins/ModalManager'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                isCardCreating: false
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                teams: 'teams/items',
                current: 'teams/current'
            }),
            manage() {
                if (this.current !== null) {
                    return {name: 'view_team', params: {id: this.current.id}}
                }
                return {name: 'teams'}
            }
        },
        mixins: [ModalManager],
        components: {CreateCard},
        methods: {
            ...mapActions({
                logout: 'auth/logout',
                changeTeam: 'teams/setCurrentTeam'
            }),
            exit() {
                this.logout().then(() => this.$router.push({name: 'login_user'}))
            },
            openCardCreation() {
                this.openModalWindow('create_card');
                this.isCardCreating = true
            },
            closeCardCreation() {
                this.closeModalWindow();
                this.isCardCreating = false
            },
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return path
            },
            avatar(path) {
                if (!path) {
                    return 'statics/profile.jpg'
                }
                return path
            }
        }
    }
</script>

<style lang="scss">
    .app-logo {
        position: absolute;
        top: 13px;
        left: 50%;
        margin-left: -68px;
        img {
            height: 25px;
        }
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

</style>