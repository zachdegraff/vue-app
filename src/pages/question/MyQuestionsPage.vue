<template>
    <q-page>
        <search-form></search-form>
        <div class="row flex-center">
            <div class="col-xs-12 col-sm-8">
                <div class="row q-my-lg">
                    <div class="col q-headline">Questions</div>
                </div>
                <div class="row q-my-lg questions-container">
                    <q-tabs inverted no-pane-border class="col">
                        <!-- Tabs - notice slot="title" -->
                        <q-route-tab label="Open" to="/questions" slot="title" name="open"/>
                        <q-route-tab label="Answered" to="/questions/answered" slot="title" name="answered"/>
                        <q-route-tab label="My questions" to="/questions/my" slot="title" name="user"/>

                        <!-- Targets -->
                        <q-tab-pane name="user">
                            <q-infinite-scroll :handler="loadMoreQuestions">
                                <questions-list :items="questions"></questions-list>
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
                team: 'teams/current',
                questions: 'questions/getUserQuestions'
            })
        },
        watch: {
            team: function (val) {
                if (val === null) return;

                this.loadQuestions()
            }
        },
        components: {
            SearchForm, QuestionsList
        },

        methods: {
            ...mapActions({
                loadQuestions: 'questions/loadUserQuestions'
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