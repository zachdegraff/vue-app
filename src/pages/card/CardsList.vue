<template>
    <div class="row flex-center q-mt-lg">
        <q-spinner :size="36" style="color: #027be3ff" v-show="isLoading"></q-spinner>
    </div>
</template>
<script>
    import CardResource from '../../resources/card/CardResource'

    export default {
        data: () => {
            return {
                isLoading: false
            }
        },
        created() {
            this.isLoading = true;
            CardResource.all().then(({data}) => {
                this.isLoading = false;
                this.$store.commit('cards/set', data.data)
            }).catch(() => this.isLoading = false)
        }
    }
</script>