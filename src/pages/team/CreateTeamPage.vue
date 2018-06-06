<template>
    <create-team @closed="$router.push({name:'teams'})"></create-team>
</template>
<script>
    import CreateTeam from '../../components/team/CreateTeam.vue'

    export default {
        components: {CreateTeam}
    }
</script>