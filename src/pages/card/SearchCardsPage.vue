<template>
    <div>
        <q-page>
            <search-form></search-form>
            <div class="row flex-center">
                <div class="col-xs-12 col-sm-8">
                    <div class="row q-my-lg" v-show="items.length > 0">
                        <div class="col q-headline">Search results</div>
                    </div>
                    <div class="row gutter-sm" v-show="items.length > 0">
                        <div class="col-xs-12 col-sm-6 col-lg-3" v-for="card in items">
                            <q-card class="cursor-pointer" @click.native="showCard(card.id)">
                                <q-card-media>
                                    <img :src="getCardImage(card.thumb)">

                                    <q-card-title slot="overlay" v-if="card.thumb">{{card.name}}</q-card-title>
                                    <div class="search-card-title q-title" v-if="!card.thumb">{{card.name}}</div>
                                </q-card-media>
                            </q-card>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row flex-center q-mt-lg">
                <q-spinner :size="36" color="red" v-show="isLoading"></q-spinner>
                <div class="col text-center q-mt-xl" v-show="isEmptyResult">There are no results.
                    <router-link :to="{name: 'create_card', query: {name: this.query}}">Create a card for {{query}}</router-link>
                    ?
                </div>
            </div>
        </q-page>

    </div>
</template>
<script>
    import ViewCard from '../../components/card/ViewCard.vue'
    import SearchForm from '../../components/SearchForm.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                isEmptyResult: false
            }
        },
        created() {
            document.title = this.title;
            this.search(this.params()).then(this.result);
        },
        watch: {
            team: function (val) {
                document.title = this.title;
                this.search(this.params()).then(this.result);
            },
            query: function (val) {
                this.items = [];
                this.isEmptyResult = false;
                document.title = this.title;
                this.search(this.params(val)).then(this.result);
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                isLoading: 'cards/isSearching',
                items: 'cards/getSearchResults'
            }),
            query() {
                return this.$route.query.q
            },
            title() {
                return `Search results for ${this.query} - ${this.team ? this.team.name : ''} - Wonderus`
            }
        },
        components: {SearchForm, ViewCard},
        methods: {
            ...mapActions({
                search: 'cards/search',
                showCard: 'cards/view'
            }),

            params(query = null) {
                return {query: query || this.query}
            },
            getCardImage(path) {
                if (path === null) {
                    return 'statics/blank-card.png'
                }
                return path
            },
            result(items) {
                this.isEmptyResult = items.length === 0
            }
        }
    }
</script>
<style lang="scss">
    .search-card-title {
        position: absolute;
        color: #0c0c0c;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        text-align: center;
    }
</style>