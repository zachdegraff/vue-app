<template>
    <div>
        <edit-team :id="id" @closed="redirect"></edit-team>
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
        components: {EditTeam},
        methods: {
            redirect() {
                this.$router.push({name: 'view_team', params: {id: this.id}})
            }
        }
    }
</script>