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
<style lang="scss">
    .page-search-result {
        position: relative;
        margin-top: -50px;
    }

    .card-content {
        position: relative;
    }

    .card-mobile-actions {
        position: absolute;
        font-size: 1.5em;
        right: 10px;
        top: 20px;
        width: 150px;
        text-align: right;
    }
</style>