<template>
    <q-modal v-model="isOpen" @hide="close" class="app-modal" :content-classes="contentClasses" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div class="cards-editor-actions" :class="{'in-sidebar': isSidebarVisible}">
            <button class="cards-editor-actions-close" @click="isOpen=false">
                <q-icon name="close"/>
            </button>
            <button class="cards-editor-actions-fullscreen" @click="fullScreen">
                <q-icon name="fullscreen"/>
            </button>
        </div>
        <div class="cards-editor-sidebar-actions row" v-show="isSidebarVisible">
            <div class="cards-editor-sidebar-actions-search col-lg-6">
                <q-search hide-underline v-model="query" placeholder="Add existing card to list">
                    <q-autocomplete separator @search="search" @selected="selected" :min-characters="2"/>
                </q-search>
            </div>
            <div class="cards-editor-sidebar-actions-create col-lg-6">
                <q-btn no-caps flat label="Create new" icon="add" @click="add"/>
            </div>
        </div>
        <app-modal-layout>
            <div class="cards-editor">
                <div class="cards-editor-sidebar" :class="{collapsed: !isSidebarVisible}" v-show="isSidebarVisible">
                    <ul class="cards-editor-cards">
                        <li v-for="card in cards" :key="card.id" @click="changeActiveCard(card.id)" :class="{active: card.id === active.id}">
                            {{card.name}}
                            <q-btn flat dense icon="close" @click.prevent.stop="hide(card.id)"/>
                        </li>
                    </ul>
                </div>
                <div class="cards-editor-main">
                    <button class="cards-editor-sidebar-collapse" @click="collapse">
                        <i></i>
                        <q-icon :name="collapseIconName"/>
                        <i></i>
                    </button>
                    <div class="cards-editor-status">
                        <q-spinner color="secondary" :size="16" v-show="isUpdating"/>
                        <span v-show="!isUpdating">Saved</span>
                    </div>
                    <div class="float-right" v-if="active">
                        <q-btn icon="bookmark" flat dense @click="toggleFavorite(active.id)" v-show="isSaved(active.id)"/>
                        <q-btn icon="bookmark_border" flat dense @click="toggleFavorite(active.id)" v-show="!isSaved(active.id)"/>
                        <q-btn icon="help" flat dense @click="openAskHelp"/>
                        <q-btn icon="delete" flat dense @click.prevent.stop="flush($event)" v-show="active.canRemove"/>
                    </div>
                    <div>
                        <q-input
                                dense
                                hide-underline
                                class="q-title"
                                v-model="form.name"
                                @blur="save"/>
                    </div>
                    <div style="clear:both"></div>
                    <div class="cards-editor-shorthand">
                        <q-input
                                dense
                                hide-underline
                                v-model="form.shorthand"
                                placeholder="Shorthand"
                                :before="[{icon: 'style', handler () {}}]"
                                @blur="save"/>
                    </div>
                    <div class="cards-editor-collections">
                        <q-chips-input
                                hide-underline
                                v-model="form.collections"
                                placeholder="Collections"
                                :before="[{icon: 'folder_open', handler () {}}]"
                                @blur="save">
                            <q-autocomplete :static-data="suggests"/>
                        </q-chips-input>
                    </div>
                    <content-editor :card="active" @input="changeContent" @blur="save" v-if="active"></content-editor>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../context/modal/AppModalLayout'
    import ContentEditor from '../editor/ContentEditor.vue'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data: () => {
            return {
                form: {
                    id: '',
                    name: '',
                    teamId: '',
                    shorthand: '',
                    collections: [],
                    description: ''
                },
                query: '',
                suggests: {field: 'label', list: []},
                isSidebarVisible: true,
                isFullScreen: false,
                isOpen: true
            }
        },
        components: {AppModalLayout, ContentEditor},
        computed: {
            ...mapGetters({
                team: 'teams/current',
                isSaved: 'users/isFavorite',
                isUpdating: 'cards/isUpdating',
                active: 'editor/getActiveCard',
                cards: 'editor/getEditorCards',
                collections: 'collections/all',
            }),
            contentClasses() {
                let list = ['app-modal-content'];
                if (this.isFullScreen) {
                    list.push('fullscreen')
                }
                return list
            },
            collapseIconName() {
                if (this.isSidebarVisible) {
                    return 'chevron_left'
                }
                return 'chevron_right'
            }
        },
        watch: {
            active: function (val) {
                Object.keys(this.form).forEach(key => {
                    if (key === 'shorthand') {
                        return this.form.shorthand = val.shorthand.join(', ');
                    }
                    if (key === 'collections') {
                        return this.form.collections = val.collections.map(item => item.name);
                    }
                    this.form[key] = val[key]
                })
            }
        },
        created() {
            this.isSidebarVisible = !this.$q.platform.is.mobile;
            this.suggests.list = this.collections.map(item => {
                return {label: item.name}
            })
        },
        methods: {
            ...mapActions({
                hide: 'editor/hide',
                create: 'cards/create',
                update: 'cards/update',
                hints: 'search/cardsHints',
                toggleFavorite: 'users/favorite',
                close: 'modals/closeCardsEditor',
                openAskHelp: 'modals/openAskHelp',
                changeActiveCard: 'editor/open',
            }),
            add() {
                const params = {
                    name: 'Untitled card',
                    teamId: this.team.id
                };

                this.create(params).then(res => this.changeActiveCard(res.card.id))
            },
            save() {
                if (!this.isChanges()) return;

                const data = {...this.form},
                    form = new FormData();
                for (let i in data) {
                    form.append(i, data[i])
                }
                form.append('_method', 'PUT');
                this.update({id: data.id, form});
            },
            flush(e) {
                e.target.closest('button').blur();
                this.confirm().then(() => {
                    this.remove(this.card.id).then(this.close)
                }).catch(() => {
                })
            },
            confirm() {
                return this.$q.dialog({
                    title: 'Confirm',
                    message: 'Are you sure?',
                    cancel: true,
                    color: 'secondary'
                });
            },
            collapse() {
                this.isSidebarVisible = !this.isSidebarVisible
            },
            fullScreen() {
                this.isFullScreen = !this.isFullScreen
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
            selected(item) {
                this.query = '';
                this.changeActiveCard(item.id)
            },
            changeContent(e) {
                this.form.description = e
            },
            isChanges() {
                let hasChanges = false;
                ['name', 'shorthand', 'description', 'collections'].forEach(col => {
                    if (this.form[col].length !== this.active[col].length) {
                        hasChanges = true;
                    }
                });
                return hasChanges
            }
        }
    }
</script>
<style lang="scss">

    .cards-editor {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .cards-editor-actions {
        position: absolute;
        left: 20px;
        top: 20px;
        z-index: 1000;
        &.in-sidebar {
            background: #f4f4f4;
            left: 0;
            top: 0;
            padding: 20px;
            width: 30%;
        }
        &:hover {
            .q-icon.material-icons {
                display: block;
            }
            .cards-editor-actions-close {
                background: #fe6058;
            }

            .cards-editor-actions-fullscreen {
                background: #29ca42;
            }
        }
        & > button {
            border: none;
            background: #ccc;
            border-radius: 8px;
            position: relative;
            cursor: pointer;
            margin-right: 10px;
            outline: none;
            padding: 0;
            height: 16px;
            text-align: center;
            width: 16px;
            .q-icon.material-icons {
                display: none;
                font-size: 12px;
                left: 2px;
                position: absolute;
                top: 2px;
            }
        }

    }

    .cards-editor-cards {
        background: #f4f4f4;
        color: #707070;
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            border-left: solid 5px #f4f4f4;
            cursor: pointer;
            padding: 20px 20px 20px 40px;
            &.active, &:hover {
                background: #e6f0ea;
                border-left-color: #2eab64;
                color: #1e201f;
                button {
                    display: block;
                }
            }
            button {
                float: right;
                display: none;
                margin-top: -3px;
            }
        }
    }

    .cards-editor-cards-actions {
        line-height: 1;
        float: right;
    }

    .cards-editor-sidebar {
        position: absolute;
        background: #f4f4f4;
        padding: 60px 0 80px;
        top: 0;
        left: 0;
        bottom: 0;
        width: 30%;
        overflow: scroll;
        &.collapsed {
            & + .cards-editor-main {
                width: 100%;
            }
        }
    }

    .cards-editor-sidebar-collapse {
        background: #f4f4f4;
        outline: none;
        border: none;
        cursor: pointer;
        padding: 0;
        position: absolute;
        left: 0;
        top: 50px;
        line-height: 1;
        width: 20px;
        z-index: 100;
        .q-icon {
            font-size: 20px;
        }
        i:first-child {
            border-style: solid;
            border-width: 20px 0 0 20px;
            border-color: transparent transparent transparent #f4f4f4;
            position: absolute;
            top: -20px;
            left: 0;
            width: 0;
            height: 0;

        }
        i:last-child {
            border-style: solid;
            border-width: 20px 20px 0 0;
            border-color: #f4f4f4 transparent transparent transparent;
            position: absolute;
            bottom: -20px;
            left: 0;
            width: 0;
            height: 0;
        }
    }

    .cards-editor-sidebar-actions {
        background: #f4f4f4;
        padding: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        max-width: 30%;
        z-index: 100;
    }

    .cards-editor-sidebar-actions-search {
        .q-search {
            background: #fff;
            padding: 5px;
            input {
                font-size: .9rem;
            }
        }
    }

    .cards-editor-sidebar-actions-create {

    }

    .cards-editor-main {
        color: #8b8b8b;
        padding: 0 20px 15px 60px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 70%;
        overflow: scroll;
        input.q-input-target {
            height: 25px;
        }
    }

    .cards-editor-status {
        font-size: .8rem;
        padding: 15px 0;
        text-align: right;
    }

    .cards-editor-shorthand {
        display: inline-block;
        font-size: .8rem;
        margin: 5px 10px 20px 0;
        .q-icon {
            font-size: 1rem;
            padding: 5px 0;
        }
    }

    .cards-editor-collections {
        display: inline-block;
        font-size: .8rem;
        margin: 5px 10px 20px 0;
        .q-icon {
            font-size: 15px;
        }
        .q-chips-input {
            & > .q-icon {
                padding: 5px 0;
            }
        }
    }

    .cards-editor-stamp {
        color: #a6a8aa;
        float: right;
        padding-top: 7px;
        font-size: .8rem;
        position: absolute;
        bottom: 0;
    }

    .cards-editor-title {
        color: #0c0c0c;
        font-size: 1.2rem;
        margin: 30px 0 10px;
    }

    @media (max-width: 1024px) {
        .cards-editor-modal {
            max-width: 100vw;
        }
    }
</style>