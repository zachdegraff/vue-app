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
                        <div class="q-py-sm">
                            <q-input type="text" float-label="Email" v-model="form.email" required/>
                        </div>
                        <div class="q-py-sm">
                            <q-input type="text" float-label="First Name" v-model="form.firstName" required/>
                        </div>
                        <div class="q-py-sm">
                            <q-input type="text" float-label="Last Name" v-model="form.lastName"/>
                        </div>
                        <div class="q-py-sm">
                            <q-input type="password" float-label="Password" v-model="form.password" required/>
                        </div>
                        <div class="q-py-sm">
                            <q-uploader url="upload" float-label="Photo"/>
                        </div>
                        <div class="q-pt-lg text-center">
                            <q-btn color="primary" label="register"/>
                        </div>
                    </form>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import {mapActions, mapGetters} from 'vuex'


    export default {
        data: () => {
            return {
                form: {
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                },
                isOpen: true
            }
        },
        created() {

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
                this.register(this.form).then(() => this.$router.push({name: 'home'}))
            },
            close() {
                this.$router.push({name: 'login_user'})
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