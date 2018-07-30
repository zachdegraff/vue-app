<template>
    <q-card class="q-pa-md">
        <q-card-main>
            <strong class="q-headline">Login to your Wonderus account</strong>
            <div class="q-mt-xs">or
                <router-link :to="{name:'register_user'}" class="text-primary">create a new account</router-link>
            </div>

            <q-field class="q-py-md" :error="$v.form.email.$error" :error-label="firstErrorFor($v.form.email)">
                <q-input type="text" float-label="Email" v-model="form.email" @blur="$v.form.email.$touch" @keyup.enter="submit"/>
            </q-field>
            <q-field class="q-pb-md" :error="$v.form.password.$error" :error-label="firstErrorFor($v.form.password)">
                <q-input type="password" float-label="Password" v-model="form.password" @blur="$v.form.email.$touch" @keyup.enter="submit"/>
            </q-field>
            <q-btn label="log in" color="primary" class="full-width q-my-md" @click="submit" :disabled="isDisabledSubmitBtn"/>
            <div class="q-py-sm overflow-hidden">
                <router-link :to="{name:'forgot_password'}" class="text-primary">Forgot your password?</router-link>
            </div>
        </q-card-main>
    </q-card>
</template>
<script>
    import {required, email, minLength} from 'vuelidate/lib/validators'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
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
                    required
                }
            }
        },
        computed: {
            ...mapGetters({
                referer: 'route/getReferer',
                isProcessing: 'auth/isLogging'
            }),
            isDisabledSubmitBtn() {
                return this.$v.form.$invalid || this.isProcessing
            }
        },
        created() {
            document.title = 'Wonderus';
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

                this.login(this.form).then(() => {
                    if (this.referer) {
                        return this.$router.push(this.referer)
                    }
                    this.$router.push({name: 'home'})
                })
            }
        }
    }
</script>