<template>
    <div v-if="site">
        <site-search-form :site="site"/>
        <div class="row flex-center">
            <div class="col-xs-11 col-lg-8 col-xl-6">
                <div class="q-mt-md">
                    <router-link :to="`/for/${site.slug}`">{{site.name}}</router-link>
                    <span>> Glossary</span>
                </div>
                <div class="q-mt-md">
                    <glossary-cards :site="site" :items="cards" :letter-color="linkColor"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteSearchForm from '../../components/public-sites/SiteSearchForm.vue'
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
        components: {GlossaryCards, SiteSearchForm},
        methods: {
            setMetaData(site) {
                if (!site) return;

                document.title = `Glossary - ${site.name}`;

                const meta = document.getElementsByTagName("META").namedItem('description');
                if (meta !== undefined) {
                    meta.content = `A-Z listing of ${site.name}'s acronyms and terms. Powered by Wonderus.`
                }
            }
        }
    }
</script>
