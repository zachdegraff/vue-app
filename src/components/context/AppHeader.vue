<template>
    <q-layout-header>
        <q-toolbar color="primary" class="header-toolbar">
            <q-toolbar-title link v-if="teams.length > 0">
                <div class="current-team-wrapper">
                    <img :src="photo(current.photo)" class="team-photo round-borders vertical-middle" v-if="current"/>
                    <q-popover>
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
                                <q-item-main label="Team Settings"/>
                            </q-item>
                        </q-list>
                    </q-popover>
                </div>
                <search-form class="bg-white round-borders gt-md"/>
            </q-toolbar-title>
            <q-toolbar-title v-if="teams.length === 0">
                <q-btn color="white" class="text-black gt-xs" icon="add" label="Create Team" @click="$router.push({name:'create_team'})"/>
                <q-btn color="white" class="short-add-button text-black lt-sm" icon="add" @click="$router.push({name:'create_team'})"/>
            </q-toolbar-title>
            <div class="header-logo">
                <router-link :to="{name: 'home'}">
                    <img src="statics/header-logo.png"/>
                </router-link>
            </div>
            <q-btn color="white" v-tooltip.top-center="'Create a card'" class="text-black gt-xs" icon="add" label="" v-if="canAddCard" @click="addCard" :disabled="isDisabledAddBtn"/>
            <q-btn color="white" class="short-add-button text-black lt-sm" icon="add" v-if="canAddCard" @click="addCard" :disabled="isDisabledAddBtn"/>
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
</template>
<script>
    import SearchForm from '../../components/SearchForm.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                user: 'auth/user',
                teams: 'teams/all',
                current: 'teams/current',
                isCreating: 'cards/isCreating',
                isValidSubscription: 'subscription/isValid'
            }),
            manage() {
                if (this.current !== null) {
                    return {name: 'view_team', params: {id: this.current.id}}
                }
                return {name: 'teams'}
            },
            canAddCard() {
                if (this.current === null) {
                    return false
                }
                return this.current.isEditable
            },
            isDisabledAddBtn() {
                return this.isCreating || !this.isValidSubscription
            }
        },
        components: {
            SearchForm,
        },
        methods: {
            ...mapActions({
                logout: 'auth/logout',
                addCard: 'editor/create',
                changeCurrentTeam: 'teams/changeCurrentTeam'
            }),
            exit() {
                this.logout().then(() => this.$router.push({name: 'login_user'}))
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
            },
            changeTeam(id) {
                this.changeCurrentTeam(id);
                if (this.$route.path.indexOf('/teams/') === 0) {
                    this.$router.push(`/teams/${id}`)
                }
            }
        }
    }
</script>

<style lang="scss">
    .header-toolbar {
        padding: 4px 45px;
    }

    .header-logo {
        position: absolute;
        top: 13px;
        left: 50%;
        margin-left: -68px;
        z-index: 100;

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
        width: 40px;
        margin: 0 15px 0 -10px
    }

    .short-add-button {
        padding: 4px 10px;
    }

    .current-team-wrapper {
        float: left;
    }

    @media (max-width: 991px) {
        .header-toolbar {
            padding: 4px 12px;
        }
        .header-logo {
            top: 13px;
        }
        .team-photo {
            margin: 0 10px 0 -10px;
        }
    }

    .tooltip {
        display: block !important;
        z-index: 10000;

        .tooltip-inner {
            background: black;
            color: white;
            border-radius: 16px;
            padding: 5px 10px 4px;
        }

        .tooltip-arrow {
            width: 0;
            height: 0;
            border-style: solid;
            position: absolute;
            margin: 5px;
            border-color: black;
        }

        &[x-placement^="top"] {
            margin-bottom: 5px;

            .tooltip-arrow {
                border-width: 5px 5px 0 5px;
                border-left-color: transparent !important;
                border-right-color: transparent !important;
                border-bottom-color: transparent !important;
                bottom: -5px;
                left: calc(50% - 5px);
                margin-top: 0;
                margin-bottom: 0;
            }
        }

        &[x-placement^="bottom"] {
            margin-top: 5px;

            .tooltip-arrow {
                border-width: 0 5px 5px 5px;
                border-left-color: transparent !important;
                border-right-color: transparent !important;
                border-top-color: transparent !important;
                top: -5px;
                left: calc(50% - 5px);
                margin-top: 0;
                margin-bottom: 0;
            }
        }

        &[x-placement^="right"] {
            margin-left: 5px;

            .tooltip-arrow {
                border-width: 5px 5px 5px 0;
                border-left-color: transparent !important;
                border-top-color: transparent !important;
                border-bottom-color: transparent !important;
                left: -5px;
                top: calc(50% - 5px);
                margin-left: 0;
                margin-right: 0;
            }
        }

        &[x-placement^="left"] {
            margin-right: 5px;

            .tooltip-arrow {
                border-width: 5px 0 5px 5px;
                border-top-color: transparent !important;
                border-right-color: transparent !important;
                border-bottom-color: transparent !important;
                right: -5px;
                top: calc(50% - 5px);
                margin-left: 0;
                margin-right: 0;
            }
        }

        &[aria-hidden='true'] {
            visibility: hidden;
            opacity: 0;
            transition: opacity .15s, visibility .15s;
        }

        &[aria-hidden='false'] {
            visibility: visible;
            opacity: 1;
            transition: opacity .15s;
        }
    }
</style>