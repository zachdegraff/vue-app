<template>
    <div class="row flex-center q-mt-lg">
        <q-spinner :size="36" style="color: #027be3ff" v-show="isLoading"></q-spinner>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        computed: {
            isLoading() {
                return this.$store.getters['cards/isCardsLoading']
            }
        },
        created() {
            this.load()
        },
        methods: {
            ...mapActions({
                load: 'cards/all'
            })
        }
    }
</script>