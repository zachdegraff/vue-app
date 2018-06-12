<template>
    <q-modal v-model="isOpen" @hide="close" class="app-modal" :content-classes="['app-modal-auth-register']">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Registration</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>

            <div class="row q-pa-xl flex-center">
                <div class="card-content col-xs-12">
                    <q-field class="q-py-sm" :error="$v.form.email.$error" :error-label="firstErrorFor($v.form.email)">
                        <q-input type="text" float-label="Email" v-model="form.email" @blur="$v.form.email.$touch"/>
                    </q-field>
                    <q-field class="q-py-sm" :error="$v.form.firstName.$error" :error-label="firstErrorFor($v.form.firstName)">
                        <q-input type="text" float-label="First Name" v-model="form.firstName" @blur="$v.form.firstName.$touch"/>
                    </q-field>
                    <q-field class="q-py-sm">
                        <q-input type="text" float-label="Last Name" v-model="form.lastName"/>
                    </q-field>
                    <q-field class="q-py-sm" :error="$v.form.password.$error" :error-label="firstErrorFor($v.form.password)">
                        <q-input type="password" float-label="Password" v-model="form.password" @blur="$v.form.password.$touch"/>
                    </q-field>
                    <q-field class="q-py-sm" :error="$v.form.password_confirmation.$error" :error-label="firstErrorFor($v.form.password_confirmation)">
                        <q-input type="password" float-label="Repeat Password" v-model="form.password_confirmation" @blur="$v.form.password_confirmation.$touch"/>
                    </q-field>
                    <q-field class="q-py-sm" label="Photo" label-width="12">
                        <image-chooser @change="changeUserPhoto"></image-chooser>
                    </q-field>
                    <div class="q-pt-lg text-center">
                        <q-btn color="primary" label="register" @click="submit" :disabled="isProcessing"/>
                    </div>
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
    import ImageChooser from "../../components/ImageChooser";


    export default {
        data: () => {
            return {
                form: {
                    email: '',
                    firstName: '',
                    lastName: '',
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
                firstName: {
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
        created() {
            document.title = 'Register a new account - Wonderus';
        },
        computed: {
            ...mapGetters({
                isProcessing: 'auth/isRegistering'
            })
        },
        components: {
            ImageChooser,
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
                for (let i in this.form) {
                    data.append(i, this.form[i])
                }
                return data
            },
            changeUserPhoto(file) {
                this.form.file = file
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