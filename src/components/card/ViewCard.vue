<template>
    <div>
        <q-modal v-model="isOpen" @hide="close" no-route-dismiss class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '50vw', minHeight: '50vh'}">
            <app-modal-layout>
                <q-toolbar slot="header">
                    <q-toolbar-title v-if="card">{{card.name}}</q-toolbar-title>
                    <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
                </q-toolbar>

                <div class="row text-center card-item" v-if="!card">
                    <div class="col">
                        <q-spinner :size="50" color="red"></q-spinner>
                    </div>
                </div>

                <div class="row card-item" v-if="card">
                    <div class="col-xs-12 col-sm-5 col-md-6 col-lg-7">
                        <div class="card-item-team" v-if="card.team">{{card.team.name}}</div>
                        <div class="card-item-name">{{card.name}}</div>
                        <component :is="description" v-bind="$props"/>

                        <div class="card-item-section" v-if="card.shorthand.length > 0">
                            <div class="card-item-section-title q-mb-sm">
                                <q-icon name="style"/>
                                Shorthand
                            </div>
                            <em>{{card.shorthand.join(', ')}}</em>
                        </div>

                        <div class="card-item-section" v-if="card.links.length > 0">
                            <div class="card-item-section-title">
                                <q-icon name="link"/>
                                Links
                            </div>
                            <div class="card-item-section-content">
                                <component v-for="link in card.links" :key="link.id" :is="linkEl(link.url)" :to="localPath(link.url)" :href="link.url" target="_blank">{{link.name}}</component>
                            </div>
                        </div>

                        <div class="card-item-section" v-if="card.collections.length > 0">
                            <div class="card-item-section-title">
                                <q-icon name="folder_open"/>
                                Collections
                            </div>
                            <div class="card-item-section-content">
                                <q-chip color="primary" class="q-mr-sm" v-for="collection in card.collections" :key="collection.id">
                                    <router-link :to="{name:'collection_cards', params: {name: collection.name}}" @click.native="closeViewing" class="text-white">#{{collection.name}}</router-link>
                                </q-chip>
                            </div>
                        </div>

                        <div class="card-item-history">
                            <span>{{createdBy}}</span><br/>
                            <span>{{updatedBy}}</span>
                        </div>

                        <div class="card-mobile-actions lt-sm">
                            <q-icon name="menu"/>
                            <q-popover>
                                <q-list separator link>
                                    <q-item v-close-overlay>
                                        <q-item-main>
                                            <q-item-tile class="uppercase">bookmark</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item @click.native="openAskHelp" v-close-overlay>
                                        <q-item-main>
                                            <q-item-tile class="uppercase">ask the team</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item v-close-overlay>
                                        <q-item-main>
                                            <q-item-tile class="uppercase">copy card</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item @click.native="edit(card.id)" v-if="card.canUpdate" v-close-overlay>
                                        <q-item-main>
                                            <q-item-tile class="uppercase">edit card</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                    <q-item @click.native="flush" v-show="card.canRemove" v-close-overlay>
                                        <q-item-main>
                                            <q-item-tile class="uppercase">delete card</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                </q-list>
                            </q-popover>
                        </div>
                    </div>
                    <div class="gt-xs col-sm-1 col-md-1 col-lg-1"></div>
                    <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
                        <div class="card-item-actions gt-xs">
                            <q-btn icon="bookmark_border" flat/>
                            <q-btn icon="help" flat @click="openAskHelp"/>
                            <q-btn icon="content_copy" flat/>
                            <q-btn icon="edit" flat @click="edit(card.id)" v-if="card.canUpdate"/>
                            <q-btn icon="delete" flat @click="flush" v-show="card.canRemove"/>
                        </div>
                        <div class="card-item-image">
                            <img :src="card.image" v-if="card.image"/>
                        </div>
                        <card-note :id="card.id"></card-note>
                    </div>
                </div>
            </app-modal-layout>
        </q-modal>
    </div>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import Markdown from '../../mixins/Markdown'
    import {mapActions, mapGetters} from 'vuex'
    import CardNote from './CardNote.vue'
    import {openURL} from 'quasar'
    import {prop} from '../../helpers'

    const APP_HOST = process.env.APP_HOST;

    export default {
        data: () => {
            return {
                isOpen: true
            }
        },
        mixins: [Markdown],
        computed: {
            ...mapGetters({
                team: 'teams/current',
                card: 'cards/getViewingCard',
            }),
            title() {
                return `${prop(this.card, 'name')} - ${prop(this.team, 'name')} - Wonderus`;
            },
            createdBy() {
                if (!this.card) return '';

                return `Created by ${this.card.user.fullName} on ${this.card.createdAt}`
            },
            updatedBy() {
                if (!this.card || !this.card.lastChange) return '';

                return `Last updated by ${this.card.lastChange.user.fullName} on ${this.card.lastChange.createdAt}`;
            },
            description() {
                return {
                    template: `<div class="card-item-description">${this.markTags(this.card.description)}</div>`,
                    props: this.$options.props,
                    methods: {
                        ...mapActions({
                            view: 'modals/openViewCard',
                            closeViewing: 'modals/closeViewCard'
                        }),
                        open(link) {
                            if (link.indexOf('cards/collection') !== -1) {
                                this.closeViewing();
                                return this.$router.push(link)
                            }
                            const id = link.replace('/cards/', '');

                            this.view(id)
                        }
                    }
                }
            }
        },
        watch: {
            card: function (val) {
                if (val) {
                    document.title = this.title;
                }
            }
        },
        components: {
            AppModalLayout, CardNote
        },
        methods: {
            ...mapActions({
                remove: 'cards/remove',
                edit: 'modals/openEditCard',
                openAskHelp: 'modals/openAskHelp',
                closeViewing: 'modals/closeViewCard'
            }),
            confirm() {
                return this.$q.dialog({
                    title: 'Confirm',
                    message: 'Are you sure?',
                    cancel: true,
                    color: 'secondary'
                });
            },
            close() {
                this.closeViewing();
                this.isOpen = true;
            },
            flush() {
                this.confirm().then(() => {
                    this.remove(this.card.id).then(this.close)
                }).catch(() => {
                })
            },
            linkEl(path) {
                if (path && path.indexOf(APP_HOST) !== -1) {
                    return 'router-link'
                }
                return 'a'
            },
            localPath(path) {
                if (path === null) return '';
                return path.replace(APP_HOST, '')
            },
            redirect(link) {
                openURL(link)
            }
        }
    }
</script>
<style lang="scss">
    .card-item {
        padding: 40px;
        position: relative;
    }

    .card-item-team {
        font-size: .6rem;
        font-weight: bold;
        text-transform: uppercase;
    }

    .card-item-name {
        padding: 15px 0;
        font-size: 2rem;
    }

    .card-item-description {
        line-height: 1.5;
        font-size: 1rem;
        margin-bottom: 40px;
        white-space: pre-line;
    }

    .card-item-section {
        margin-top: 20px;
    }

    .card-item-section-title {
        font-weight: bold;
        .q-icon {
            font-size: 1.2rem;
            margin-right: 5px;
            vertical-align: middle;
        }
    }

    .card-item-section-content {
        color: #757575;
        margin-top: 5px;
        a {
            color: #757575;
            text-decoration: none;
            + a:before {
                content: ', '
            }
        }
    }

    .card-item-history {
        color: #757575;
        font-size: .9rem;
        font-style: italic;
        line-height: 1.5;
        margin-top: 50px;
    }

    .card-item-actions {
        text-align: right;
        font-size: 1.5rem;
        .q-btn {
            font-size: 16px;
            padding: 0 10px;
        }
    }

    .card-item-image {
        margin-top: 30px;
        //max-width: 350px;
        img {
            width: 100%;
        }
    }

    .card-item-note {
        background: #f1f1f1;
        border-radius: 5px;
        padding: 15px 10px;
        margin-top: 35px;
    }

    .card-item-note-title {
        text-transform: uppercase;
        margin-bottom: 10px;
    }

    .card-mobile-actions {
        position: absolute;
        font-size: 1.5em;
        right: 10px;
        top: 20px;
        width: 150px;
        text-align: right;
    }
</style>