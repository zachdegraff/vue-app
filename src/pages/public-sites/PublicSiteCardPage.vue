<template>
    <div v-if="site">
        <div class="public-site-header q-pt-xl" :overlay="overlay">
            <div class="row flex-center">
                <div class="col-xs-10 col-md-9 col-lg-5 relative-position">
                    <img class="public-site-logo gt-sm" :src="logo"/>
                    <h1 class="text-white">{{site.name}}</h1>

                    <q-search placeholder="Search for acronyms or terms..." v-model="query" inverted color="white" inverted-light hide-underline/>
                </div>
            </div>
        </div>
        <div class="row flex-center" v-if="card">
            <div class="col-xs-11 col-lg-8 col-xl-6">
                <div class="q-mt-md">
                    <router-link :to="`/for/${site.slug}`">{{site.name}}</router-link>
                    <span v-if="card">> {{card.name}}</span>
                </div>
                <q-card class="full-width q-ma-md">
                    <q-card-title>
                        <h2>{{card.name}}</h2>
                        <span slot="subtitle">{{card.shorthand.join(', ')}}</span>
                    </q-card-title>
                    <q-card-main v-html="filterDescription(card)"/>
                </q-card>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

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
            card() {
                return this.cards.find(card => card.id === parseInt(this.$route.params.cardId))
            },
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
            overlay() {
                if (this.site.background) {
                    return `background:url(${this.site.background})`
                }
                if (this.site.primaryColor) {
                    return `background:${this.site.primaryColor}`
                }
                return ''
            }
        },
        watch: {
            site: function (val) {
                this.setMetaData()
            }
        },
        created() {
            if (this.site === null) {
                this.loadSite(this.link);
                this.loadCards(this.link).then(() => {
                    if (!this.card) {
                        this.$router.push({name: 'not_found'})
                    }
                })
            }
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
                    meta.content = `Quickly decode terms and acronyms with ${this.site.name}`
                }
            },
            filterDescription(card) {
                return card.description.replace(/\/(cards|glossary)\/([0-9]+)/g, `/for/${this.link}/$2`)
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
