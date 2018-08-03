<template>
    <div>
        <q-card class="q-pa-md" v-show="step == 1">
            <q-card-main>
                <strong class="q-headline">{{caption}}</strong>
                <div class="q-mt-xs" v-if="team">Create a new account to access the {{team.name}} team knowledge base.<br/>
                    Or
                    <router-link :to="{name:'login_user'}" class="text-primary">log into an existing account</router-link>
                </div>
                <div class="q-mt-xs" v-if="!team">or
                    <router-link :to="{name:'login_user'}" class="text-primary">log into an existing account</router-link>
                </div>

                <q-field class="q-py-md" :error="emailError" :error-label="emailErrorMessage">
                    <q-input type="text" float-label="Email" v-model="form.email" @blur="$v.form.email.$touch" @keyup.enter="next"/>
                </q-field>
                <q-btn label="next" color="primary" class="full-width q-my-md" @click="next" :disabled="isDisabledNextBtn"/>
            </q-card-main>
        </q-card>

        <q-card class="q-pa-md" v-show="step == 2">
            <q-card-main>
                <strong class="q-headline">Set up your Wonderus account</strong>
                <div class="q-mt-xs">Enter your information to complete the sign up process</div>
                <q-field class="q-py-sm" :error="$v.form.email.$error" :error-label="firstErrorFor($v.form.email)">
                    <q-input type="text" float-label="Email" v-model="form.email" @blur="$v.form.email.$touch"/>
                </q-field>
                <div class="row gutter-sm q-py-sm">
                    <div class="col-6">
                        <q-field :error="$v.form.firstName.$error" :error-label="firstErrorFor($v.form.firstName)">
                            <q-input type="text" float-label="First Name" v-model="form.firstName" @blur="$v.form.firstName.$touch"/>
                        </q-field>
                    </div>
                    <div class="col-6">
                        <q-field>
                            <q-input type="text" float-label="Last Name" v-model="form.lastName"/>
                        </q-field>
                    </div>
                </div>
                <q-field class="q-py-sm" :error="$v.form.password.$error" :error-label="passwordErrorMessage" helper="Use 8 or more characters with a mix of letters, numbers and symbols">
                    <q-input type="password" float-label="Password" v-model="form.password" @blur="$v.form.password.$touch"/>
                </q-field>
                <q-field class="q-py-sm" label="Profile Picture (optional)" label-width="12">
                    <image-chooser @change="changeUserPhoto"></image-chooser>
                </q-field>
                <div class="q-my-md text-tertiary">
                    By creating an account and using Wonderus you agree to our
                    <a href="https://wonderus.app/terms" class="text-primary" target="_blank">Terms of Service</a> and
                    <a href="https://wonderus.app/privacy" class="text-primary" target="_blank">Privacy Policy</a>
                </div>
                <q-btn color="primary" label="finish creating account" class="full-width q-my-md" @click="submit" :disabled="isDisabledSubmitBtn"/>
            </q-card-main>
        </q-card>
    </div>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import {required, email, minLength} from 'vuelidate/lib/validators'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import ImageChooser from '../../components/ImageChooser'
    import {mapActions, mapGetters} from 'vuex'


    export default {
        data: () => {
            return {
                form: {
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    file: null,
                },
                isUnique: true,
                symbols: ['>', '<', ')', '('],
                step: 1
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
                    minLength: minLength(8),
                    exactPattern: (value) => value.match(/^(?=.*[0-9!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/) !== null
                }
            }
        },
        created() {
            document.title = 'Register a new account - Wonderus';
            this.form.email = this.invitation ? this.invitation.email : '';

            if (this.invitation === null) {
                this.loadInvitation()
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                referer: 'route/getReferer',
                isCounting: 'users/isCounting',
                isProcessing: 'auth/isRegistering',
                invitation: 'members/getInvitation'
            }),
            caption() {
                if (this.invitation !== null) {
                    if (this.invitation.inviter) {
                        return `Join ${this.invitation.inviter.fullName} on Wonderus!`
                    }
                }
                return 'Create your new Wonderus account'
            },
            team() {
                if (this.invitation !== null) {
                    return this.invitation.team
                }
                return null
            },
            emailError() {
                if (this.isUnique === false) {
                    return true
                }
                return this.$v.form.email.$error
            },
            emailErrorMessage() {
                if (this.isUnique === false) {
                    return 'Email is already in use by an existing account';
                }
                return this.firstErrorFor(this.$v.form.email)
            },
            passwordErrorMessage() {
                if (this.isSymbolsInPassword()) {
                    return `Password cannot contain the ${this.symbols.join(' or ')} symbols.`
                }
                return this.firstErrorFor(this.$v.form.password)
            },
            isDisabledNextBtn() {
                return this.$v.form.email.$invalid || this.isCounting
            },
            isDisabledSubmitBtn() {
                return this.$v.form.$invalid || this.isProcessing
            }
        },
        components: {
            ImageChooser,
            AppModalLayout
        },
        watch: {
            invitation: function (val) {
                if (!val) return;

                this.form.email = val.email
            }
        },
        methods: {
            ...mapActions({
                usersCount: 'users/count',
                register: 'auth/register',
                loadInvitation: 'members/loadInvitation',
                flushInvitation: 'members/flushInvitation'
            }),
            next() {
                this.usersCount({email: this.form.email}).then(count => {
                    if (count > 0) {
                        return this.isUnique = false
                    }
                    this.step = 2
                })
            },
            submit() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.register(this.prepare()).then(() => {
                    this.flushInvitation();
                    if (this.referer) {
                        return this.$router.push(this.referer)
                    }
                    this.$router.push({name: 'home'})
                })
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
            },
            isSymbolsInPassword() {
                for (let i in this.symbols) {
                    if (this.form.password.indexOf(this.symbols[i]) !== -1) {
                        return true
                    }
                }
                return false
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