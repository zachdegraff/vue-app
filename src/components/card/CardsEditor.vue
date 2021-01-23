<template>
    <q-modal v-model="isOpen" @hide="close" class="app-modal" :content-classes="contentClasses"
             :content-css="{minWidth: '80vw', minHeight: '88vh'}">
        <div class="cards-editor-actions" :class="{'in-sidebar': isSidebarVisible}">
            <button class="cards-editor-actions-close" @click="isOpen=false">
                <q-icon name="close"/>
            </button>
            <button class="cards-editor-actions-fullscreen" @click="isFullScreen=!isFullScreen">
                <q-icon name="fullscreen"/>
            </button>
        </div>
        <button class="cards-editor-sidebar-collapse" :class="{collapsed:!isSidebarVisible}"
                @click="isSidebarVisible=!isSidebarVisible">
            <i></i>
            <q-icon :name="collapseIconName"/>
            <i></i>
        </button>
        <div class="cards-editor-sidebar-actions row" v-show="isSidebarVisible">
            <div class="cards-editor-sidebar-actions-search col-lg-12 ">
                <q-search hide-underline v-model="query" placeholder="Add card to list">
                    <q-autocomplete separator @search="search" @selected="selected" :min-characters="1"/>
                </q-search>
            </div>
            <div class="create-new-card col-lg-12" v-if="isManager">
                <q-btn no-caps flat label="Create new card" icon="add" @click="create" :disabled="isCreateBtnDisabled"/>
            </div>
        </div>
        <app-modal-layout>
            <div class="cards-editor">
                <div class="cards-editor-sidebar" :class="{collapsed: !isSidebarVisible}" v-show="isSidebarVisible">
                    <ul class="cards-editor-cards">
                        <li v-for="card in cards" :key="card.id" @click="open(card.id)"
                            :class="{active: card.id === active.id}">
                            {{card.name}}
                            <q-btn flat dense icon="close" @click.prevent.stop="hide({id: card.id})"/>
                        </li>
                    </ul>
                </div>
                <div class="cards-editor-main">
                    <div class="cards-editor-top">
                        <div class="cards-editor-status">
                            <span>{{processStatus}}</span>
                        </div>
                        <div class="cards-editor-tools" v-if="active">
                            <q-btn icon="local_offer" flat dense :disabled="!isValidSubscription" v-if="isManager">
                                <q-popover anchor="bottom right" self="top right">
                                    <q-field>
                                        <q-search hide-underline v-model="tagQuery" placeholder="Tag name"
                                                  @keyup="addTag" class="q-my-md q-mx-md"/>
                                    </q-field>
                                    <q-list link separator v-show="suggests.length">
                                        <q-item v-for="(tag, idx) in suggests" :key="idx"
                                                @click.native="selectTag(tag)">
                                            <q-item-main>
                                                <q-item-tile>{{tag}}</q-item-tile>
                                            </q-item-main>
                                            <q-item-side right>
                                                <q-btn flat dense color="positive" icon="add"/>
                                            </q-item-side>
                                        </q-item>
                                    </q-list>
                                    <q-list separator v-show="active.tags.length">
                                        <q-item v-for="(tag, idx) in active.tags" :key="idx">
                                            <q-item-main>
                                                <q-item-tile>{{tag}}</q-item-tile>
                                            </q-item-main>
                                            <q-item-side right>
                                                <q-btn flat dense color="negative" icon="close" @click="removeTag(idx)"/>
                                            </q-item-side>
                                        </q-item>
                                    </q-list>
                                </q-popover>
                                <span class="q-ml-xs" v-show="tagsCount > 0">{{tagsCount}}</span>
                            </q-btn>
                            <q-btn icon="star" flat dense @click="toggleFavorite(active.id)"
                                   v-show="isSaved(active.id)" :disabled="!isValidSubscription"/>
                            <q-btn icon="star_border" flat dense @click="toggleFavorite(active.id)"
                                   v-show="!isSaved(active.id)" :disabled="!isValidSubscription"/>
                            <q-btn icon="delete" flat dense @click.prevent.stop="flush($event)"
                                   v-show="active.canRemove" :disabled="!isValidSubscription"/>
                        </div>
                        <div>
                            <div class="cards-editor-name" ref="editor" data-disable-return="true"></div>
                        </div>
                        <div style="clear:both"></div>
                        <div class="cards-editor-shorthand" v-if="active">
                            <q-field icon="style">
                                <q-input
                                        dense
                                        hide-underline
                                        v-model="active.shorthand"
                                        placeholder="Acronyms/shorthand..."
                                        @keydown.enter="insertComma"
                                        @blur="save"
                                        :readonly="!isValidSubscription || !isManager"/>
                            </q-field>
                        </div>
                    </div>
                    <content-editor v-if="active"/>
                </div>
                <div class="cards-editor-questions" :style="{left: questionsLeftOffset}">
                    <div class="cards-editor-questions-label">
                        <div class="float-left q-mt-xs" v-if="this.questions.length > 0"
                             @click="isQuestionsVisible=!isQuestionsVisible">
                            {{questionsLabel}}
                            <q-icon :name="questionIconName"/>
                        </div>
                        <!--<div class="float-left q-mt-xs empty-questions-text" v-else >Have a question for the team?</div>-->
                        <q-btn icon="help" label="Request information" dense @click="openAskHelp" class="float-right" :disabled="!isValidSubscription"/>
                        <div style="clear:both"></div>
                    </div>
                    <div class="q-mt-md" v-show="isQuestionsVisible">
                        <questions-list :items="questions" :hide-submitted-card="true"/>
                    </div>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../context/modal/AppModalLayout'
    import QuestionsList from '../question/QuestionsList.vue'
    import ContentEditor from '../editor/ContentEditor.vue'
    import DateFormatter from '../../mixins/DateFormatter'
    import {mapGetters, mapActions} from 'vuex'
    import MediumEditor from 'medium-editor'
    import {strip_tags} from '../../helpers'

    export default {
        data: () => {
            return {
                query: '',
                tagQuery: '',
                name: null,
                cardName: null,
                isOpen: true,
                isFullScreen: false,
                isNameChanged: false,
                isSidebarVisible: true,
                isQuestionsVisible: false,
                suggests: []
            }
        },
        mixins: [DateFormatter],
        components: {QuestionsList, AppModalLayout, ContentEditor},
        computed: {
            ...mapGetters({
                team: 'teams/current',
                tags: 'tags/allNonEmpty',
                isSaved: 'users/isFavorite',
				isManager: 'teams/isManager',
                isCreating: 'cards/isCreating',
                isUpdating: 'cards/isUpdating',
                active: 'editor/getActiveCard',
                cards: 'editor/getEditorCards',
                questions: 'questions/getCardQuestions',
                isValidSubscription: 'subscription/isValid'
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
            questionsLabel() {
                if (this.questions.length > 0) {
                    return `Requests (${this.questions.length})`;
                }
                return 'Requests'
            },
            questionIconName() {
                if (this.isQuestionsVisible) {
                    return 'expand_less'
                }
                return 'expand_more'
            },
            questionsLeftOffset() {
                if (this.isSidebarVisible) {
                    return '30%';
                }
                return '0'
            },
            tagsCount() {
                if (!this.active) {
                    return 0;
                }
                return this.active.tags.length
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
            },
            isCreateBtnDisabled() {
                return this.isCreating || !this.isValidSubscription
            }
        },
        watch: {
            active: function (val) {
                if (val === null) return;

                document.title = this.title;
                const name = val.name === 'Untitled card' ? '' : `<p>${val.name}</p>`;
                this.name.setContent(name, 0);
                this.loadQuestions(val)
            },
            tagQuery: function (val) {
                this.suggests = [];
                if (val.length < 2) return;

                this.tags.forEach(tag => {
                    const idx = this.active.tags.findIndex(item => item === tag.name);
                    if (idx !== -1) return;

                    if (tag.name.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
                        this.suggests.push(tag.name)
                    }
                })
            },
            'active.name': function () {
                document.title = this.title
            }
        },
        created() {
            this.isSidebarVisible = !this.$q.platform.is.mobile
        },
        mounted() {
            const options = {
                    toolbar: false,
                    placeholder: {
                        text: 'Card name...',
                        hideOnClick: false
                    },
                    disableReturn: false,
                    disableDoubleReturn: false,
                    disableExtraSpaces: false,
                    disableEditing: !this.isValidSubscription || !this.isManager
                },
                field = document.querySelector('.cards-editor-name');

            this.name = new MediumEditor(field, options);
            this.$nextTick(() => {
                this.name.selectElement(field);
            });
            if (this.active !== undefined) {
                const name = this.active.name === 'Untitled card' ? '' : `<p>${this.active.name}</p>`;
                this.name.setContent(name, 0);
            }
            this.name.subscribe('editableInput', (e, el) => {
                const name = strip_tags(el.innerText.trim());
                this.active.name = name === '' ? 'Untitled card' : name;
                this.cardName = this.active.name
            });
            this.name.subscribe('focus', this.selectDefaultText);
            this.name.subscribe('blur', this.save)
        },
        methods: {
            ...mapActions({
                hide: 'editor/hide',
                save: 'editor/save',
                open: 'editor/open',
                filter: 'cards/all',
                hints: 'search/hints',
                batch: 'editor/batch',
                remove: 'cards/remove',
                create: 'editor/create',
                toggleFavorite: 'users/favorite',
                close: 'modals/closeCardsEditor',
                loadQuestions: 'questions/loadCardQuestions',
                openAskHelp: 'modals/openAskHelp',
            }),
            flush(e) {
                e.target.closest('button').blur();
                this.confirm().then(() => {
                    this.remove(this.active.id).then(() => {
                        this.hide({id: this.active.id, removed: true});
                    })
                }).catch(() => {
                })
            },
            confirm() {
                return this.$q.dialog({
                    title: 'Are you sure you want to delete?',
                    message: 'Deletion cannot be undone.',
                    cancel: true,
                    ok: 'delete',
                    color: 'secondary'
                });
            },
            insertComma(e) {
                e.target.value = e.target.value + ','
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
                if (item.type === 'card') {
                    return this.open(item.id)
                }
                this.filter({tag: item.name}).then(cards => this.batch(cards))
            },
            selectDefaultText() {

                // if (this.active.name !== 'Untitled card') return;

                const el = this.name.getFocusedElement();
                if (el.childNodes.length > 0) {
                    this.name.selectElement(el.firstChild)
                }
            },
            addTag(e) {
                if (e.keyCode !== 13) return;

                const val = this.tagQuery;
                if (val === '') return;
                if (this.active.tags.indexOf(val) === -1) {
                    this.active.tags.push(val)
                }
                this.tagQuery = '';
                this.save()
            },
            selectTag(tag) {
                if (this.active.tags.indexOf(tag) === -1) {
                    this.active.tags.push(tag);
                    this.tagQuery = '';
                    this.save()
                }
            },
            removeTag(idx) {
                this.active.tags.splice(idx, 1);
                this.save()
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

    .cards-editor-main {
        overflow-x: hidden !important;
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
        left: 30%;
        top: 50px;
        line-height: 1;
        width: 20px;
        z-index: 100;

        .q-icon {
            font-size: 20px;
        }

        &.collapsed {
            left: 0;
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

    .cards-editor-main {
        color: #8b8b8b;
        padding: 0 20px 15px 75px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 40px;
        width: 70%;
        display: flex;
        overflow: scroll;
        flex-direction: column;

        input.q-input-target {
            height: auto;
        }
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
        font-size: 16px;
        margin: 5px 10px 20px 0;

        .q-field-icon {
            font-size: 1rem;
            margin: -1px 0 0;
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

    .cards-editor-questions {
        background: #f9f9f9;
        position: absolute;
        bottom: 0;
        padding: 10px 20px 10px 60px;
        left: 30%;
        max-height: 100%;
        overflow: scroll;
        right: 0;
    }

    .cards-editor-questions-label {
        color: #424242;

        > div:first-child {
            cursor: pointer;
        }
    }

    .cards-editor-sidebar-actions {
        border-top: 1px solid #ccc;
    }

    .create-new-card {
        border: 1px solid #e0e0e0;
        margin-top: 6px;
    }

    .create-new-card button {
        padding-left: 0px;
        width: 100%;
    }

    .cards-editor-sidebar {
        padding: 60px 0 117px;
    }

    .empty-questions-text {
        margin-left: 14px;
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
            width: 73%;
        }
        .cards-editor-name {
            font-size: 1.3rem;
        }
    }

    .cards-editor-name {
        width: 90%;
    }
</style>
