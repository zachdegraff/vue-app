<template>
    <q-page>
        <search-form></search-form>
        <div class="row flex-center">
            <div class="col-xs-12 col-sm-8">
                <div class="row q-my-lg" v-show="recentlyAdded.length > 0">
                    <div class="col q-headline">Recently Added</div>
                </div>
                <div class="row gutter-sm" v-show="recentlyAdded.length > 0">
                    <div class="col-xs-12 col-sm-6 col-lg-3" v-for="card in recentlyAdded">
                        <q-card class="cursor-pointer" @click.native="showCard(card.id)">
                            <q-card-media>
                                <img :src="getCardImage(card.thumb)">

                                <q-card-title slot="overlay" v-if="card.thumb">{{card.name}}</q-card-title>
                                <div class="home-card-title q-title" v-if="!card.thumb">{{card.name}}</div>
                            </q-card-media>
                        </q-card>
                    </div>
                </div>
                <div class="row q-my-lg" v-show="recentlyUpdated.length > 0">
                    <div class="col q-headline">Recently Updated</div>
                </div>
                <div class="row gutter-sm" v-show="recentlyUpdated.length > 0">
                    <div class="col-xs-12 col-sm-6 col-lg-3" v-for="card in recentlyUpdated">
                        <q-card class="cursor-pointer" @click.native="showCard(card.id)">
                            <q-card-media>
                                <img :src="getCardImage(card.thumb)">

                                <q-card-title slot="overlay" v-if="card.thumb">{{card.name}}</q-card-title>
                                <div class="home-card-title q-title" v-if="!card.thumb">{{card.name}}</div>
                            </q-card-media>
                        </q-card>
                    </div>
                </div>
                <div class="row q-my-lg" v-if="collections.length > 0">
                    <div class="col q-headline">Collections</div>
                </div>
                <collections-grid-list :items="collections"></collections-grid-list>
            </div>
        </div>
    </q-page>
</template>

<script>
    import CollectionsGridList from '../components/card/CollectionsGridList.vue'
    import SearchForm from '../components/SearchForm.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        created() {
            const hash = localStorage.getItem('join-token');
            if (hash !== null) {
                this.join(hash).then(data => {
                    this.$router.push({name: 'view_team', params: {id: data.member.teamId}})
                })
            }
            document.title = this.title
        },
        watch: {
            team: function (val) {
                document.title = this.title
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                recentlyAdded: 'cards/getRecentlyAdded',
                recentlyUpdated: 'cards/getRecentlyUpdated',
                collections: 'collections/all'
            }),
            title() {
                if (this.team === null) {
                    return 'Wonderus'
                }
                return `${this.team.name} - Wonderus`
            }
        },
        components: {
            SearchForm, CollectionsGridList
        },
        methods: {
            ...mapActions({
                showCard: 'modals/openViewCard',
                join: 'teams/join'
            }),
            getCardImage(path) {
                if (path === null) {
                    return 'statics/blank-card.png'
                }
                return path
            },
        }
    }
</script>
<style lang="scss">
    .home-card-title {
        position: absolute;
        color: #0c0c0c;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        text-align: center;
    }
</style>