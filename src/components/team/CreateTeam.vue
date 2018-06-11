<template>
    <q-modal v-model="isOpen" @hide="closeAdding" class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '80vw', minHeight: '50vh'}">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Adding a new team</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <div class="row q-py-xl gutter-md flex-center">
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.form.name.$error" :error-label="firstErrorFor($v.form.name)">
                    <q-input v-model="form.name" float-label="Name" @blur="$v.form.name.$touch"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-input v-model="form.organization" float-label="Organization"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-uploader url="" float-label="Photo" hide-upload-button @add="chooseFile" @remove:cancel="cancelFile" :disable="isProcessing" extensions=".jpg,.jpeg,.png"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <strong>Members</strong><br/>
                    <q-input v-for="(member, idx) in members" :key="idx" v-model="member.email" float-label="Email address"/>
                    <q-btn @click="addMember" class="q-mt-sm">Add a new member</q-btn>
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
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                form: {
                    name: '',
                    organization: '',
                },
                members: [],
                file: null,
                isOpen: true
            }
        },
        mixins: [ValidatorMessages],
        validations: {
            form: {
                name: {
                    required
                }
            }
        },
        created() {
            document.title = 'Create a new team - Wonderus'
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
                view: 'teams/view',
                create: 'teams/create',
                closeAdding: 'modals/closeCreateTeam'
            }),
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.create(this.prepare()).then((data) => {
                    this.view(data.team.id);
                    this.closeAdding();
                })
            },
            prepare() {
                const data = new FormData();
                for (let i in this.form) {
                    data.append(i, this.form[i])
                }
                data.append('members', this.members.map(member => member.email).join(','));
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
            addMember() {
                this.members.push({email: ''})
            }
        }
    }
</script>