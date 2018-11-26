<template>
    <div v-if="site">
        <site-search-form :site="site"/>
        <div class="row flex-center">
            <div class="col-xs-11 col-lg-8 col-xl-6">
                <div class="q-mt-md">
                    <router-link :to="`/for/${site.slug}`">{{site.name}}</router-link>
                    <span v-if="card">> {{card.name}}</span>
                </div>
                <q-card class="full-width q-ma-md" v-if="card">
                    <q-card-title>
                        <h2>{{card.name}}</h2>
                        <span slot="subtitle">{{card.shorthand.join(', ')}}</span>
                    </q-card-title>
                    <q-card-main v-html="filterDescription(card)"/>
                </q-card>
            </div>
        </div>
        <div class="row flex-center" v-show="!card">
            <div class="col-xs-2 text-center">
                <q-spinner-circles color="primary" size="50"/>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteSearchForm from '../../components/public-sites/SiteSearchForm.vue'

    import PublicSite from '../../mixins/PublicSite'

    import {mapActions} from 'vuex'

    export default {
        data: () => {
            return {
                card: null,
            }
        },
        mixins: [PublicSite],
        computed: {
            cardId() {
                return this.$route.params.cardId
            }
        },
        components: {
            SiteSearchForm
        },
        created() {
            this.loadCard(this.cardId)
                .then(card => this.card = card)
                .catch(() => this.$router.push({name: 'not_found'}));
        },
        methods: {
            ...mapActions({
                loadCard: 'cards/get'
            }),
            setMetaData(site) {
                if (!site) return;

                document.title = `${site.name} | Wonderus`;

                const meta = document.getElementsByTagName("META").namedItem('description');
                if (meta !== undefined) {
                    meta.content = `Quickly decode terms and acronyms with ${this.site.name}`
                }
            },
            filterDescription(card) {
                let content = card.description.replace(/\/(cards|glossary)\/([0-9]+)/g, `/for/${this.link}/$2`);
                return content.replace(/\/(cards|glossary)\/tag\/(.+?)/g, `/for/${this.link}/tag/$2`)
            }
        }
    }
</script>
