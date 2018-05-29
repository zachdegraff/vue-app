<template>
    <q-layout>
        <q-page-container>
            <q-page>
                <div class="row flex-center window-height">
                    <div class="auth-login col-xs-11 col-sm-6 col-md-4">
                        <div class="auth-login-logo text-center q-pb-lg">
                            <img src="statics/auth-logo.png"/>
                        </div>
                        <q-card class="">
                            <q-card-title class="bg-primary text-white">
                                Log in
                            </q-card-title>
                            <q-card-separator/>
                            <q-card-main>
                                <q-field class="q-py-sm" :error="$v.form.email.$error" :error-label="firstErrorFor($v.form.email)">
                                    <q-input type="text" float-label="Email" v-model="form.email" @blur="$v.form.email.$touch"/>
                                </q-field>
                                <q-field class="q-pb-md" :error="$v.form.password.$error" :error-label="firstErrorFor($v.form.password)">
                                    <q-input type="password" float-label="Password" v-model="form.password" @blur="$v.form.email.$touch"/>
                                </q-field>
                                <div class="q-py-sm overflow-hidden">
                                    <router-link :to="{name:'forgot_password'}" class="text-primary">Forgot Password?</router-link>
                                </div>
                            </q-card-main>
                            <q-card-separator/>
                            <q-card-actions align="between">
                                <q-btn label="Submit" color="primary" @click="submit" :disabled="isProcessing"/>
                                <q-btn label="Register" color="white text-black" @click.prevent="$router.push({name:'register_user'})"/>
                            </q-card-actions>
                        </q-card>
                    </div>
                </div>
            </q-page>
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>
<script>
    import {required, email, minLength} from 'vuelidate/lib/validators'
    import ValidatorMessages from '../mixins/ValidatorMessages'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        mixins: [ValidatorMessages],
        validations: {
            form: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(3)
                }
            }
        },
        computed: {
            ...mapGetters({
                isProcessing: 'auth/isLogging'
            })
        },
        methods: {
            ...mapActions({
                login: 'auth/login'
            }),
            submit() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.login(this.form).then(() => this.$router.push({name: 'home'}))
            }
        }
    }
</script>
<style lang="scss">
    .auth-login {
        .auth-login-logo {
            img {
                max-width: 300px;
            }
        }
    }
</style>