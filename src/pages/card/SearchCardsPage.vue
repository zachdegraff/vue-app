<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Create a card" @click="createCard" class="q-mr-md q-mb-md"/>
                </div>
                <div class="row q-mb-lg">
                    <div class="col q-headline">Search results</div>
                </div>
                <cards-search-list :items="items"/>
                <div class="row flex-center q-mt-lg" v-show="suggestQuery">
                    <q-spinner :size="36" color="red" v-show="isLoading"></q-spinner>
                    <div class="col text-center q-mt-xl" v-show="isEmptyResult">There are no results.
                        <a href="javascript:void(0)" @click="createCard">Create a card for {{suggestQuery}}</a>?
                    </div>
                </div>
                <div class="row flex-center q-mt-lg" v-if="isAskHelpAvailable">
                    <div class="col text-center q-mt-xl">
                        Not finding what you need? <a href="javascript:void(0)" @click="openAskHelp">Submit a request for an answer</a>.
                    </div>
                </div>
            </div>
            <div class="col-lg-3 q-px-xl gt-md">
                <q-btn no-caps color="primary" label="Create a card" @click="createCard" class="full-width q-mb-md" />
            </div>
        </div>
    </div>
</template>
<script>
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import CardsSearchList from '../../components/card/CardsSearchList.vue'
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
        components: {CardsSearchList, SiteNavigation},
        methods: {
            ...mapActions({
                search: 'search/search',
                changeQuery: 'search/changeQuery',
                openAskHelp: 'modals/openAskHelp',
                createCard: 'editor/create'
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