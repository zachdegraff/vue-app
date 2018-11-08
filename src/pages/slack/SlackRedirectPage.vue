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
                return this.$router.push({name: 'integrations'})
            }
            const params = {
                id: this.$route.query.state,
                code: this.$route.query.code
            }, redirect = () => {
                this.reloadCurrentTeam().then(() => this.$router.push({name: 'integrations'}));
            };

            this.addSlackIntegration(params).then(redirect).catch(redirect)
        },
        methods: {
            ...mapActions({
                addSlackIntegration: 'teams/addSlackIntegration',
                reloadCurrentTeam: 'teams/reloadCurrentTeam'
            })
        }
    }
</script>