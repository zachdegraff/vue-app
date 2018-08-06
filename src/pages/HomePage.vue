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
                    <div class="col q-headline">Recently Activity</div>
                </div>
                <div v-show="feed.length > 0">
                    <div v-for="item in feed" :key="item.id" class="row q-pa-md q-mb-md feed-item">
                        <div class="col-lg-1 text-center">
                            <img :src="avatar(item.user.photo)" class="feed-item-avatar"/>
                        </div>
                        <div class="col-lg-11 q-pt-md" v-if="isCard(item)">
                            {{item.user.fullName}} created a new card
                            <a :href="createViewUrl(item.source)" @click.prevent.stop="showCard(item.source.id)">{{item.source.name}}</a>
                        </div>
                        <div class="col-lg-11 q-pt-md" v-if="isAnswer(item)">
                            {{item.user.fullName}} answered a question
                            <span v-if="item.source.card">about <a :href="createViewUrl(item.source.card)" @click.prevent.stop="showCard(item.source.card.id)">{{item.source.card.name}}</a></span>
                            <questions-list :items="[item.source]" class="q-mt-lg"/>
                        </div>
                        <div class="col-lg-11 q-pt-md" v-if="isQuestion(item)">
                            {{item.user.fullName}} asked a question
                            <span v-if="item.source.card">about <a :href="createViewUrl(item.source.card)" @click.prevent.stop="showCard(item.source.card.id)">{{item.source.card.name}}</a></span>
                            <questions-list :items="[item.source]" class="q-mt-lg"/>
                        </div>
                    </div>
                </div>

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
    import QuestionsList from '../components/question/QuestionsList.vue'
    import TagsGridList from '../components/card/TagsGridList.vue'
    import CardsList from '../components/card/CardsList.vue'
    import {mapActions, mapGetters} from 'vuex'
    import {route} from '../helpers'

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
                tags: 'tags/allNonEmpty',
                cardsAmount: 'cards/getCardsAmount',
                isTeamsLoaded: 'teams/isTeamsLoaded',
                questionsAmount: 'questions/getCount',
                isFeedLoaded: 'feed/isFreshFeedLoaded',
                savedCardsAmount: 'users/getFavoriteCardsCount',
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
            TagsGridList, CardsList, SiteNavigation, SlackIntegration, QuestionsList
        },
        methods: {
            ...mapActions({
                createCard: 'editor/create',
                join: 'members/joinMemberToTeam',
                changeQuery: 'search/changeQuery',
                openAskHelp: 'modals/openAskHelp',
                showCard: 'modals/openCardsEditor',
                loadQuestionsCount: 'questions/loadQuestionsCount'
            }),
            avatar(path) {
                if (!path) {
                    return 'statics/profile.jpg'
                }
                return path
            },
            isCard(item) {
                return item.sourceType === 'card'
            },
            isAnswer(item) {
                return item.sourceType === 'question' &&
                    item.actionType === 'answer'
            },
            isQuestion(item) {
                return item.sourceType === 'question' &&
                    item.actionType === 'create'
            },
            createViewUrl(card) {
                return route('view_card', {id: card.id})
            }
        }
    }
</script>
<style lang="scss">
    .feed-item {
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
        vertical-align: top;
    }

    .feed-item-avatar {
        border-radius: 50%;
        vertical-align: middle;
        width: 50px;
    }
</style>