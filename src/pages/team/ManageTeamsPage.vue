<template>
    <q-page>
        <div class="row gutter-md q-pa-md">
            <div class="col-xs-4">
                <teams-navigation />
            </div>
            <div class="col-xs-8">

            </div>
        </div>
    </q-page>
</template>
<script>
    import TeamsNavigation from '../../components/team/TeamsNavigation.vue'

    export default {
        components: {TeamsNavigation},
        created() {
            document.title = 'Manage teams - Wonderus';
        },
    }
</script>