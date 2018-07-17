<template>
    <q-page>
        <search-form></search-form>
        <div class="row flex-center">
            <div class="col-xs-12 col-sm-8">
                <div class="row q-my-lg" v-show="items.length > 0">
                    <div class="col q-headline">Search results</div>
                </div>
                <cards-list :items="items"/>
            </div>
        </div>
        <div class="row flex-center q-mt-lg" v-show="suggestQuery">
            <q-spinner :size="36" color="red" v-show="isLoading"></q-spinner>
            <div class="col text-center q-mt-xl" v-show="isEmptyResult">There are no results.
                <a href="javascript:void(0)" @click="createCard({cardName: suggestQuery})">Create a card for {{suggestQuery}}</a>?
            </div>
        </div>
        <div class="row flex-center q-mt-lg" v-if="isAskHelpAvailable">
            <div class="col text-center q-mt-xl">
                Not finding what you need? <a href="javascript:void(0)" @click="openAskHelp">Ask for help</a>.
            </div>
        </div>
    </q-page>
</template>
<script>
    import SearchForm from '../../components/SearchForm.vue'
    import CardsList from '../../components/card/CardsList'
    import {mapActions, mapGetters} from 'vuex'
    import {route} from '../../helpers'

    export default {
        data: () => {
            return {
                isEmptyResult: false
            }
        },
        created() {
            document.title = this.title;
            this.search().then(this.result);
        },
        watch: {
            team: function (val) {
                document.title = this.title;
                this.search().then(this.result);
            },
            query: function (val) {
                this.isEmptyResult = false;
                document.title = this.title;
                this.search().then(this.result);
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                items: 'search/getResults',
                isLoading: 'search/isSearching',
            }),
            query() {
                return this.$route.query.q
            },
            title() {
                return `Search results for ${this.query} - ${this.team ? this.team.name : ''} - Wonderus`
            },
            suggestQuery() {
                if (this.query.indexOf('#') !== -1) {
                    return this.query.replace(/#(.*?)($|\s+)/g, '').trim()
                }
                return this.query;
            },
            isAskHelpAvailable() {
                if (this.team === null) {
                    return false;
                }
                return true;
            }
        },
        components: {CardsList, SearchForm},
        methods: {
            ...mapActions({
                search: 'search/search',
                changeQuery: 'search/changeQuery',
                openAskHelp: 'modals/openAskHelp',
                createCard: 'modals/openCreateCardWithName'
            }),
            result(items) {
                this.isEmptyResult = items.length === 0
            },
            createViewUrl(card) {
                return route('view_card', {id: card.id})
            }
        }
    }
</script>