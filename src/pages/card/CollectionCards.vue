<template>
    <div class="row flex-center q-mt-lg">
        <q-spinner :size="50" color="red" v-show="isLoading"></q-spinner>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current',
                isLoading: 'cards/isCardsLoading'
            }),
            collection() {
                return this.$route.params.name
            }
        },
        watch: {
            team: function (val) {
                this.filter(this.params())
            }
        },
        created() {
            this.filter(this.params())
        },
        methods: {
            ...mapActions({
                filter: 'cards/all'
            }),
            params() {
                let params = {collection: this.collection};
                if (this.team !== null) {
                    params['teamId'] = this.team.id
                }
                return params
            }
        }
    }
</script>