<template>
    <q-card class="q-pa-md">
        <q-card-main>
            <strong class="q-headline">Send password reset email</strong>
            <div class="q-mt-xs">or <router-link :to="{name:'login_user'}" class="text-primary">log into an existing account</router-link></div>
            <q-field class="q-py-md" :error="$v.email.$error" :error-label="firstErrorFor($v.email)">
                <q-input type="text" float-label="Email" v-model="email" @keyup.enter="submit" @blur="$v.email.$touch"/>
            </q-field>
            <q-btn color="primary" label="send" class="full-width q-my-md" @click="submit" :disabled="isDisabledSubmitBtn"/>
        </q-card-main>
    </q-card>
</template>
<script>
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {required, email} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'


    export default {
        data: () => {
            return {
                email: ''
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
            }),
            isDisabledSubmitBtn() {
                return this.$v.email.$invalid || this.isProcessing
            }
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