<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Create a card" class="q-mr-md q-mb-md" @click="createCard"/>
                    <q-btn outline no-caps color="primary" label="Ask a question" class="q-mb-md" @click="openAskHelp"/>
                </div>
                <div class="row q-headline" v-show="isEmptyTeam">
                    There's nothing here yet. Create a knowledge card for a team concept.
                </div>
                <div class="row q-mb-lg" v-show="feed.length > 0">
                    <div class="col q-headline">Recent Activity</div>
                </div>
                <div v-show="feed.length > 0">
                    <div v-for="item in feed" :key="item.id" class="q-mb-md">
                        <feed-card-item :item="item" v-if="item.sourceType === 'card'"/>
                        <feed-question-item :item="item" v-if="item.sourceType === 'question'"/>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 q-px-xl gt-md">
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
    import FeedQuestionItem from '../components/feed/FeedQuestionItem.vue'
    import FeedCardItem from '../components/feed/FeedCardItem.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        created() {
            const hash = localStorage.getItem('join-token');
            if (hash !== null) {
                this.join(hash).then(data => {
                    this.$router.push({name: 'view_team', params: {id: data.member.teamId}})
                })
            }
            if (this.isTeamsLoaded) {
                if (!this.team) {
                    this.$router.push({name: 'welcome'})
                }
            }
            document.title = this.title;
            this.changeQuery('');
            this.loadQuestionsCount();
        },
        watch: {
            team: function (val) {
                document.title = this.title
            },
            isTeamsLoaded: function (val) {
                if (val) {
                    if (!this.team) {
                        this.$router.push({name: 'welcome'})
                    }
                }
            }
        },
        computed: {
            ...mapGetters({
                feed: 'feed/getItems',
                team: 'teams/current',
                isTeamsLoaded: 'teams/isTeamsLoaded',
                isFeedLoaded: 'feed/isFreshFeedLoaded',
            }),
            title() {
                if (this.team === null) {
                    return 'Wonderus'
                }
                return `${this.team.name} - Wonderus`
            },
            isEmptyTeam() {
                if (!this.isFeedLoaded) return false;

                return this.feed.length === 0
            }
        },
        components: {
            FeedCardItem, SiteNavigation, SlackIntegration, FeedQuestionItem
        },
        methods: {
            ...mapActions({
                createCard: 'editor/create',
                join: 'members/joinMemberToTeam',
                changeQuery: 'search/changeQuery',
                openAskHelp: 'modals/openAskHelp',
                showCard: 'modals/openCardsEditor',
                loadQuestionsCount: 'questions/loadQuestionsCount'
            })
        }
    }
</script>
<style lang="scss">
    .feed-item-avatar {
        border-radius: 50%;
        vertical-align: middle;
        width: 40px;
    }
</style>