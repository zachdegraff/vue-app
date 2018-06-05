<template>
    <q-modal v-model="isOpen" class="app-modal" no-esc-dismiss no-backdrop-dismiss :content-classes="['app-modal-content']" :content-css="{minWidth: '50vw', minHeight: '80vh'}" @click.native="close">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Adding a new card</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <div class="row q-py-xl gutter-md flex-center">
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.form.teamId.$error" :error-label="firstErrorFor($v.form.teamId)">
                    <q-select v-model="form.teamId" float-label="Team" :options="options" @change="$v.form.teamId.$touch"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.form.name.$error" :error-label="firstErrorFor($v.form.name)">
                    <q-input v-model="form.name" float-label="Name" @blur="$v.form.name.$touch"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10 relative-position">
                    <q-input v-model="form.description" type="textarea" float-label="Short Description" @mouseup.native="toggleEditorTools"/>
                    <editor-tools :target="selection" @format="changeFormatting"/>
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
                        <q-autocomplete :static-data="collections"/>
                    </q-chips-input>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-uploader url="" float-label="Image" hide-upload-button @add="chooseFile" @remove:cancel="cancelFile" :disable="isProcessing" extensions=".jpg,.jpeg,.png"/>
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
    import CardResource from '../../resources/card/CardResource'
    import EditorTools from '../../components/EditorTools'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'
    import {filter} from 'quasar'


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
                selection: null,
                collections: {field: 'label', list: []},
                isOpen: true
            }
        },
        mixins: [ValidatorMessages, HasCardChanges],
        computed: {
            ...mapGetters({
                team: 'teams/current',
                isProcessing: 'cards/isCreating'
            })
        },
        components: {
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
                this.loadTeamCollections(val).then(items => {
                    this.collections.list = items.map(item => {
                        return {label: item.name}
                    });
                })
            },
            team: function (val, old) {
                this.form.teamId = val.id;
                if (old === null) {
                    window.cardState = JSON.parse(JSON.stringify(this.$data))
                }
            }
        },
        created() {
            delete window.cardState;
            if (this.team !== null) {
                this.form.teamId = this.team.id
            }
            CardResource.teams().then(({data}) => {
                this.options = data.data.map(team => {
                    return {value: team.id, label: team.name}
                })
            });
            this.form.name = this.$route.query.name;
            window.cardState = JSON.parse(JSON.stringify(this.$data))
        },
        methods: {
            ...mapActions({
                create: 'cards/create',
                loadTeamCollections: 'cards/collections'
            }),
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.create(this.prepare()).then(this.redirect)
            },
            close() {
                if (window.cardState === undefined || !this.hasAnyChanges(window.cardState)) {
                    return this.redirect();
                }

                this.confirm().then(() => {
                    return this.redirect();
                }).catch(() => {
                })
            },
            redirect() {
                this.$router.push({name: 'cards_list'})
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
            chooseFile(files) {
                this.file = files[0]
            },
            cancelFile() {
                this.file = null
            },
            toggleEditorTools(e) {
                this.selection = e
            },
            changeFormatting(e) {
                this.form.description = e.content
            }
        }
    }
</script>