<template>
    <div v-if="site">
        <site-search-form :site="site"/>
        <div class="row flex-center" v-show="featuredCards.length > 0">
            <div class="col-xs-11 col-lg-11 col-xl-8">
                <div class="q-mt-xl q-mb-md"><strong class="uppercase">Featured knowledge cards</strong></div>
                <site-cards-list :site="site" :cards="featuredCards"/>
            </div>
        </div>
        <div class="row flex-center">
            <div class="col-xs-11 col-lg-11 col-xl-8">
                <div class="q-mb-md q-mt-lg"><strong class="uppercase">Full glossary</strong></div>
                <glossary-cards :site="site" :items="cards" :letter-color="linkColor"/>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteSearchForm from '../../components/public-sites/SiteSearchForm.vue'
    import SiteCardsList from '../../components/public-sites/SiteCardsList.vue'
    import GlossaryCards from '../../components/public-sites/GlossaryCards'

    import PublicSite from '../../mixins/PublicSite'

    export default {
        mixins: [PublicSite],
        computed: {
            linkColor() {
                if (!this.site) return '';

                return this.site.linkColor
            }
        },
        components: {SiteSearchForm, SiteCardsList, GlossaryCards},
        methods: {
            setMetaData(site) {
                if (!site) return;

                document.title = `${site.name}`;

                const meta = document.getElementsByTagName("META").namedItem('description');
                if (meta !== undefined) {
                    meta.content = `Decode ${site.name}'s commonly used acronyms and terms. Powered by Wonderus.`
                }
            }
        }
    }
</script>
