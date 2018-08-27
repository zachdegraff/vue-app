<template>
    <div>
        <div class="questions-item-comments">
            <div
                    v-for="comment in question.comments"
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
                        <q-item-side right v-if="comment.canRemove">
                            <q-btn round flat icon="more_vert">
                                <q-popover>
                                    <q-list link class="no-border">
                                        <q-item @click.native="edit(comment)" v-if="comment.canUpdate" v-close-overlay>
                                            <q-item-main label="Edit answer"/>
                                        </q-item>
                                        <q-item @click.native="flush(comment)" v-if="comment.canRemove" v-close-overlay>
                                            <q-item-main label="Delete"/>
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
    </div>
</template>
<script>
    import DateFormatter from '../../mixins/DateFormatter'
    import {mapActions, mapGetters} from 'vuex'
    import AskHelp from '../team/AskHelp.vue'

    export default {
        props: ['question'],
        mixins: [DateFormatter],
        methods: {
            ...mapActions({
                edit: 'comments/edit',
                remove: 'comments/remove',
            }),
            avatar(path) {
                if (!path) {
                    return 'statics/profile.jpg'
                }
                return path
            },
            confirm() {
                return this.$q.dialog({
                    title: 'Delete answer?',
                    message: 'This cannot be undone.',
                    ok: 'Yes, delete',
                    cancel: true,
                    color: 'secondary'
                });
            },
            flush(item) {
                this.confirm().then(() => {
                    this.remove({question: this.question.id, id: item.id})
                }).catch(() => {
                })
            },
        }
    }
</script>