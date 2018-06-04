<template>
    <q-modal v-model="isOpen" @hide="redirect" class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '50vw', minHeight: '80vh'}">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title v-if="form">Editing {{form.name}}</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>

            <div class="row text-center card-item" v-if="!form">
                <div class="col">
                    <q-spinner :size="50" color="red"></q-spinner>
                </div>
            </div>

            <div class="row q-py-xl gutter-md flex-center" v-if="form">
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
                    <div class="edit-card-image-container" v-if="form.thumb" v-show="!flushImage">
                        <img :src="form.thumb" class="round-borders" width="200px"/><br/>
                        <q-btn round color="red" size="xs" icon="delete" class="edit-card-image-remove-btn" @click="flushImage = true"/>
                    </div>
                    <q-uploader url="" float-label="Image" hide-upload-button @add="chooseFile" @remove:cancel="cancelFile" :disable="isProcessing" extensions=".jpg,.jpeg,.png"/>
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
    import EditorTools from '../../components/EditorTools'
    import CardResource from '../../resources/card/CardResource'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: {
            id: {
                required: true
            }
        },
        data: () => {
            return {
                form: null,
                file: null,
                links: [],
                options: [],
                flushImage: false,
                selection: null,
                collections: {field: 'label', list: []},
                isOpen: true
            }
        },
        created() {
            this.load(this.id).then(data => {
                this.links = data.links;
                this.form = data;
                this.form.collections = data.collections.map(item => item.name)
            });
            CardResource.teams().then(({data}) => {
                this.options = data.data.map(team => {
                    return {value: team.id, label: team.name}
                })
            })
        },
        mixins: [ValidatorMessages],
        computed: {
            ...mapGetters({
                isProcessing: 'cards/isUpdating'
            }),
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
            team: function (val) {
                this.form.teamId = val.id
            }
        },
        methods: {
            ...mapActions({
                load: 'cards/get',
                update: 'cards/update',
                loadTeamCollections: 'cards/collections'
            }),
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.update({id: this.id, form: this.prepare()}).then(this.redirect);
            },
            redirect() {
                this.$router.push({name: 'view_card', params: {id: this.id}})
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
            chooseFile(files) {
                this.file = files[0]
            },
            cancelFile() {
                this.file = null
            },
            addLink() {
                this.links.push({name: '', url: ''})
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
<style lang="scss">
    .edit-card-image-container {
        position: relative;
    }

    .edit-card-image-remove-btn {
        position: absolute;
        top: 10px;
        left: 10px;
    }
</style>