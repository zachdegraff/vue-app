<template>
    <div v-if="site">
        <site-search-form :site="site"/>
        <div class="row flex-center">
            <div class="col-xs-11 col-lg-8 col-xl-6">
                <div class="q-mt-md">
                    <router-link :to="`/for/${site.slug}`">{{site.name}}</router-link>
                    <span>> {{tag}} Tag</span>
                </div>
                <site-cards-list :site="site" :cards="items"/>
            </div>
        </div>
        <div class="row flex-center" v-show="isCardsLoading">
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
        computed: {
            ...mapGetters({
                cards: 'publicSites/getCards',
                isCardsLoading: 'publicSites/isCardsLoading',
            }),
            tag() {
                return this.$route.params.tag
            },
            items() {
                return this.cards.filter(card => {
                    return card.tags.find(tag => tag.name === this.tag) !== undefined
                })
            }
        },
        components: {SiteSearchForm, SiteCardsList},
        methods: {
            setMetaData(site) {
                if (!site) return;

                document.title = `${this.tag} - ${site.name}`;

                const meta = document.getElementsByTagName("META").namedItem('description');
                if (meta !== undefined) {
                    meta.content = `View all acronyms and terms tagged with ${this.tag} on ${site.name}. Powered by Wonderus.`
                }
            }
        }
    }
</script>
