<template>
    <q-modal v-model="isOpen" @hide="close" class="app-modal" :content-classes="['app-modal-auth-register']">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Registration</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>

            <div class="row q-pa-xl flex-center">
                <div class="card-content col-xs-12">
                    <form @submit.prevent="submit">
                        <q-field class="q-py-sm" :error="$v.form.email.$error" :error-label="firstErrorFor($v.form.email)">
                            <q-input type="text" float-label="Email" v-model="form.email" @blur="$v.form.email.$touch"/>
                        </q-field>
                        <q-field class="q-py-sm" :error="$v.form.first_name.$error" :error-label="firstErrorFor($v.form.first_name)">
                            <q-input type="text" float-label="First Name" v-model="form.first_name" @blur="$v.form.first_name.$touch"/>
                        </q-field>
                        <q-field class="q-py-sm">
                            <q-input type="text" float-label="Last Name" v-model="form.last_name"/>
                        </q-field>
                        <q-field class="q-py-sm" :error="$v.form.password.$error" :error-label="firstErrorFor($v.form.password)">
                            <q-input type="password" float-label="Password" v-model="form.password" @blur="$v.form.password.$touch"/>
                        </q-field>
                        <q-field class="q-py-sm" :error="$v.form.password_confirmation.$error" :error-label="firstErrorFor($v.form.password_confirmation)">
                            <q-input type="password" float-label="Repeat Password" v-model="form.password_confirmation" @blur="$v.form.password_confirmation.$touch"/>
                        </q-field>
                        <q-field class="q-py-sm">
                            <q-uploader url="" float-label="Photo" hide-upload-button @add="chooseFile" @remove:cancel="cancelFile" :disable="isProcessing" extensions=".jpg,.jpeg,.png"/>
                        </q-field>
                        <div class="q-pt-lg text-center">
                            <q-btn color="primary" label="register" :disabled="isProcessing"/>
                        </div>
                    </form>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import {required, email, sameAs, minLength} from 'vuelidate/lib/validators'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {mapActions, mapGetters} from 'vuex'


    export default {
        data: () => {
            return {
                form: {
                    email: '',
                    first_name: '',
                    last_name: '',
                    password: '',
                    password_confirmation: '',
                    file: null,
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
                },
                first_name: {
                    required
                },
                password: {
                    required,
                    minLength: minLength(3)
                },
                password_confirmation: {
                    sameAsPassword: sameAs('password')
                }
            }
        },
        computed: {
            ...mapGetters({
                isProcessing: 'auth/isRegistering'
            })
        },
        components: {
            AppModalLayout
        },
        methods: {
            ...mapActions({
                register: 'auth/register'
            }),
            submit() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.register(this.prepare()).then(() => this.$router.push({name: 'home'}))
            },
            close() {
                this.$router.push({name: 'login_user'})
            },
            prepare() {
                const data = new FormData();
                for(let i in this.form) {
                    data.append(i, this.form[i])
                }
                return data
            },
            chooseFile(files) {
                this.form.file = files[0]
            },
            cancelFile() {
                this.form.file = null
            }
        }
    }
</script>
<style lang="scss">
    .app-modal {
        .app-modal-auth-register {
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
            .app-modal-auth-register {
                top: 0;
                left: 0;
                margin: 0;
                overflow: auto;
            }
        }
    }
</style>