<template>
    <q-modal v-model="isOpen" @hide="redirect" class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '80vw', minHeight: '50vh'}">
        <app-modal-layout v-if="model">
            <q-toolbar slot="header">
                <q-toolbar-title>Adding a new team</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <div class="row q-py-xl gutter-md flex-center">
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-input v-model="model.name" float-label="Name"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-input v-model="model.organization" float-label="Organization"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-uploader url="" float-label="Photo" hide-upload-button @add="chooseFile" @remove:cancel="cancelFile" :disable="isProcessing" extensions=".jpg,.jpeg,.png"/>
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
    import {mapActions, mapGetters} from 'vuex'
    import {CARD_SECTIONS} from "../../consts"
    import {notify} from "../../helpers"

    export default {
        data: () => {
            return {
                model: {
                    name: '',
                    organization: '',
                },
                file: null,
                isOpen: true
            }
        },
        computed: {
            ...mapGetters({
                isProcessing: 'teams/isCreating'
            })
        },
        components: {
            AppModalLayout
        },
        methods: {
            ...mapActions({
                create: 'teams/create'
            }),
            save() {
                this.create(this.prepare()).then((data) => {
                    this.$router.push({name: 'view_team', params: {id: data.team.id}})
                })
            },
            redirect() {
                this.$router.go(-1)
            },
            prepare() {
                const data = new FormData();
                for (let i in this.model) {
                    data.append(i, this.model[i])
                }
                data.append('file', this.file);
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