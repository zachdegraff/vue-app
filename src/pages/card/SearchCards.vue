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
        computed: {
            query() {
                return this.$route.query.q
            }
        },
        created() {
            this.search(this.query);
        },
        watch: {
            query: function (val) {
                this.search(val)
            }
        },
        methods: {
            search(query) {
                this.isLoading = true;
                CardResource.search(query).then(({data}) => {
                    this.isLoading = false;
                    this.$store.commit('cards/set', data.data)
                }).catch(() => this.isLoading = false)
            }
        }
    }
</script>