<template>
    <div class="row flex-center q-mt-lg">
        <q-spinner :size="36" color="red" v-show="isLoading"></q-spinner>
        <div class="col text-center q-mt-xl" v-show="isEmptyResult">There are no results.
            <router-link :to="{name: 'create_card', query: {name: this.query}}">Create a card for {{query}}</router-link>
            ?
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                isEmptyResult: false
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                isLoading: 'cards/isSearching'
            }),
            query() {
                return this.$route.query.q
            },
            title() {
                return `Search results for ${this.query} - ${this.team ? this.team.name : ''} - Wonderus`
            }
        },
        created() {
            document.title = this.title;
            this.search(this.params()).then(this.emptyResponse);
        },
        watch: {
            team: function (val) {
                document.title = this.title;
                this.search(this.params()).then(this.emptyResponse);
            },
            query: function (val) {
                this.isEmptyResult = false;
                document.title = this.title;
                this.search(this.params(val)).then(this.emptyResponse);
            }
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
            },
            emptyResponse(data) {
                this.isEmptyResult = data.length === 0
            }
        }
    }
</script>