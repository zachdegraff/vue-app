<template>
    <div></div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: {
            id: {
                required: true
            }
        },
        watch: {
            isTeamEditing: function (val) {
                if (!val) {
                    this.$router.push({name: 'view_team', params: {id: this.id}})
                }
            }
        },
        computed: {
            ...mapGetters({
                isTeamEditing: 'modals/isEditTeamOpen'
            })
        },
        created() {
            this.edit(this.id)
        },
        methods: {
            ...mapActions({
                edit: 'modals/openEditTeam'
            })
        }
    }
</script>