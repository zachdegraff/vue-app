<template>
    <div>
        <edit-team :id="id" @closed="$router.push({name:'view_team', params: {id}})"></edit-team>
    </div>
</template>
<script>
    import EditTeam from "../../components/team/EditTeam"

    export default {
        props: {
            id: {
                required: true
            }
        },
        components: {EditTeam}
    }
</script>