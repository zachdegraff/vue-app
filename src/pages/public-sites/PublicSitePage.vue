<template>
    <div v-if="site">
        <div class="public-site-header q-pt-xl" :style="overlay">
            <div class="row flex-center">
                <div class="col-xs-10 col-md-9 col-lg-5 relative-position">
                    <img class="public-site-logo gt-sm" :src="logo"/>
                    <h1 class="text-white">{{site.name}}</h1>

                    <q-search placeholder="Search for acronyms or terms..." v-model="query" :debounce="600" inverted color="white" inverted-light hide-underline/>
                </div>
            </div>
        </div>
        <div class="row flex-center">
            <div class="col-xs-11 col-lg-8 col-xl-6" v-show="query.length === 0">
                <q-card class="full-width q-ma-md" v-for="card in cards" :key="card.id">
                    <q-card-title>
                        <router-link :to="`/for/${site.slug}/${card.id}`" :style="accentColor">{{card.name}}</router-link>
                        <span slot="subtitle">{{card.shorthand.join(', ')}}</span>
                    </q-card-title>
                    <q-card-main v-html="filterDescription(card)"/>
                </q-card>
            </div>
            <div class="col-xs-11 col-lg-8 col-xl-6" v-show="query.length > 0">
                <h2 v-show="items.length === 0 && !isSearching">No results for {{query}}.</h2>
                <q-card class="full-width q-ma-md" v-for="card in items" :key="card.id">
                    <q-card-title>
                        <router-link :to="`/for/${site.slug}/${card.id}`" :style="accentColor">{{card.name}}</router-link>
                        <span slot="subtitle">{{card.shorthand.join(', ')}}</span>
                    </q-card-title>
                    <q-card-main v-html="filterDescription(card)"/>
                </q-card>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data: () => {
            return {
                query: ''
            }
        },
        computed: {
            ...mapGetters({
                site: 'publicSites/getSite',
                cards: 'publicSites/getCards',
                items: 'publicSites/getSearchResults',
                isSearching: 'publicSites/isSearchLoading',
            }),
            logo() {
                if (this.team && this.team.photo) {
                    return this.team.photo
                }
                return 'statics/team.png'
            },
            link() {
                return this.$route.params.name
            },
            team() {
                if (!this.site) {
                    return null
                }
                return this.site.team
            },
            overlay() {
                if (this.site.background) {
                    return {background: `url(${this.site.background})`}
                }
                return {}
            },
            accentColor() {
                if (this.site.accentColor) {
                    return {color: this.site.accentColor}
                }
                return {}
            }
        },
        watch: {
            query: function (val) {
                if (val.length < 1) return;

                this.searchCards({link: this.link, query: val})
            },
            site: function (val) {
                this.setMetaData()
            }
        },
        created() {
            if (this.site !== null) {
                return this.setMetaData()
            }
            this.loadSite(this.link).catch(err => this.$router.push({name: 'not_found'}));
            this.loadCards(this.link)
        },
        methods: {
            ...mapActions({
                loadSite: 'publicSites/loadSite',
                loadCards: 'publicSites/loadCards',
                searchCards: 'publicSites/searchCards',
            }),
            setMetaData() {
                if (!this.site) return;

                document.title = `${this.site.name} | Wonderus`;

                const meta = document.getElementsByTagName("META").namedItem('description');
                if (meta !== undefined) {
                    meta.content = `Search ${this.site.name} for quick answers to acronyms and pages`
                }
            },
            filterDescription(card) {
                let content = card.description.substring(0, 500);
                if (card.description.length > 500) {
                    content += '...'
                }

                content = content.replace(/\/(cards|glossary)\/([0-9]+)/g, `/for/${this.link}/$2`);

                return content
            }
        }
    }
</script>
<style>
    .public-site-header {
        background-image: url('../../statics/public-site-bg.jpeg');
        background-size: cover;
        height: 300px;
    }

    .public-site-logo {
        position: absolute;
        top: 10px;
        left: -70px;
        width: 60px;
        border-radius: 30px;
    }

    .public-site-search input[type='button'] {
        color: #fff;
        font-size: 18px;
        height: 50px;
        cursor: pointer;
        display: inline-block;
        border: 0;
        text-align: center;
        padding: 10px;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
        width: 100px;
        margin-left: 5px;
    }
</style>
