<template>
    <q-page>
        <search-form></search-form>
        <div class="row flex-center">
            <div class="col-xs-12 col-sm-8">
                <div class="row q-my-lg">
                    <div class="col q-headline">Questions</div>
                </div>
                <div class="row q-my-lg questions-container">
                    <q-tabs inverted no-pane-border>
                        <!-- Tabs - notice slot="title" -->
                        <q-tab default label="Open" slot="title" name="open"/>
                        <q-tab label="Answered" slot="title" name="answered"/>
                        <q-tab label="My questions" slot="title" name="user"/>

                        <!-- Targets -->
                        <q-tab-pane name="open">
                            <q-infinite-scroll :handler="loadMoreOpenQuestions">
                                <questions-list :items="openQuestions"></questions-list>
                                <q-spinner-circles slot="message" :size="40"></q-spinner-circles>
                            </q-infinite-scroll>
                        </q-tab-pane>
                        <q-tab-pane name="answered">
                            <q-infinite-scroll :handler="loadMoreAnsweredQuestions">
                                <questions-list :items="answeredQuestions"></questions-list>
                                <q-spinner-circles slot="message" :size="40"></q-spinner-circles>
                            </q-infinite-scroll>
                        </q-tab-pane>
                        <q-tab-pane name="user">
                            <q-infinite-scroll :handler="loadMoreUserQuestions">
                                <questions-list :items="userQuestions"></questions-list>
                                <q-spinner-circles slot="message" :size="40"></q-spinner-circles>
                            </q-infinite-scroll>
                        </q-tab-pane>
                    </q-tabs>
                </div>
            </div>
        </div>
    </q-page>
</template>
<script>
    import QuestionsList from '../../components/question/QuestionsList.vue'
    import SearchForm from '../../components/SearchForm.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                userQuestions: 'questions/getUserQuestions',
                openQuestions: 'questions/getOpenQuestions',
                answeredQuestions: 'questions/getAnsweredQuestions'
            })
        },
        components: {
            SearchForm, QuestionsList
        },
        created() {
            this.flushToDefaults()
        },
        methods: {
            ...mapActions({
                flushToDefaults: 'questions/flushToDefaults',
                loadOpenQuestions: 'questions/loadOpenQuestions',
                loadUserQuestions: 'questions/loadUserQuestions',
                loadAnsweredQuestions: 'questions/loadAnsweredQuestions'
            }),
            loadMoreOpenQuestions(idx, done) {
                this.loadOpenQuestions().then((data) => {
                    data.length === 0 ? done(true) : done()
                })
            },
            loadMoreUserQuestions(idx, done) {
                this.loadUserQuestions().then((data) => {
                    data.length === 0 ? done(true) : done()
                })
            },
            loadMoreAnsweredQuestions(idx, done) {
                this.loadAnsweredQuestions().then((data) => {
                    data.length === 0 ? done(true) : done()
                })
            },
        }
    }
</script>
<style lang="scss">
    .questions-container {
        .q-tab-label {
            color: #555;
            text-transform: none;
        }
        .q-tabs-inverted.q-tabs-position-top {
            .q-tabs-panes {
                padding-top: 20px;
                border-top: none;
            }
        }
    }

    .questions-item-comments {
        padding: 0 20px 20px;
    }

    .questions-item-comments-item {
        background: #f0f0f0;
        border-radius: 3px;
        margin-top: 10px;
        &:first-child {
            margin-top: 0;
        }
    }
    .q-infinite-scroll-message {
        text-align: center;
    }
</style>