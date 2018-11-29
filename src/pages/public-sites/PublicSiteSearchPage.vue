<template>
    <div v-if="site">
        <site-search-form :site="site"/>
        <div class="row flex-center">
            <div class="col-xs-11 col-lg-8 col-xl-6">
                <div class="q-mt-md">
                    <router-link :to="`/for/${site.slug}`">{{site.name}}</router-link>
                    <span>> Search Results</span>
                </div>
                <h2 v-show="isEmptyResults">No results for "{{query}}". <router-link :to="`/for/${site.slug}/glossary`">View A-Z List.</router-link></h2>

                <site-cards-list :site="site" :cards="cards"/>
            </div>
        </div>
        <div class="row flex-center" v-show="isSearching">
            <div class="col-xs-2 text-center">
                <q-spinner-circles :style="accentColor" size="50"/>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteSearchForm from '../../components/public-sites/SiteSearchForm.vue'
    import SiteCardsList from '../../components/public-sites/SiteCardsList.vue'

    import PublicSite from '../../mixins/PublicSite'

    import {mapGetters, mapActions} from 'vuex'

    export default {
        mixins: [PublicSite],
        components: {SiteSearchForm, SiteCardsList},
        computed: {
            ...mapGetters({
                cards: 'publicSites/getSearchResults',
                isSearching: 'publicSites/isSearchLoading',
            }),
            link() {
                return this.$route.params.name
            },
            query() {
                return this.$route.query.q
            },
            isEmptyResults() {
                if (this.query.length === 0) return;

                return this.cards.length === 0 && !this.isSearching;
            }
        },
        watch: {
            query: function (val) {
                this.search(val)
            }
        },
        created() {
            this.search(this.query)
        },
        methods: {
            ...mapActions({
                searchCards: 'publicSites/searchCards',
            }),
            search(query) {
                this.searchCards({link: this.link, params: {query}})
            },
            setMetaData(site) {
                if (!site) return;

                document.title = `${site.name} | Wonderus`;

                const meta = document.getElementsByTagName("META").namedItem('description');
                if (meta !== undefined) {
                    meta.content = `Search ${site.name} for quick answers to acronyms and pages`
                }
            }
        }
    }
</script>
