<template>
    <q-card class="q-pa-md">
        <q-card-main>
            <strong class="q-headline">Reset Password</strong>
            <div class="q-mt-xs">or <router-link :to="{name:'login_user'}" class="text-primary">log into an existing account</router-link></div>

            <q-field class="q-py-sm" :error="$v.form.password.$error" :error-label="firstErrorFor($v.form.password)">
                <q-input type="password" float-label="Password" v-model="form.password" @blur="$v.form.password.$touch"/>
            </q-field>
            <q-field class="q-py-sm" :error="$v.form.password_confirmation.$error" :error-label="firstErrorFor($v.form.password_confirmation)">
                <q-input type="password" float-label="Repeat Password" v-model="form.password_confirmation" @blur="$v.form.password_confirmation.$touch"/>
            </q-field>

            <q-btn color="primary" label="reset" class="full-width q-my-md" @click="submit" :disabled="isProcessing"/>
        </q-card-main>
    </q-card>
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
            document.title = 'Reset password - Wonderus';
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