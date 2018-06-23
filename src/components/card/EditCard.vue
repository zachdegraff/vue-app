<template>
    <q-modal v-model="isOpen" class="app-modal" no-esc-dismiss no-backdrop-dismiss :content-classes="['app-modal-content']" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @click.native="close">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title v-if="card">Editing {{card.name}}</q-toolbar-title>
                <q-btn flat icon="close" @click="close" class="float-right"/>
            </q-toolbar>

            <div class="row text-center card-item" v-if="!card">
                <div class="col">
                    <q-spinner :size="50" color="red"></q-spinner>
                </div>
            </div>

            <div class="row q-py-xl gutter-md flex-center" v-if="card">
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.form.teamId.$error" :error-label="firstErrorFor($v.form.teamId)">
                    <q-select v-model="form.teamId" float-label="Team" :options="options" @change="$v.form.teamId.$touch"/>
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
                    <q-chips-input v-model="form.collections" float-label="Collections" placeholder="Type collection name">
                        <q-autocomplete :static-data="suggests"/>
                    </q-chips-input>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" label="Image" label-width="12">
                    <image-chooser :path="card.thumb" @change="changeFile"></image-chooser>
                </q-field>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-btn @click="save" color="primary" label="save" class="q-mt-lg" :disable="isProcessing"/>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import HasCardChanges from '../../mixins/HasCardChanges'
    import ToolsMethods from '../../mixins/ToolsMethods'
    import EditorTools from '../../components/EditorTools'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'
    import ImageChooser from '../ImageChooser';
    import ReferenceTools from '../ReferenceTools';

    export default {
        data: () => {
            return {
                form: {
                    teamId: '',
                    name: '',
                    description: '',
                    shorthand: [],
                    collections: []
                },
                file: null,
                links: [],
                options: [],
                flushImage: false,
                suggests: {field: 'label', list: []},
                isOpen: true
            }
        },
        mixins: [ValidatorMessages, HasCardChanges, ToolsMethods],
        computed: {
            ...mapGetters({
                teams: 'teams/all',
                card: 'cards/getEditingCard',
                collections: 'collections/all',
                isProcessing: 'cards/isUpdating'
            })
        },
        components: {
            ReferenceTools,
            ImageChooser,
            AppModalLayout,
            EditorTools
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
            card: function (val) {
                if (val === null) return;
                delete window.cardState;

                Object.keys(this.form).forEach(key => this.form[key] = val[key]);

                this.links = val.links;
                this.form.collections = val.collections.map(item => item.name);

                this.options = this.teams.map(team => {
                    return {value: team.id, label: team.name}
                });
                this.suggests.list = this.collections.map(item => {
                    return {label: item.name}
                });

                document.title = `Editing ${val.name} - Wonderus`;
                window.cardState = JSON.parse(JSON.stringify({...this.$data}));
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
            },
            'form.teamId': function (val) {
                this.changeTeam(val)
            },
        },
        methods: {
            ...mapActions({
                update: 'cards/update',
                closeEditing: 'modals/closeEditCard',
                changeTeam: 'teams/changeCurrentTeam'
            }),
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.update({id: this.card.id, form: this.prepare()}).then(this.closeEditing);
            },
            close() {
                if (window.cardState === undefined || !this.hasAnyChanges(window.cardState)) {
                    return this.closeEditing()
                }
                this.confirm().then(this.closeEditing).catch(() => {
                })
            },
            prepare() {
                const data = new FormData();
                for (let i in this.form) {
                    data.append(i, this.form[i])
                }
                data.append('_method', 'PUT');
                data.append('flushImage', JSON.stringify(this.flushImage));
                data.append('links', JSON.stringify(this.links));
                if (this.file !== null) {
                    data.append('file', this.file);
                }
                return data
            },
            changeFile(file) {
                this.file = file;
                this.flushImage = file === null;
            },
            addLink() {
                this.links.push({name: '', url: ''})
            }
        }
    }
</script>