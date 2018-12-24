<template>
    <q-card class="self-center q-mb-md bg-white">
        <q-list no-border>
            <q-item>
                <q-item-side>
                    <img :src="avatar(item.user.photo)" class="feed-item-avatar"/>
                </q-item-side>
                <q-item-main>
                    <q-item-tile label>{{item.user.fullName}} {{actionTypeLabel}}</q-item-tile>
                    <q-item-tile sublabel>{{toLocaleString(item.createdAt)}}</q-item-tile>
                </q-item-main>
                <q-item-side right v-if="question.canRemove">
                    <q-btn round flat icon="more_vert">
                        <q-popover>
                            <q-list link class="no-border">
                                <q-item @click.native="edit(question)" v-close-overlay>
                                    <q-item-main label="Edit Request"/>
                                </q-item>
                                <q-item @click.native="flush(question)" v-close-overlay>
                                    <q-item-main label="Delete"/>
                                </q-item>
                            </q-list>
                        </q-popover>
                    </q-btn>
                </q-item-side>
            </q-item>
            <q-item>
                <q-item-main>
                    <div v-if="question.card" class="q-mb-sm">Submitted from Card:
                        <a href="" @click.prevent.stop="showCard(question.card.id)">{{question.card.name}}</a>
                    </div>
                    <div v-if="question.searchQuery" class="q-mb-sm">Submitted from Search: {{question.searchQuery}}</div>
                    <p v-html="question.content"></p>
                </q-item-main>
            </q-item>
        </q-list>
        <q-card-actions align="between">
            <q-btn flat no-caps disabled label="No replies" v-if="question.comments.length === 0"/>
            <q-btn
                    flat
                    no-caps
                    @click="toggleComments(question)"
                    :label="repliesTitle(question.comments.length)"
                    :icon="arrowIcon"
                    v-if="comments.length > 0"/>
            <q-btn flat no-caps icon="reply" label="Reply" @click="toggleReplyForm()"/>
        </q-card-actions>
        <comments-list :question="question" v-show="showComments"/>
        <div class="questions-item-reply" v-show="showReplyForm">
            <q-field label="Link cards with answer:" :label-width="3">
                <q-chips-input v-model="cards">
                    <q-autocomplete separator @search="search" @selected="selected" :min-characters="1"/>
                </q-chips-input>
            </q-field>
            <q-field label="Add a comment:" :label-width="3" class="q-my-md">
                <q-input type="textarea" v-model="form.content"/>
            </q-field>
            <div class="text-right">
                <q-btn color="primary" label="submit" @click="submit()"/>
            </div>
        </div>
    </q-card>
</template>
<script>
    import DateFormatter from '../../mixins/DateFormatter'
    import CommentsList from '../question/CommentsList'
    import {mapActions} from 'vuex'

    export default {
        components: {CommentsList},
        props: ['item'],
        data: () => {
            return {
                cards: [],
                form: {
                    cards: [],
                    content: ''
                },
                showComments: false,
                showReplyForm: false
            }
        },
        computed: {
            question() {
                return this.item.source
            },
            comments() {
                if (!this.question) {
                    return []
                }
                return this.question.comments
            },
            arrowIcon() {
                return this.showComments ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
            },
            actionTypeLabel() {
                if (this.item.actionType === 'answer') {
                    return 'answered a request'
                }
                return 'submitted a request'
            }
        },
        mixins: [DateFormatter],
        methods: {
            ...mapActions({
                edit: 'questions/edit',
                reply: 'comments/store',
                hints: 'search/cardsHints',
                remove: 'questions/remove',
                showCard: 'modals/openCardsEditor',
            }),
            submit() {
                const params = {
                    id: this.question.id,
                    ...this.form
                };
                this.reply(params).then(res => {
                    this.comments.push(res.comment);
                    this.toggleComments()
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
                    title: 'Delete request?',
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
            toggleComments() {
                this.showReplyForm = false;
                this.showComments = !this.showComments
            },
            toggleReplyForm() {
                this.showComments = false;
                if (this.showReplyForm === false) {
                    this.form.cards = [];
                    this.form.content = ''
                }
                this.showReplyForm = !this.showReplyForm
            },
            flush(item) {
                this.confirm().then(() => {
                    this.remove(item.id)
                }).catch(() => {
                })
            }
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