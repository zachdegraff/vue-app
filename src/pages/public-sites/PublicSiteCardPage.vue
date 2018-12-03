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
                    <q-card-main v-html="convertLinks(card)" @click.native="handleClicks"/>
                </q-card>
            </div>
        </div>
        <div class="row flex-center" v-show="!card">
            <div class="col-xs-2 text-center">
                <q-spinner-circles :style="accentColor" size="50"/>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteSearchForm from '../../components/public-sites/SiteSearchForm.vue'

    import PublicSite from '../../mixins/PublicSite'
    import PublicSiteLinks from '../../mixins/PublicSiteLinks'

    import {mapActions} from 'vuex'

    export default {
        mixins: [PublicSite, PublicSiteLinks],
        computed: {
            card() {
                return this.cards.find(card => card.id === parseInt(this.$route.params.cardId))
            }
        },
        components: {
            SiteSearchForm
        },
        methods: {
            setMetaData(site) {
                if (!site) return;

                document.title = `${site.name} | Wonderus`;

                const meta = document.getElementsByTagName("META").namedItem('description');
                if (meta !== undefined) {
                    meta.content = `Quickly decode terms and acronyms with ${this.site.name}`
                }
            }
        }
    }
</script>
