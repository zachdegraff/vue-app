<template>
    <q-modal v-model="isOpen" @hide="$emit('closed')" class="app-modal" :content-classes="['app-modal-invite']">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Invite a new member</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <div class="row q-py-xl flex-center">
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-field class="q-py-sm" :error="$v.form.email.$error" :error-label="firstErrorFor($v.form.email)">
                        <q-input type="text" float-label="Email" v-model="form.email" @blur="$v.form.email.$touch" @keyup.enter="submit"/>
                    </q-field>
                    <div class="q-pt-lg text-center">
                        <q-btn color="primary" label="invite" @click="submit" :disabled="isProcessing"/>
                    </div>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import {required, email} from 'vuelidate/lib/validators'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: {
            id: {
                required: true
            }
        },
        data: () => {
            return {
                form: {
                    email: ''
                },
                isOpen: true
            }
        },
        mixins: [ValidatorMessages],
        validations: {
            form: {
                email: {
                    required,
                    email
                }
            }
        },
        computed: {
            ...mapGetters({
                isProcessing: 'members/isInviting'
            })
        },
        components: {
            AppModalLayout
        },
        created() {
            document.title = 'Invite a new member'
        },
        methods: {
            ...mapActions({
                invite: 'members/inviteNewMemberToTeam'
            }),
            submit() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }
                this.invite({id: this.id, params: this.form}).then(() => this.$emit('closed'))
            }
        }
    }
</script>
<style lang="scss">
    .app-modal {
        .app-modal-invite {
            top: 100px;
            left: 50%;
            max-width: 600px;
            margin: 0 0 100px -300px;
            overflow: visible;
            max-height: none;
        }
    }

    @media (max-width: 767px) {
        .app-modal {
            .app-modal-invite {
                top: 0;
                left: 0;
                margin: 0;
                overflow: auto;
            }
        }
    }
</style>