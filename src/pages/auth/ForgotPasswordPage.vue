<template>
    <q-modal v-model="isOpen" @hide="close" class="app-modal" :content-classes="['app-modal-auth-forgot']">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Restore password</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>

            <div class="row q-pa-xl flex-center">
                <div class="card-content col-xs-12">
                    <q-field class="q-py-sm" :error="$v.email.$error" :error-label="firstErrorFor($v.email)">
                        <q-input type="text" float-label="Email" v-model="email" @click="submit" @blur="$v.email.$touch"/>
                    </q-field>
                    <div class="q-pt-lg text-center">
                        <q-btn color="primary" label="restore" :disabled="isProcessing"/>
                    </div>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {required, email} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'


    export default {
        data: () => {
            return {
                email: '',
                isOpen: true
            }
        },
        mixins: [ValidatorMessages],
        validations: {
            email: {
                required,
                email
            }
        },
        computed: {
            ...mapGetters({
                isProcessing: 'auth/isRestoring'
            })
        },
        components: {
            AppModalLayout
        },
        created() {
            document.title = 'Forgot password - Wonderus';
        },
        methods: {
            ...mapActions({
                forgot: 'auth/forgot'
            }),
            close() {
                this.$router.push({name: 'login_user'})
            },
            submit() {
                this.$v.email.$touch();
                if (this.$v.email.$error) {
                    return
                }

                this.forgot(this.email).then(() => this.$router.push({name: 'login_user'}))
            }
        }
    }
</script>
<style lang="scss">
    .app-modal {
        .app-modal-auth-forgot {
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
            .app-modal-auth-forgot {
                top: 0;
                left: 0;
                margin: 0;
                overflow: auto;
            }
        }
    }
</style>