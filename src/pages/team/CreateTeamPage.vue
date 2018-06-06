<template>
    <q-page>
        <create-team @closed="$router.push({name:'teams'})"></create-team>
    </q-page>
</template>
<script>
    import CreateTeam from '../../components/team/CreateTeam.vue'

    export default {
        components: {CreateTeam}
    }
</script>