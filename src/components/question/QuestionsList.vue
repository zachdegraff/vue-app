<template>
    <div>
        <q-card
                v-for="(item, index) in questions"
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
                                    <q-item @click.native="destroyQuestion(item)" v-close-overlay>
                                        <q-item-main label="Delete"/>
                                    </q-item>
                                    <q-item @click.native="editQuestion(index,item)" v-close-overlay>
                                        <q-item-main label="Edit Question"/>
                                    </q-item>
                                </q-list>
                            </q-popover>
                        </q-btn>
                    </q-item-side>
                </q-item>
                <q-item>
                    <q-item-main>
                        <div v-if="item.card" class="q-mb-sm">Submitted from Card:
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
            <div class="questions-item-comments" v-show="item.showComments">
                <div
                        v-for="(comment, index) in item.comments"
                        :key="`comment_${comment.id}`"
                        class="questions-item-comments-item">
                    <q-list no-border>
                        <q-item>
                            <q-item-side>
                                <img :src="avatar(comment.user.photo)" class="questions-item-avatar"/>
                            </q-item-side>
                            <q-item-main>
                                <q-item-tile label>{{comment.user.fullName}}</q-item-tile>
                                <q-item-tile sublabel>{{toLocaleString(comment.createdAt)}}</q-item-tile>
                            </q-item-main>
                            <q-item-side right v-if="item.canRemove">
                                <q-btn round flat icon="more_vert">
                                    <q-popover>
                                        <q-list link class="no-border">
                                            <q-item @click.native="editAnswer(index, comment, item)" v-close-overlay>
                                                <q-item-main label="Edit nswer"/>
                                            </q-item>
                                        </q-list>
                                    </q-popover>
                                </q-btn>
                            </q-item-side>
                        </q-item>

                        <q-item>
                            <q-item-main>
                                <p v-html="comment.content"></p>
                                <div v-if="comment.cards.length > 0" class="questions-item-comments-item-cards q-mt-sm">
                                    Linked cards:
                                    <a v-for="card in comment.cards" :key="`card_${card.id}`" href="#"
                                       @click.prevent.stop="showCard(card.id)" class="q-ml-sm">{{card.name}}</a>
                                </div>
                            </q-item-main>
                        </q-item>

                    </q-list>
                </div>
            </div>
            <div class="questions-item-reply" v-show="item.showReplyForm">
                <q-field label="Link cards with answer:" :label-width="3">
                    <q-chips-input v-model="cards" @remove="remove">
                        <q-autocomplete separator @search="search" @selected="selected"  :min-characters="2"/>
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
        <ask-help v-if="isAskEditHelpOpen" ref="askHelp" @modalClosed="onModalClosed" :is-edit="true"></ask-help>
    </div>
</template>
<script>
    import DateFormatter from '../../mixins/DateFormatter'
    import {mapActions, mapGetters} from 'vuex'
    import AskHelp from '../team/AskHelp.vue'

    export default {
        name: "QuestionList",
        props: ['items'],
        data: () => {
            return {
                cards: [],
                form: {
                    cards: [],
                    content: ''
                },
                questions: [],
                isAskEditHelpOpen: false,
            }
        },
        components: {AskHelp},

        mixins: [DateFormatter],
        watch: {
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
                hints: 'search/cardsHints',
                reply: 'questions/comment',
                remove: 'questions/remove',
                show: 'questions/show',
                showComment: 'questions/showComment',
                showCard: 'modals/openCardsEditor',
                flushToDefaults: 'questions/flushToDefaults',
                askHelp: 'questions/store',
                closeAskHelp: 'modals/closeAskHelp'
            }),
            onModalClosed() {
                this.isAskEditHelpOpen = false;
            },
            submit(item) {
                const params = {
                    id: item.id,
                    ...this.form
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
                this.form.cards.push(item.id)
            },
            remove(item){
                this.form.cards.splice( this.form.cards.indexOf(item.id), 1);
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
                    this.form.cards = [];
                    this.form.content = ''
                }
                item.showReplyForm = !item.showReplyForm
            },
            destroyQuestion(item) {
                this.confirm().then(() => {
                    this.remove(item.id)
                }).catch(() => {
                })
            },
            editQuestion(index, item) {
                this.show(item.id).then(res => {
                    this.isAskEditHelpOpen = true;
                    this.$nextTick(() => {
                        this.$refs.askHelp.setId(res.data.id);
                        this.$refs.askHelp.setQuestion(index, res.data.content);
                    });
                })
            },
            editAnswer(index, comment, item) {
                this.showComment(comment.id).then(res => {
                    // item.showReplyForm = false;
                    let cards = [];
                    res[0].cards.forEach((value, key) => {
                        cards.push( value.name);
                        this.form.cards.push( value.id)
                    });
                    console.log('cards',cards);
                    item.showComments = false;
                    if (item.showReplyForm === false) {
                        this.cards = cards;
                        this.form.content = res[0].content
                    }
                    item.showReplyForm = !item.showReplyForm

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