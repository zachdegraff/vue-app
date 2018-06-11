<template>
    <div></div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: {
            id: {
                required: true
            },
            memberId: {
                required: true
            }
        },
        watch: {
            isMemberInviting: function (val) {
                if (!val) {
                    this.$router.push({name: 'view_team', params: {id: this.id}})
                }
            }
        },
        computed: {
            ...mapGetters({
                isMemberInviting: 'modals/isChangeMemberRoleOpen',
            })
        },
        created() {
            this.view(this.id).then(() => this.changeRole(this.memberId))

        },
        methods: {
            ...mapActions({
                view: 'teams/view',
                changeRole: 'modals/openChangeMemberRole',
            })
        }
    }
</script>