<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Create a card" class="q-mr-md q-mb-md" @click="createCard"/>
                    <q-btn outline no-caps color="primary" label="Ask a question" class="q-mb-md" @click="openAskHelp"/>
                </div>
                <div class="q-card full-width empty_card" v-show="isEmptyTeam">
                    <h2>Wonderus is your new home for team knowledge!</h2>
                    <p>Get started by creating your first Knowledge Card for a frequently used team concept.</p>
                    <q-btn no-caps color="primary" label="Create a card" class="q-mr-md q-mb-md" @click="createCard"/>
                </div>
                <div class="row q-mb-lg" v-show="feed.length > 0">
                    <div class="col q-headline">Recent Activity</div>
                </div>
                <div v-show="feed.length > 0">
                    <div v-for="item in feed" :key="item.id" class="q-mb-md" v-if="item.source">
                        <feed-card-item :item="item" v-if="item.sourceType === 'card'"/>
                        <feed-question-item :item="item" v-if="item.sourceType === 'question'"/>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 q-px-xl gt-md">
                <q-btn no-caps color="primary" label="Create a card" class="full-width q-mb-md" @click="createCard"/>

                <q-btn outline no-caps color="primary" label="Ask a question" class="full-width q-mb-lg" @click="openAskHelp"/>
                <slack-integration class="full-width"/>

                <q-btn v-if="isOwner" outline no-caps color="primary" label="Invite team members" class="full-width q-mb-lg margin-top-24"  @click="invite(team.id)"/>
            </div>
        </div>
        <invite-member v-if="isMemberInviting"></invite-member>
    </div>
</template>

<script>
    import InviteMember from '../components/team/InviteMember.vue'
    import SlackIntegration from '../components/context/SlackIntegration.vue'
    import SiteNavigation from '../components/context/SiteNavigation.vue'
    import FeedQuestionItem from '../components/feed/FeedQuestionItem.vue'
    import FeedCardItem from '../components/feed/FeedCardItem.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                scrolled: null
            }
        },
        created() {
            window.addEventListener('scroll', this.handleScroll);

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
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
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
                isMemberInviting: 'modals/isInviteMemberOpen',
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
            },
            isOwner() {
                if (!this.team) {
                    return false;
                }
                return this.team.isOwner
            },
        },
        components: {
            FeedCardItem, SiteNavigation, SlackIntegration, FeedQuestionItem, InviteMember
        },
        methods: {
            ...mapActions({
                createCard: 'editor/create',
                join: 'members/joinMemberToTeam',
                changeQuery: 'search/changeQuery',
                openAskHelp: 'modals/openAskHelp',
                showCard: 'modals/openCardsEditor',
                loadQuestionsCount: 'questions/loadQuestionsCount',
                load: 'feed/load',
                invite: 'modals/openInviteMember',
                reSendInvite: 'members/retryMemberInvitation',
            }),

            handleScroll() {
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                let param = true;
                if (bottomOfWindow){
                    if (param){
                        this.load();
                    }
                    param = false
                }
            },
        }
    }
</script>
<style lang="scss">
    .feed-item-avatar {
        border-radius: 50%;
        vertical-align: middle;
        width: 40px;
    }
    .margin-top-24{
        margin-top: 24px;
    }
    .empty_card{
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>