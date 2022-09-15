<template>
    <div class="row flex-center window-height">
        <q-spinner-circles color="primary" :size="70"/>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import {error} from "../../helpers";

export default {
    created() {

        if (this.$route.query.code !== undefined) {
            this.authorize(this.$route.query.code)
        }

        return this.$router.push('/')


        this.addSlackIntegration(params).then(redirect).catch(redirect)
    },
    methods: {
        ...mapActions({
            openIdAuthorize: 'auth/openIdAuthorize',
        }),
        authorize(code) {
            this.openIdAuthorize({code:code, provider: 'slack'}).then((data) => {
                console.log(data);
            }).catch(

            )
        }
    }
}
</script>
