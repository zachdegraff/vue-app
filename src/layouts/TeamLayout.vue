<template>
    <q-layout>
        <app-header/>
        <q-page-container>
            <q-page>
                <div class="content-container">
                    <div class="row gutter-x-lg">
                        <div class="col-md-12 col-lg-2">
                            <teams-navigation></teams-navigation>
                            <div class="q-mt-lg text-center gt-md">
                                <q-btn flat label="return to feed" to="/"/>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-7">
                            <div class="row lt-lg q-mt-lg">
                                <q-btn label="Create new team" no-caps color="primary" class="q-mr-md q-mb-md" @click="create"/>

                                <q-btn label="Invite new member" outline no-caps color="primary" class="q-mb-md" @click="invite(id)"/>
                            </div>

                            <router-view :key="$route.fullPath"/>

                            <div class="q-mt-lg text-center lt-lg">
                                <q-btn flat label="return to feed" to="/"/>
                            </div>
                        </div>
                        <div class="col-lg-3 q-px-xl gt-md" v-show="id">
                            <q-btn label="Create new team" no-caps color="primary" class="full-width" @click="create"/>

                            <q-btn label="Invite new member" outline no-caps color="primary" class="full-width q-mt-lg" @click="invite(id)"/>
                        </div>
                    </div>
                </div>
            </q-page>
        </q-page-container>
        <app-footer/>
        <dialogs-store/>
    </q-layout>
</template>

<script>
    import TeamsNavigation from '../components/team/TeamsNavigation.vue'
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'
    import DialogsStore from '../components/DialogsStore.vue'
    import {mapActions} from 'vuex'

    export default {
        computed: {
            id() {
                return this.$route.params.id
            }
        },
        components: {AppHeader, AppFooter, DialogsStore, TeamsNavigation},
        methods: {
            ...mapActions({
                create: 'modals/openCreateTeam',
                invite: 'modals/openInviteMember',
            })
        }
    }
</script>