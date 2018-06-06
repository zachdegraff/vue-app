<template>
    <div>
        <invite-member :id="id" @closed="redirect"/>
    </div>
</template>
<script>
    import InviteMember from '../../components/team/InviteMember.vue'

    export default {
        props: {
            id: {
                required: true
            }
        },
        components: {
            InviteMember
        },
        methods: {
            redirect() {
                this.$router.push({name: 'view_team', params: {id: this.id}})
            }
        }
    }
</script>