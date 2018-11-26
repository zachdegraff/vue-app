<template>
    <div v-if="site">
        <site-search-form :site="site"/>
        <div class="row flex-center">
            <div class="col-xs-11 col-lg-8 col-xl-6">
                <site-cards-list :site="site" :cards="cards"/>
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
        methods: {
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
