<template>
    <q-page>
        <div class="q-headline col-md-8 margin-bottom-20">

        </div>
        <div class="row gutter-md q-pa-md">

            <div class="col-xs-4">
                <router-link v-bind:to="'/'" tag='a' class='primary not_underlined'>← Return to Team Feed</router-link>
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
<style>
    .not_underlined{
        text-decoration: none;
    }
</style>