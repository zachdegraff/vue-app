<template>
    <div class="row flex-center window-height">
        <q-spinner-circles color="primary" :size="70"/>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        created() {
            if (this.$route.query.error !== undefined) {
                return this.$router.push({name: 'teams'})
            }
            const params = {
                id: this.$route.query.state,
                code: this.$route.query.code
            };
            this.addSlackIntegration(params)
                .then(() => {
                    this.$router.push({name: 'view_team', params: {id: this.$route.query.state}})
                })
        },
        methods: {
            ...mapActions({
                addSlackIntegration: 'teams/addSlackIntegration'
            })
        }
    }
</script>