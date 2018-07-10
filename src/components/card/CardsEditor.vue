<template>
    <q-modal v-model="isOpen" @hide="close" no-route-dismiss class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '50vw', minHeight: '80vh'}">
        <app-modal-layout>
            <div class="cards-editor">
                <div class="cards-editor-sidebar">
                    <div class="cards-editor-team" v-if="team">
                        <img :src="photo(team.photo)" class="round-borders">
                        <span>{{team.name}}</span>
                        <q-icon name="chevron_left" size="30px"/>
                    </div>
                    <ul class="cards-editor-cards">
                        <li v-for="card in cards" :key="card.id" @click="changeActiveCard(card.id)" :class="{active: card.id === active.id}">
                            {{card.name}}
                        </li>
                    </ul>
                    <div class="cards-editor-sidebar-actions">
                        <q-btn flat dense icon="chevron_left" class="float-right"/>
                        <q-btn flat dense icon="open_with" class="float-left"/>
                    </div>
                </div>
                <div class="cards-editor-main">
                    <q-btn outline dense size="xl" icon="add" color="primary" class="cards-editor-btn-create" @click="add"/>
                    <q-btn flat icon="close" @click="isOpen=false" class="cards-editor-close"/>
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
                    <div class="q-mt-lg q-mb-md">
                        <q-input
                                dense
                                hide-underline
                                class="q-title"
                                v-model="form.name"
                                @blur="save"/>
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
                suggests: {field: 'label', list: []},
                isOpen: true
            }
        },
        components: {AppModalLayout, ContentEditor},
        computed: {
            ...mapGetters({
                team: 'teams/current',
                active: 'editor/getActiveCard',
                cards: 'editor/getEditorCards',
                collections: 'collections/all',
            })
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
            },
            'form.description': function (val) {
                this.retrieveCards(val)
            }
        },
        created() {
            this.suggests.list = this.collections.map(item => {
                return {label: item.name}
            })
        },
        methods: {
            ...mapActions({
                create: 'cards/create',
                update: 'cards/update',
                close: 'modals/closeCardsEditor',
                changeActiveCard: 'editor/changeActiveCard',
                retrieveCards: 'editor/retrieveCardsFromContent'
            }),
            add() {
                const params = {
                    name: 'Untitled card',
                    teamId: this.team.id
                };

                this.create(params).then(card => this.changeActiveCard(card.card.id))
            },
            save() {
                const data = {...this.form},
                    form = new FormData();
                for (let i in data) {
                    form.append(i, data[i])
                }
                form.append('_method', 'PUT');
                this.update({id: data.id, form});
            },
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return path
            },
            changeContent(e) {
                this.form.description = e
            }
        }
    }
</script>
<style lang="scss">
    .cards-editor-sidebar {
        background: #fafafa;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 400px;
    }

    .cards-editor-team {
        color: #8b8b8b;
        padding: 15px 20px;
        position: relative;
        img {
            margin-right: 15px;
            vertical-align: top;
            width: 40px;
        }
        span {
            max-width: 220px;
            overflow: hidden;
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: 10px;
        }
        .q-icon {
            position: absolute;
            top: 20px;
            right: 15px;
        }
    }

    .cards-editor-cards {
        color: #a6a8aa;
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            border-left: solid 5px #fafafa;
            cursor: pointer;
            padding: 20px 20px 20px 40px;
            &.active, &:hover {
                border-left-color: #2eab64;
                background: #f5f5f5
            }
        }
    }

    .cards-editor-cards-actions {
        line-height: 1;
        float: right;
    }

    .cards-editor-sidebar-actions {
        overflow: hidden;
        padding: 5px;
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .cards-editor-btn-create {
        position: absolute;
        left: 0;
        top: 0;
    }

    .cards-editor-close {
        position: absolute;
        right: 0;
        top: 0;
    }

    .cards-editor-main {
        color: #8b8b8b;
        padding: 20px 35px 15px 70px;
        position: relative;
        margin-left: 400px;
    }

    .cards-editor-shorthand {
        display: inline-block;
        font-size: .8rem;
        margin-right: 10px;
        .q-icon {
            font-size: 1rem;
            padding: 5px 0;
        }
    }

    .cards-editor-collections {
        display: inline-block;
        font-size: .8rem;
        margin-right: 10px;
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
</style>