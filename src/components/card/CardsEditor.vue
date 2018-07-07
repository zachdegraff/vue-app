<template>
    <q-modal v-model="isOpen" class="app-modal" no-esc-dismiss no-backdrop-dismiss :content-classes="['app-modal-content']" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @click.native="close">
        <app-modal-layout>
            <div class="cards-editor">
                <div class="cards-editor-sidebar">
                    <div class="cards-editor-team">
                        <img src="http://wonderus/storage/44/conversions/33303252_1869432083354331_3231613228362498048_o-thumb.jpg" class="round-borders">
                        <span>Barahta</span>
                        <q-icon name="chevron_left" size="30px"/>
                    </div>
                    <ul class="cards-editor-cards">
                        <li class="active">
                            Activity-Based Costing
                            <div class="cards-editor-cards-actions">
                                <q-icon name="more_vert"/>
                                <q-popover>
                                    <q-list>
                                        <q-item v-close-overlay>
                                            <q-item-main>
                                                <q-item-tile class="uppercase">close</q-item-tile>
                                            </q-item-main>
                                        </q-item>
                                    </q-list>
                                </q-popover>
                            </div>
                        </li>
                        <li>
                            Untitled Card
                            <div class="cards-editor-cards-actions">
                                <q-icon name="more_vert"/>
                                <q-popover>
                                    <q-list>
                                        <q-item v-close-overlay>
                                            <q-item-main>
                                                <q-item-tile class="uppercase">close</q-item-tile>
                                            </q-item-main>
                                        </q-item>
                                    </q-list>
                                </q-popover>
                            </div>
                        </li>
                    </ul>
                    <div class="cards-editor-sidebar-actions">
                        <q-btn flat dense icon="chevron_left" class="float-right"/>
                        <q-btn flat dense icon="open_with" class="float-left"/>
                    </div>
                </div>
                <div class="cards-editor-main">
                    <q-btn outline dense size="xl" icon="add" color="primary" class="cards-editor-btn-create"/>
                    <div class="cards-editor-stamp">
                        Created by Jeff Stern on 3:25pm, June 6 2018
                    </div>
                    <div class="cards-editor-shorthand">
                        <q-input
                                dense
                                hide-underline
                                value="ASC, ASC"
                                :before="[{icon: 'style', handler () {}}]"
                        />
                    </div>
                    <div class="cards-editor-collections">
                        <q-chips-input
                                hide-underline
                                :value="[]"
                                :before="[{icon: 'folder_open', handler () {}}]">
                        </q-chips-input>
                    </div>
                    <div class="cards-editor-title">Activity-Based Costing</div>
                    <content-editor></content-editor>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../context/modal/AppModalLayout'
    import ContentEditor from "../editor/ContentEditor.vue";

    export default {
        data: () => {
            return {
                card: {
                    description: ''
                },
                isOpen: true
            }
        },
        components: {AppModalLayout, ContentEditor},
        methods: {
            close() {

            },
        }
    }
</script>
<style lang="scss">
    .cards-editor {
    }

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
    }

    .cards-editor-title {
        color: #0c0c0c;
        font-size: 1.2rem;
        margin: 30px 0 10px;
    }
</style>