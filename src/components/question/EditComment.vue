<template>
    <q-modal v-model="isOpen" @hide="closeEditComment" class="app-modal" :content-classes="['app-ask-help-content']">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Edit your answer</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <form class="row q-pa-xl flex-center" v-if="comment">
                <q-field class="col-xs-12" float-label="Link cards with answer:" :label-width="12">
                    <q-chips-input v-model="cards">
                        <q-autocomplete separator @search="search" @selected="selected" :min-characters="2"/>
                    </q-chips-input>
                </q-field>
                <q-field class="col-xs-12 q-mt-md" :error="$v.comment.$error" :error-label="firstErrorFor($v.comment.content)">
                    <q-input type="textarea" v-model="comment.content" @blur="$v.comment.content.$touch" float-label="Type your answer"></q-input>
                </q-field>
                <br>
                <q-field class="col-xs-12 q-mt-xl">
                    <q-btn color="primary" label="Submit" @click="submit" :disable="isProcessing"></q-btn>
                </q-field>
            </form>
        </app-modal-layout>
    </q-modal>
</template>

<script>
    import AppModalLayout from '../context/modal/AppModalLayout'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        components: {AppModalLayout},
        data: () => {
            return {
                cards: [],
                isOpen: true
            }
        },
        computed: {
            ...mapGetters({
                isProcessing: 'comments/isUpdating',
                comment: 'comments/getEditingComment'
            }),
        },
        mixins: [ValidatorMessages],
        validations: {
            comment: {
                content: {
                    required
                },
            },
        },
        created() {
            this.cards = this.comment.cards.map(c => c.name)
        },
        watch: {
            cards: function (val) {
                if (val.length === this.comment.cards.length) return;

                this.comment.cards.forEach((card, index) => {
                    const idx = val.findIndex(c => c.name === card.name);
                    if (idx === -1) {
                        this.comment.cards.splice(index, 1)
                    }
                });
            }
        },
        methods: {
            ...mapActions({
                update: 'comments/update',
                hints: 'search/cardsHints',
                closeEditComment: 'modals/closeEditComment',
            }),
            selected(item) {
                this.comment.cards.push(item)
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
            submit() {
                this.$v.comment.$touch();
                if (this.$v.comment.$error) {
                    return
                }
                const params = {
                    id: this.comment.id,
                    question: this.comment.questionId,
                    content: this.comment.content,
                    cards: this.comment.cards.map(i => i.id)
                };
                this.update(params).then(this.closeEditComment)
            }
        }
    }
</script>
<style lang="scss">
    .app-modal {
        .app-ask-help-content {
            top: 100px;
            left: 50%;
            max-width: 600px;
            margin: 0 0 100px -300px;
            overflow: visible;
            max-height: none;

            .text-card-name {
                margin-top: 15px;
                margin-left: -24px
            }
        }
    }

    @media (max-width: 767px) {
        .app-modal {
            .app-ask-help-content {
                top: 0;
                left: 0;
                margin: 0;
                overflow: auto;
            }
        }
    }
</style>