<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7 q-headline">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Create a card" class="q-mr-md q-mb-md" @click="createCard"/>
                    <q-btn outline no-caps color="primary" label="Ask a question" class="q-mb-md" @click="openAskHelp"/>
                </div>
                <div class="row q-mb-lg" v-show="recentlyAdded.length > 0">
                    <div class="col q-headline">Recently Added</div>
                </div>
                <cards-list :items="recentlyAdded"></cards-list>
                <div class="row q-my-lg" v-show="recentlyUpdated.length > 0">
                    <div class="col q-headline">Recently Updated</div>
                </div>
                <cards-list :items="recentlyUpdated"></cards-list>
            </div>
            <div class="col-lg-3 q-pa-xl gt-md">
                <q-btn no-caps color="primary" label="Create a card" class="full-width q-mb-md" @click="createCard"/>
                <q-btn outline no-caps color="primary" label="Ask a question" class="full-width q-mb-lg" @click="openAskHelp"/>
                <slack-integration class="full-width"/>
            </div>
        </div>
    </div>
</template>

<script>
    import SlackIntegration from '../components/context/SlackIntegration.vue'
    import SiteNavigation from '../components/context/SiteNavigation.vue'
    import TagsGridList from '../components/card/TagsGridList.vue'
    import CardsList from '../components/card/CardsList.vue'
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
            this.changeQuery('');
            this.loadQuestionsCount();
        },
        watch: {
            team: function (val) {
                document.title = this.title
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                tags: 'tags/allNonEmpty',
                cardsAmount: 'cards/getCardsAmount',
                questionsAmount: 'questions/getCount',
                savedCardsAmount: 'users/getFavoriteCardsCount',
                recentlyAdded: 'cards/getRecentlyAdded',
                recentlyUpdated: 'cards/getRecentlyUpdated',
            }),
            title() {
                if (this.team === null) {
                    return 'Wonderus'
                }
                return `${this.team.name} - Wonderus`
            }
        },
        components: {
            TagsGridList, CardsList, SiteNavigation, SlackIntegration
        },
        methods: {
            ...mapActions({
                createCard: 'editor/create',
                join: 'members/joinMemberToTeam',
                changeQuery: 'search/changeQuery',
                openAskHelp: 'modals/openAskHelp',
                loadQuestionsCount: 'questions/loadQuestionsCount'
            })
        }
    }
</script>