<template>
    <div class="row flex-center q-mt-lg">
        <q-spinner :size="36" color="red" v-show="isLoading"></q-spinner>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current',
                isLoading: 'cards/isSearching'
            }),
            query() {
                return this.$route.query.q
            }
        },
        created() {
            this.search(this.params());
        },
        watch: {
            team: function (val) {
                this.search(this.params())
            },
            query: function (val) {
                this.search(this.params(val))
            },
        },
        methods: {
            ...mapActions({
                search: 'cards/search'
            }),
            params(query = null) {
                let params = {query: query || this.query};
                if (this.team !== null) {
                    params['teamId'] = this.team.id
                }
                return params
            }
        }
    }
</script>