<template>
    <q-modal v-model="isOpen" @hide="close" class="app-modal" :content-classes="contentClasses" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <div class="cards-editor-actions" :class="{'in-sidebar': isSidebarVisible}">
            <button class="cards-editor-actions-close" @click="isOpen=false">
                <q-icon name="close"/>
            </button>
            <button class="cards-editor-actions-fullscreen" @click="isFullScreen=!isFullScreen">
                <q-icon name="fullscreen"/>
            </button>
        </div>
        <div class="cards-editor-sidebar-actions row" v-show="isSidebarVisible">
            <div class="cards-editor-sidebar-actions-search col-lg-6">
                <q-search hide-underline v-model="query" placeholder="Add card to list">
                    <q-autocomplete separator @search="search" @selected="selected" :min-characters="2"/>
                </q-search>
            </div>
            <div class="cards-editor-sidebar-actions-create col-lg-6">
                <q-btn no-caps flat label="Create new card" icon="add" @click="create" :disabled="isCreating"/>
            </div>
        </div>
        <app-modal-layout>
            <div class="cards-editor">
                <div class="cards-editor-sidebar" :class="{collapsed: !isSidebarVisible}" v-show="isSidebarVisible">
                    <ul class="cards-editor-cards">
                        <li v-for="card in cards" :key="card.id" @click="open(card.id)" :class="{active: card.id === active.id}">
                            {{card.name}}
                            <q-btn flat dense icon="close" @click.prevent.stop="hide(card.id)"/>
                        </li>
                    </ul>
                </div>
                <div class="cards-editor-main">
                    <button class="cards-editor-sidebar-collapse" @click="isSidebarVisible=!isSidebarVisible">
                        <i></i>
                        <q-icon :name="collapseIconName"/>
                        <i></i>
                    </button>
                    <div class="cards-editor-top">
                        <div class="cards-editor-status">
                            <span>{{processStatus}}</span>
                        </div>
                        <div class="cards-editor-tools" v-if="active">
                            <q-btn icon="bookmark" flat dense @click="toggleFavorite(active.id)" v-show="isSaved(active.id)"/>
                            <q-btn icon="bookmark_border" flat dense @click="toggleFavorite(active.id)" v-show="!isSaved(active.id)"/>
                            <q-btn icon="help" flat dense @click="openAskHelp"/>
                            <q-btn icon="delete" flat dense @click.prevent.stop="flush($event)" v-show="active.canRemove"/>
                        </div>
                        <div>
                            <div class="cards-editor-name"></div>
                        </div>
                        <div style="clear:both"></div>
                        <div class="cards-editor-shorthand" v-if="active">
                            <q-field icon="style">
                                <q-input
                                        dense
                                        hide-underline
                                        v-model="active.shorthand"
                                        placeholder="Shorthand"
                                        @blur="save"/>
                            </q-field>
                        </div>
                        <div class="cards-editor-collections" v-if="active">
                            <q-chips-input
                                    hide-underline
                                    v-model="active.collections"
                                    placeholder="Collections"
                                    :before="[{icon: 'folder_open', handler () {}}]"
                                    @input="filterCollectionName"
                                    @blur="save">
                                <q-autocomplete :static-data="suggests"/>
                            </q-chips-input>
                        </div>
                    </div>
                    <content-editor v-if="active"></content-editor>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../context/modal/AppModalLayout'
    import ContentEditor from '../editor/ContentEditor.vue'
    import DateFormatter from '../../mixins/DateFormatter'
    import {mapGetters, mapActions} from 'vuex'
    import MediumEditor from 'medium-editor'
    import {strip_tags} from '../../helpers'

    export default {
        data: () => {
            return {
                query: '',
                name: null,
                isOpen: true,
                isFullScreen: false,
                isNameChanged: false,
                isSidebarVisible: true,
                suggests: {field: 'label', list: []}
            }
        },
        mixins: [DateFormatter],
        components: {AppModalLayout, ContentEditor},
        computed: {
            ...mapGetters({
                team: 'teams/current',
                isSaved: 'users/isFavorite',
                isCreating: 'cards/isCreating',
                isUpdating: 'cards/isUpdating',
                active: 'editor/getActiveCard',
                cards: 'editor/getEditorCards',
                collections: 'collections/all',
            }),
            processStatus() {
                if (this.isUpdating) {
                    return 'Saving...'
                }
                if (this.lastChange) {
                    const name = this.lastChange.user.fullName,
                        date = this.toLocaleString(this.lastChange.createdAt);
                    return `Last saved by ${name} at ${date}`
                }
                return 'Saved'
            },
            lastChange() {
                if (!this.active) {
                    return null
                }
                return this.active.lastChange
            },
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
            },
            title() {
                const parts = [];
                if (this.active) {
                    parts.push(this.active.name)
                }
                if (this.team) {
                    parts.push(this.team.name)
                }
                parts.push('Wonderus');
                return parts.join(' - ')
            }
        },
        watch: {
            active: function (val) {
                if (val === null) return;

                document.title = this.title;
                this.name.setContent(`<p>${val.name}</p>`, 0)
            }
        },
        created() {
            this.isSidebarVisible = !this.$q.platform.is.mobile;
            this.suggests.list = this.collections.map(item => {
                return {label: item.name}
            })
        },
        mounted() {
            const options = {
                    toolbar: false,
                    placeholder: false,
                    disableReturn: false,
                    disableDoubleReturn: false,
                    disableExtraSpaces: false
                },
                field = document.querySelector('.cards-editor-name');

            this.name = new MediumEditor(field, options);
            if (this.active !== undefined) {
                this.name.setContent(`<p>${this.active.name}</p>`, 0)
            }
            this.name.subscribe('editableInput', (e, el) => {
                this.active.name = strip_tags(el.innerText.trim())
            });
            this.name.subscribe('focus', this.selectDefaultText);
            this.name.subscribe('blur', this.save)
        },
        methods: {
            ...mapActions({
                hide: 'editor/hide',
                save: 'editor/save',
                open: 'editor/open',
                create: 'editor/create',
                remove: 'cards/remove',
                hints: 'search/cardsHints',
                toggleFavorite: 'users/favorite',
                close: 'modals/closeCardsEditor',
                openAskHelp: 'modals/openAskHelp',
            }),
            flush(e) {
                e.target.closest('button').blur();
                this.confirm().then(() => {
                    this.remove(this.active.id).then(() => this.hide(this.active.id))
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
                this.open(item.id)
            },
            selectDefaultText() {
                if (this.active.name !== 'Untitled card') return;

                const el = this.name.getFocusedElement();
                if (el.childNodes.length > 0) {
                    this.name.selectElement(el.firstChild)
                }
            },
            filterCollectionName() {
                if (this.active === undefined) return;

                let result = [];
                if (this.active.collections.length === 0) return;
                this.active.collections.forEach(item => {
                    result.push(item.replace(/\s+/g, ''));
                });
                this.active.collections = result
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
            position: relative;
            padding: 20px 30px 20px 20px;
            &.active, &:hover {
                background: #e6f0ea;
                border-left-color: #2eab64;
                color: #1e201f;
                button {
                    display: block;
                }
            }
            button {
                display: none;
                position: absolute;
                margin-top: -14px;
                right: 10px;
                top: 50%;
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
        input.q-input-target {
            height: auto;
        }
    }

    .cards-editor-top-container {
        background: #fff;
    }

    .cards-editor-status {
        font-size: .8rem;
        padding: 15px 0;
        text-align: right;
    }

    .cards-editor-tools {
        float: right;
    }

    .cards-editor-name {
        color: #424242;
        font-size: 2rem;
        outline: none;
    }

    .cards-editor-shorthand {
        display: inline-block;
        font-size: .8rem;
        margin: 5px 10px 20px 0;
        .q-field-icon {
            font-size: 1rem;
            margin: -1px 0 0;
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

    @media (max-width: 768px) {
        .cards-editor-tools {
            float: none;
            text-align: right;
        }
        .cards-editor-name {
            font-size: 1.3rem;
        }
    }

</style>