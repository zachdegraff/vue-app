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
                        <q-card>
                            <q-card-media>
                                <img :src="getCardImage(card.thumb)">

                                <q-card-title slot="overlay">
                                    <router-link :to="{name: 'view_card', params: {id: card.id}}" class="text-white">{{card.name}}</router-link>
                                </q-card-title>
                            </q-card-media>
                        </q-card>
                    </div>
                </div>
                <div class="row q-my-lg" v-show="recentlyUpdated.length > 0">
                    <div class="col q-headline">Recently Updated</div>
                </div>
                <div class="row gutter-sm" v-show="recentlyUpdated.length > 0">
                    <div class="col-xs-12 col-sm-6 col-lg-3" v-for="card in recentlyUpdated">
                        <q-card>
                            <q-card-media>
                                <img :src="getCardImage(card.thumb)">

                                <q-card-title slot="overlay">
                                    <router-link :to="{name: 'view_card', params: {id: card.id}}" class="text-white">{{card.name}}</router-link>
                                </q-card-title>
                            </q-card-media>
                        </q-card>
                    </div>
                </div>
                <div class="row q-my-lg" v-if="collections.length > 0">
                    <div class="col q-headline">Collections</div>
                </div>
                <collections-grid-list :items="collections"></collections-grid-list>
                <div class="row">
                    <div class="col home-collections">

                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
    import CollectionsGridList from '../components/card/CollectionsGridList'
    import SearchForm from '../components/SearchForm.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                opened: true,
                collections: [],
                recentlyAdded: [],
                recentlyUpdated: []
            }
        },
        created() {
            const hash = localStorage.getItem('join-token');
            if (hash !== null) {
                this.join(hash).then(data => {
                    this.$router.push({name: 'view_team', params: {id: data.member.teamId}})
                })
            }
            if (this.team !== null) {
                this.load(this.team.id)
            }
        },
        watch: {
            team: function (val) {
                this.load(val.id)
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current'
            })
        },
        components: {
            SearchForm, CollectionsGridList
        },
        methods: {
            ...mapActions({
                join: 'teams/join',
                loadRecentlyAdded: 'cards/recentlyAdded',
                loadRecentlyUpdated: 'cards/recentlyUpdated',
                loadTeamCollections: 'cards/collections'
            }),
            load(id) {
                this.loadRecentlyAdded(id).then(items => this.recentlyAdded = items);
                this.loadRecentlyUpdated(id).then(items => this.recentlyUpdated = items);
                this.loadTeamCollections(id).then(items => this.collections = items)
            },
            getCardImage(path) {
                if (path === null) {
                    return 'statics/card-placeholder.png'
                }
                return path
            }
        }
    }
</script>