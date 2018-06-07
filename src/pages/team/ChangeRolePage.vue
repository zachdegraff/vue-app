<template>
    <div>
        <change-role :id="id" :member-id="memberId" @closed="redirect"/>
    </div>
</template>
<script>
    import ChangeRole from '../../components/team/ChangeRole.vue'

    export default {
        props: {
            id: {
                required: true
            },
            memberId: {
                required: true
            },
        },
        components: {
            ChangeRole
        },
        methods: {
            redirect() {
                this.$router.push({name: 'view_team', params: {id: this.id}})
            }
        }
    }
</script>