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
            isMemberInviting: function (val) {
                if (!val) {
                    this.$router.push({name: 'view_team', params: {id: this.id}})
                }
            }
        },
        computed: {
            ...mapGetters({
                isMemberInviting: 'members/getInvitingStatus',
            })
        },
        created() {
            this.view(this.id);
            this.invite(this.id)
        },
        methods: {
            ...mapActions({
                view: 'teams/view',
                invite: 'members/invite',
            })
        }
    }
</script>