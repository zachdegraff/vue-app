<template>
    <q-modal v-model="isOpen" class="app-modal" no-esc-dismiss no-backdrop-dismiss :content-classes="['app-modal-content']" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @click.native="close">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Adding a new card</q-toolbar-title>
                <q-btn flat icon="close" @click="close" class="float-right"/>
            </q-toolbar>
            <div class="row q-py-xl gutter-md flex-center">
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.form.teamId.$error" :error-label="firstErrorFor($v.form.teamId)">
                    <q-select v-model="form.teamId" float-label="Team" :options="options"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.form.name.$error" :error-label="firstErrorFor($v.form.name)">
                    <q-input v-model="form.name" float-label="Name" @blur="$v.form.name.$touch"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10 relative-position">
                    <q-input
                            type="textarea" float-label="Short Description"
                            v-model="form.description"
                            @blur="flushEvents"
                            @keydown.native="toggleEvent('keyEvent', $event)"
                            @mouseup.native="toggleEvent('mouseEvent', $event)"/>

                    <editor-tools :target="mouseEvent" @format="changeFormatting"/>
                    <reference-tools :keyEvent="keyEvent" :mouseEvent="mouseEvent" @format="changeFormatting" @toggle="toggleReferenceToolsState"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-chips-input v-model="form.shorthand" float-label="Shorthand"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <strong>Links</strong><br/>
                    <div class="row gutter-sm" v-for="(link, idx) in links" :key="idx">
                        <q-field class="col-xs-6">
                            <q-input v-model="link.url" float-label="Type link url"/>
                        </q-field>
                        <q-field class="col-xs-6">
                            <q-input v-model="link.name" float-label="Type link name"/>
                        </q-field>
                    </div>
                    <q-btn @click="addLink" class="q-mt-sm">Add a new field</q-btn>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-chips-input v-model="form.collections" float-label="Collections" placeholder="Type collection name" @input="filterCollectionName">
                        <q-autocomplete :static-data="suggests"/>
                    </q-chips-input>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10 text-left" label="Image" label-width="12">
                    <image-chooser @change="changeFile"></image-chooser>
                </q-field>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-btn @click="save" color="primary" class="q-mt-lg" :disable="isProcessing">create</q-btn>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import HasCardChanges from '../../mixins/HasCardChanges'
    import EditorTools from '../../components/EditorTools'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'
    import {filter} from 'quasar'
    import ImageChooser from "../ImageChooser";
    import ReferenceTools from "../ReferenceTools";


    export default {
        data: () => {
            return {
                form: {
                    teamId: '',
                    name: '',
                    shorthand: [],
                    description: '',
                    collections: [],
                },
                file: null,
                links: [],
                options: [],
                flushImage: false,
                keyEvent: null,
                mouseEvent: null,
                suggests: {field: 'label', list: []},
                isOpen: true,
                referenceToolsState: false
            }
        },
        mixins: [ValidatorMessages, HasCardChanges],
        computed: {
            ...mapGetters({
                teams: 'teams/all',
                team: 'teams/current',
                query: 'search/getQuery',
                collections: 'collections/all',
                isProcessing: 'cards/isCreating',
                params: 'modals/getCreateCardParams'
            })
        },
        components: {
            ReferenceTools,
            ImageChooser,
            AppModalLayout, EditorTools
        },
        validations: {
            form: {
                teamId: {
                    required
                },
                name: {
                    required
                }
            }
        },
        watch: {
            'form.teamId': function (val) {
                this.changeTeam(val)
            },
            team: function (val) {
                this.form.teamId = val.id
            },
            teams: function (val) {
                this.options = val.map(team => {
                    return {value: team.id, label: team.name}
                });
            },
            collections: function (val) {
                this.suggests.list = val.map(item => {
                    return {label: item.name}
                })
            }
        },
        created() {
            delete window.cardState;
            if (this.team !== null) {
                this.form.teamId = this.team.id
            }
            this.options = this.teams.map(team => {
                return {value: team.id, label: team.name}
            });
            this.suggests.list = this.collections.map(item => {
                return {label: item.name}
            });
            this.parseQuery();
            this.form.name = this.params.cardName || '';
            document.title = 'Creating a new card - Wonderus';
            window.cardState = JSON.parse(JSON.stringify(this.$data))
        },
        methods: {
            ...mapActions({
                create: 'cards/create',
                search: 'search/search',
                closeAdding: 'modals/closeCreateCard',
                changeTeam: 'teams/changeCurrentTeam'
            }),
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.create(this.prepare()).then(() => {
                    if (this.query !== '') {
                        this.search()
                    }
                    this.closeAdding()
                })
            },
            close() {
                if (window.cardState === undefined || !this.hasAnyChanges(window.cardState)) {
                    return this.closeAdding()
                }

                this.confirm().then(this.closeAdding).catch(() => {
                })
            },
            prepare() {
                const data = new FormData();
                for (let i in this.form) {
                    data.append(i, this.form[i])
                }
                data.append('links', JSON.stringify(this.links));
                if (this.file !== null) {
                    data.append('file', this.file);
                }
                return data
            },
            addLink() {
                this.links.push({name: '', url: ''})
            },
            changeFile(file) {
                this.file = file
            },
            isNavChars(e) {
                if (!(e instanceof KeyboardEvent)) {
                    return false;
                }
                const chars = [13, 38, 40];
                for (let i in chars) {
                    if (e.keyCode === chars[i]) {
                        return true;
                    }
                }
                return false;
            },
            parseQuery() {
                if (this.query === '') return;

                if (this.query.indexOf('#') !== -1) {
                    const matches = this.query.match(/#(.*?)($|\s+)/g);
                    if (matches !== null) {
                        matches.forEach(item => {
                            this.form.collections.push(item);
                        })
                    }
                }
            },
            flushEvents() {
                this.keyEvent = null;
                //this.mouseEvent = null;
            },
            toggleEvent(name, e) {
                if (e !== null && this.referenceToolsState && this.isNavChars(e)) {
                    e.preventDefault();
                }
                this[name] = e
            },
            changeFormatting(e) {
                this.form.description = e.content
            },
            filterCollectionName(e) {
                let result = [];
                if (this.form.collections.length === 0) return;

                this.form.collections.forEach(item => {
                    result.push(item.replace(/\s+/g, ''));
                });

                this.form.collections = result
            },
            toggleReferenceToolsState(e) {
                this.referenceToolsState = e.state
            }
        }
    }
</script>