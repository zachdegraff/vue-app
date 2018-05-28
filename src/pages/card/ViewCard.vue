<template>
    <q-modal v-model="isOpen" @hide="close" class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '50vw', minHeight: '50vh'}">
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
                    <div class="card-item-description">{{card.description}}</div>

                    <div class="card-item-section" v-if="links">
                        <div class="card-item-section-title">
                            <q-icon name="link"/>
                            Links
                        </div>
                        <div class="card-item-section-content" v-html="links"></div>
                    </div>

                    <div class="card-item-section" v-if="collections">
                        <div class="card-item-section-title">
                            <q-icon name="folder_open"/>
                            Collections
                        </div>
                        <div class="card-item-section-content" v-html="collections"></div>
                    </div>

                    <div class="card-item-history">
                        <span>Created by John Doe on 05/12/2018</span><br/>
                        <span>Last updated by John Doe on 05/12/2018</span>
                    </div>

                    <div class="card-mobile-actions lt-sm">
                        <q-icon name="menu"/>
                        <q-popover>
                            <q-list separator link>
                                <q-item>
                                    <q-item-main>
                                        <q-item-tile class="uppercase">ask the team</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item>
                                    <q-item-main>
                                        <q-item-tile class="uppercase">save</q-item-tile>
                                    </q-item-main>
                                </q-item>
                                <q-item>
                                    <q-item-main>
                                        <q-item-tile class="uppercase">edit card</q-item-tile>
                                    </q-item-main>
                                </q-item>
                            </q-list>
                        </q-popover>
                    </div>
                </div>
                <div class="gt-xs col-sm-1 col-md-1 col-lg-1"></div>
                <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
                    <div class="card-item-actions">
                        <q-btn icon="bookmark_border" flat/>
                        <q-btn icon="help" flat/>
                        <q-btn icon="content_copy" flat/>
                        <q-btn icon="edit" flat @click="$router.push({name:'edit_card', params: {id}})"/>
                        <q-btn icon="delete" flat/>
                    </div>
                    <div class="card-item-image">
                        <img :src="card.thumb" v-if="card.thumb"/>
                    </div>
                    <div class="card-item-note">
                        <div class="card-item-note-title">private note</div>
                        <div>This is a note written by the user for this card</div>
                    </div>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import {mapActions} from 'vuex'
    import {openURL} from 'quasar'


    export default {
        props: {
            id: {
                required: true
            }
        },
        data: () => {
            return {
                card: null,
                isOpen: true
            }
        },
        created() {
            this.load(this.id).then(data => this.card = data);
        },
        computed: {
            links() {
                return this.card.links.map(link => `<a href="${link.url}">${link.name}</a>`).join(', ')
            },
            collections() {
                return this.card.collections.map(collection => `<a href="#">#${collection.name}</a>`).join(', ')
            }
        },
        components: {
            AppModalLayout
        },
        methods: {
            ...mapActions({
                load: 'cards/get'
            }),
            close() {
                const path = this.$store.getters['route/previous'];
                if (path === null) {
                    return this.$router.push({name: 'cards_list'})
                }
                this.$router.push(path)
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
        font-size: .9rem;
        margin-bottom: 40px;
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
            font-style: italic;
            text-decoration: none;
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
        max-width: 350px;
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

    .card-content {
        position: relative;
    }

    .card-description {
        white-space: pre-line;
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