<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Ask a question" @click="openAskHelp" class="q-mb-md"/>
                </div>
                <div class="row q-mb-lg">
                    <div class="col q-headline">Questions</div>
                </div>
                <div class="row q-my-lg questions-container">
                    <q-tabs no-pane-border color="#f7f7f7" class="col">
                        <!-- Tabs - notice slot="title" -->
                        <q-route-tab label="Open" to="/questions" slot="title" name="open"/>
                        <q-route-tab label="Answered" to="/questions/answered" slot="title" name="answered"/>
                        <q-route-tab label="My questions" to="/questions/my" slot="title" name="user"/>

                        <!-- Targets -->
                        <q-tab-pane name="open">
                            <q-infinite-scroll :handler="loadMoreQuestions">
                                <div class="q-mt-md" v-show="questions.length === 0">There are no questions that need to be answered. Ask one!</div>
                                <questions-list :items="questions"></questions-list>
                                <q-spinner slot="message" :size="40" color="red"/>
                            </q-infinite-scroll>
                        </q-tab-pane>
                    </q-tabs>
                </div>
            </div>
            <div class="col-lg-3 q-pa-xl gt-md">
                <q-btn no-caps color="primary" label="Ask a question" @click="openAskHelp" class="full-width q-mb-lg"/>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import QuestionsList from '../../components/question/QuestionsList.vue'
    import SearchForm from '../../components/SearchForm.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current',
                questions: 'questions/getOpenQuestions'
            })
        },
        watch: {
            team: function (val) {
                if (val === null) return;

                this.loadQuestions()
            }
        },
        components: {
            SearchForm, QuestionsList, SiteNavigation
        },
        mounted() {

        },
        methods: {
            ...mapActions({
                openAskHelp: 'modals/openAskHelp',
                loadQuestions: 'questions/loadOpenQuestions'
            }),
            loadMoreQuestions(idx, done) {
                this.loadQuestions().then((data) => {
                    data.length === 0 ? done(true) : done()
                })
            }
        }
    }
</script>
<style lang="scss">
    .questions-container {
        .q-tabs-bar {
            border-color: #2fab65
        }
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