<template>
    <q-page>
        <search-form></search-form>
        <div class="row flex-center q-mt-md">
            <div class="col-xs-12 col-sm-8">
                <q-btn :to="{name: 'cards_table'}" :label="allCardsCaption" icon="note" class="q-mr-md" v-if="cardsAmount" />
                <q-btn :to="{name: 'saved_cards'}" :label="savedCardsCaption" icon="bookmark" class="q-mr-md" :disabled="!savedCardsAmount"/>
                <q-btn :to="{name: 'questions'}" label="questions" icon="help"/>
            </div>
        </div>
        <div class="row flex-center">
            <div class="col-xs-12 col-sm-8">
                <div class="row q-my-lg" v-show="recentlyAdded.length > 0">
                    <div class="col q-headline">Recently Added</div>
                </div>
                <cards-list :items="recentlyAdded"></cards-list>
                <div class="row q-my-lg" v-show="recentlyUpdated.length > 0">
                    <div class="col q-headline">Recently Updated</div>
                </div>
                <cards-list :items="recentlyUpdated"></cards-list>
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
    import CardsList from '../components/card/CardsList.vue'
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
            document.title = this.title;
            this.changeQuery('')
        },
        watch: {
            team: function (val) {
                document.title = this.title
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                cardsAmount: 'cards/getCardsAmount',
                savedCardsAmount: 'users/getFavoriteCardsCount',
                recentlyAdded: 'cards/getRecentlyAdded',
                recentlyUpdated: 'cards/getRecentlyUpdated',
                collections: 'collections/allNonEmpty'
            }),
            title() {
                if (this.team === null) {
                    return 'Wonderus'
                }
                return `${this.team.name} - Wonderus`
            },
            allCardsCaption() {
                return `all cards (${this.cardsAmount})`
            },
            savedCardsCaption() {
                return `saved cards (${this.savedCardsAmount})`
            }
        },
        components: {
            SearchForm, CollectionsGridList, CardsList
        },
        methods: {
            ...mapActions({
                join: 'members/joinMemberToTeam',
                changeQuery: 'search/changeQuery'
            })
        }
    }
</script>