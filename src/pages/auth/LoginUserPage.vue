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
            <div>
                <a href="https://slack.com/openid/connect/authorize?scope=openid%20email%20profile&amp;response_type=code&amp;redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fopenid%2Fredirect&amp;client_id=3462380885846.3543846594615" style="align-items:center;color:#000;background-color:#fff;border:1px solid #ddd;border-radius:4px;display:inline-flex;font-family:Lato, sans-serif;font-size:16px;font-weight:600;height:48px;justify-content:center;text-decoration:none;width:256px"><svg xmlns="http://www.w3.org/2000/svg" style="height:20px;width:20px;margin-right:12px" viewBox="0 0 122.8 122.8"><path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"></path><path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"></path><path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"></path><path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"></path></svg>Sign in with Slack</a>            </div>
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
                team: 'teams/current',
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

                this.login(this.form).then((res) => {
                    localStorage.setItem('user', JSON.stringify(res.user));
                    if (this.referer) {
                        return this.$router.push(this.referer)
                    }
                    if (res.user.isSuperAdmin == 1){
                        return this.$router.push({name: 'super_admin'})
                    }
                    this.$router.push({name: 'home'})
                })
            }
        }
    }
</script>
