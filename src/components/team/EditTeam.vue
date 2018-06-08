<template>
    <q-modal v-model="isOpen" @hide="closeEditing" class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '80vw', minHeight: '50vh'}">
        <app-modal-layout v-if="model">
            <q-toolbar slot="header">
                <q-toolbar-title>Editing {{model.name}}</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <div class="row q-py-xl gutter-md flex-center">
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.model.name.$error" :error-label="firstErrorFor($v.model.name)">
                    <q-input v-model="model.name" float-label="Name" @blur="$v.model.name.$touch"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-input v-model="model.organization" float-label="Name"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <img :src="photo(model.photo)" class="round-borders" width="200px"/>
                    <q-uploader url="" float-label="Photo" hide-upload-button @add="chooseFile" @remove:cancel="cancelFile" :disable="isProcessing" extensions=".jpg,.jpeg,.png"/>
                </q-field>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-btn @click="save" color="primary" class="q-mt-lg" :disable="isProcessing">save</q-btn>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                file: null,
                isOpen: true
            }
        },
        mixins: [ValidatorMessages],
        watch: {
            model: function(val) {
                document.title = `Editing ${val.name} team - Wonderus`
            }
        },
        validations: {
            model: {
                name: {
                    required
                }
            }
        },
        computed: {
            ...mapGetters({
                model: 'teams/getEditingTeam',
                isProcessing: 'teams/isUpdating'
            })
        },
        components: {
            AppModalLayout
        },
        methods: {
            ...mapActions({
                update: 'teams/update',
                closeEditing: 'teams/closeEditing',
            }),
            save() {
                this.$v.model.$touch();
                if (this.$v.model.$error) {
                    return
                }

                this.update({id: this.model.id, model: this.prepare()}).then(this.closeEditing);
            },
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return path
            },
            prepare() {
                const data = new FormData();
                for (let i in this.model) {
                    data.append(i, this.model[i])
                }
                data.append('_method', 'PUT');
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
            }
        }
    }
</script>