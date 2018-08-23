<template>
    <div>
        <q-card
                v-for="item in questions"
                :key="item.id"
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
                        v-for="comment in item.comments"
                        :key="comment.id"
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
                        </q-item>
                        <q-item>
                            <q-item-main>
                                <p v-html="comment.content"></p>
                                <div v-if="comment.cards.length > 0" class="questions-item-comments-item-cards q-mt-sm">
                                    Linked cards:
                                    <a v-for="card in comment.cards" :key="card.id" href="#" @click.prevent.stop="showCard(card.id)" class="q-ml-sm">{{card.name}}</a>
                                </div>
                            </q-item-main>
                        </q-item>
                    </q-list>
                </div>
            </div>
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
    import {mapActions} from 'vuex'

    export default {
        props: ['items'],
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
                showCard: 'modals/openCardsEditor',
                flushToDefaults: 'questions/flushToDefaults'
            }),
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