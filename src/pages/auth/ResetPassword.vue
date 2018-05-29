<template>
    <div class="row flex-center window-height">
        <q-card class="auth-login col-xs-11 col-sm-6 col-md-4">
            <q-card-title class="bg-primary text-white">
                Reset Password
            </q-card-title>
            <q-card-separator/>
            <q-card-main>
                <q-field class="q-py-sm" :error="$v.form.password.$error" :error-label="firstErrorFor($v.form.password)">
                    <q-input type="password" float-label="Password" v-model="form.password" @blur="$v.form.password.$touch"/>
                </q-field>
                <q-field class="q-py-sm" :error="$v.form.password_confirmation.$error" :error-label="firstErrorFor($v.form.password_confirmation)">
                    <q-input type="password" float-label="Repeat Password" v-model="form.password_confirmation" @blur="$v.form.password_confirmation.$touch"/>
                </q-field>
                <div class="q-py-sm overflow-hidden">
                    <router-link :to="{name:'login_user'}" class="text-primary">Log in</router-link>
                </div>
            </q-card-main>
            <q-card-separator/>
            <q-card-actions align="between">
                <q-btn label="Submit" color="secondary" @click="submit" :disabled="isProcessing"/>
            </q-card-actions>
        </q-card>
    </div>
</template>
<script>
    import {required, sameAs, minLength} from 'vuelidate/lib/validators'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                form: {
                    password: '',
                    password_confirmation: '',
                    token: ''
                }
            }
        },
        created() {
            this.form.token = this.$route.params.token
        },
        mixins: [ValidatorMessages],
        validations: {
            form: {
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
                isProcessing: 'auth/isResetting'
            })
        },
        methods: {
            ...mapActions({
                reset: 'auth/reset'
            }),
            submit() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.reset(this.form).then(() => this.$router.push({name: 'home'}))
            }
        }
    }
</script>