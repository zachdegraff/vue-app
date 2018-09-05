<template>
    <div>
        <q-card
                v-for="item in questions"
                :key="`question_${item.id}`"
                class="questions-item self-center q-mb-md bg-white">
            <q-list no-border>
                <q-item>
                    <q-item-side>
                        <img :src="avatar(item.user.photo)" class="questions-item-avatar"/>
                    </q-item-side>
                    <q-item-main>
                        <q-item-tile label>{{item.user.fullName}}</q-item-tile>
                        <q-item-tile sublabel>Asked at {{toLocaleString(item.createdAt)}}</q-item-tile>
                    </q-item-main>
                    <q-item-side right v-if="item.canRemove">
                        <q-btn round flat icon="more_vert">
                            <q-popover>
                                <q-list link class="no-border">
                                    <q-item @click.native="edit(item)" v-close-overlay>
                                        <q-item-main label="Edit Question"/>
                                    </q-item>
                                    <q-item @click.native="flush(item)" v-close-overlay>
                                        <q-item-main label="Delete"/>
                                    </q-item>
                                </q-list>
                            </q-popover>
                        </q-btn>
                    </q-item-side>
                </q-item>
                <q-item>
                    <q-item-main>
                        <div v-if="item.card && !hideSubmittedCard" class="q-mb-sm">Submitted from Card:
                            <a href="#" @click.prevent.stop="showCard(item.card.id)">{{item.card.name}}</a></div>
                        <div v-if="item.searchQuery" class="q-mb-sm">Submitted from Search: {{item.searchQuery}}</div>
                        <p v-html="item.content"></p>
                    </q-item-main>
                </q-item>
            </q-list>
            <q-card-actions align="between">
                <q-btn flat no-caps disabled label="No replies" v-if="item.comments.length === 0"/>
                <q-btn
                        flat
                        no-caps
                        @click="toggleComments(item)"
                        :label="repliesTitle(item.comments.length)"
                        :icon="item.showComments ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                        v-if="item.comments.length > 0"/>
                <q-btn flat no-caps icon="reply" label="Reply" @click="toggleReplyForm(item)"/>
            </q-card-actions>
            <comments-list :question="item" v-show="item.showComments"/>
            <div class="questions-item-reply" v-show="item.showReplyForm">
                <q-field label="Link cards with answer:" :label-width="3">
                    <q-chips-input v-model="cards">
                        <q-autocomplete separator @search="search" @selected="selected" :min-characters="2"/>
                    </q-chips-input>
                </q-field>
                <q-field label="Add a comment:" :label-width="3" class="q-my-md">
                    <q-input type="textarea" v-model="form.content"/>
                </q-field>
                <div class="text-right">
                    <q-btn color="primary" label="submit" @click="submit(item)"/>
                </div>
            </div>
        </q-card>
    </div>
</template>
<script>
    import DateFormatter from '../../mixins/DateFormatter'
    import EditQuestion from '../question/EditQuestion.vue'
    import CommentsList from '../question/CommentsList.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "QuestionList",
        props: {
            items: {
                type: Array,
                required: true
            },
            hideSubmittedCard: {
                type: Boolean,
                default: false
            }
        },
        data: () => {
            return {
                cards: [],
                form: {
                    cards: [],
                    content: ''
                },
                questions: []
            }
        },
        components: {EditQuestion, CommentsList},
        mixins: [DateFormatter],
        watch: {
            cards: function (val) {
                if (val.length === this.form.cards.length) return;

                this.form.cards.forEach((card, index) => {
                    const idx = val.findIndex(c => c.name === card.name);
                    if (idx === -1) {
                        this.form.cards.splice(index, 1)
                    }
                });
            },
            items: function (val) {
                this.questions = val.map(i => {
                    return {...i, showComments: false, showReplyForm: false}
                })
            }
        },
        created() {
            this.flushToDefaults();
            if (this.items.length) {
                this.questions = this.items.map(i => {
                    return {...i, showComments: false, showReplyForm: false}
                })
            }
        },
        methods: {
            ...mapActions({
                show: 'questions/get',
                edit: 'questions/edit',
                reply: 'comments/store',
                askHelp: 'questions/store',
                hints: 'search/cardsHints',
                remove: 'questions/remove',
                getComment: 'comments/get',
                showCard: 'modals/openCardsEditor',
                closeAskHelp: 'modals/closeAskHelp',
                flushToDefaults: 'questions/flushToDefaults'
            }),
            submit(item) {
                const params = {
                    id: item.id,
                    content: this.form.content,
                    cards: this.form.cards.map(c => c.id)

                };
                this.reply(params).then(res => {
                    item.comments.push(res.comment);
                    this.toggleComments(item)
                })
            },
            avatar(path) {
                if (!path) {
                    return 'statics/profile.jpg'
                }
                return path
            },
            selected(item) {
                this.form.cards.push(item)
            },
            search(terms, done) {
                this.hints({terms}).then(items => {
                    const result = items.map(item => {
                        return {
                            ...item,
                            label: item.name,
                            value: item.name
                        };
                    });
                    done(result);
                }).catch(() => done([]));
            },
            confirm() {
                return this.$q.dialog({
                    title: 'Delete question?',
                    message: 'This cannot be undone.',
                    ok: 'Yes, delete',
                    cancel: true,
                    color: 'secondary'
                });
            },
            repliesTitle(amount) {
                if (amount === 1) {
                    return '1 reply'
                }
                return `${amount} replies`
            },
            toggleComments(item) {
                item.showReplyForm = false;
                item.showComments = !item.showComments
            },
            toggleReplyForm(item) {
                item.showComments = false;
                if (item.showReplyForm === false) {
                    this.cards = [];
                    this.form.cards = [];
                    this.form.content = ''
                }
                item.showReplyForm = !item.showReplyForm
            },
            flush(item) {
                this.confirm().then(() => {
                    this.remove(item.id)
                }).catch(() => {
                })
            },
        }
    }
</script>
<style lang="scss">
    .questions-item-reply {
        padding: 20px;
    }

    .questions-item-avatar {
        border-radius: 50%;
        vertical-align: middle;
        width: 40px;
    }
</style>