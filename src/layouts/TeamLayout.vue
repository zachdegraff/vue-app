<template>
    <q-layout>
        <app-header></app-header>
        <q-page-container>
            <q-page>
                <div class="row gutter-md q-pa-md">
                    <div class="col-xs-4">
                        <teams-navigation></teams-navigation>
                        <div class="q-pt-lg text-center">
                            <q-btn label="create team" color="primary" @click="create"/>
                        </div>
                    </div>
                    <div class="col-xs-8">
                        <router-view :key="$route.fullPath"/>
                    </div>
                </div>
            </q-page>
        </q-page-container>
        <app-footer></app-footer>
        <create-team v-if="isCreation" @closed="closeCreation"></create-team>
    </q-layout>
</template>

<script>
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'
    import CreateTeam from '../components/team/CreateTeam.vue'
    import TeamsNavigation from '../components/team/TeamsNavigation.vue'
    import ModalManager from '../mixins/ModalManager'

    export default {
        data: () => {
            return {
                isCreation: false
            }
        },
        mixins: [ModalManager],
        components: {AppHeader, AppFooter, TeamsNavigation, CreateTeam},
        methods: {
            create() {
                this.openModalWindow('create_team');
                this.isCreation = true
            },
            closeCreation() {
                this.isCreation = false;
                this.closeModalWindow();
            }
        }
    }
</script>