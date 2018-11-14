<template>
    <div v-if="site">
        <div class="public-site-header q-pt-xl" :style="overlay">
            <div class="row flex-center">
                <div class="col-xs-10 col-md-9 col-lg-5 relative-position">
                    <img class="public-site-logo gt-sm" :src="logo"/>
                    <h1 class="text-white">{{site.name}}</h1>

                    <q-search placeholder="Search for acronyms or terms..." v-model="query" inverted color="white" inverted-light hide-underline/>
                </div>
            </div>
        </div>
        <div class="row flex-center">
            <div class="col-xs-11 col-lg-8 col-xl-6">
                <h2 v-show="query.length > 0 && items.length == 0">No results for {{query}}.</h2>
                <q-card class="full-width q-ma-md" v-for="card in items" :key="card.id">
                    <q-card-title>
                        <router-link :to="`/for/${site.slug}/${card.id}`">{{card.name}}</router-link>
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
                query: '',
            }
        },
        computed: {
            ...mapGetters({
                site: 'publicSites/getSite',
                cards: 'publicSites/getCards'
            }),
            logo() {
                if (this.team && this.team.photo) {
                    return this.team.photo
                }
                return 'statics/quasar-logo.png'
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
            items() {
                const query = this.query.trim().toLowerCase();

                if (query === '') {
                    return this.cards
                }
                return this.cards.filter(item => item.name.toLowerCase().indexOf(query) !== -1)
            },
            overlay() {
                if (this.site.background) {
                    return {background: `url(${this.site.background})`}
                }
                return {}
            }
        },
        watch: {
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
                loadCards: 'publicSites/loadCards'
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
