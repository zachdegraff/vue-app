<template>
    <q-page>
        <div class="row gutter-md q-pa-md">
            <div class="col-xs-4">
                <teams-navigation @edit="edit"></teams-navigation>
            </div>
            <div class="col-xs-8">

            </div>
        </div>
    </q-page>
</template>
<script>
    import TeamsNavigation from '../../components/team/TeamsNavigation.vue'

    export default {
        data: () => {
            return {
                team: null,
                isCreation: false
            }
        },
        components: {TeamsNavigation},
        created() {
            document.title = 'Manage teams - Wonderus';
        },
        methods: {
            create() {
                this.openModalWindow('create_team');
                this.isCreation = true
            },
            closeCreation() {
                this.isCreation = false;
                this.closeModalWindow();
            },
            edit(team) {
                this.openModalWindow('edit_team', {id: team.id});
                this.team = team
            },
            closeEditing() {
                this.closeModalWindow();
                this.team = null
            },
        }
    }
</script>