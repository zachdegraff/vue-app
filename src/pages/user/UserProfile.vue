<template>
    <div>
        <h5>My Profile</h5>
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
        <q-field class="q-py-sm">
            <img :src="user.photo" class="round-borders" width="200px" v-if="user && user.photo"/>
            <q-uploader url="" float-label="Photo" hide-upload-button @add="chooseFile" @remove:cancel="cancelFile" :disable="isProcessing" extensions=".jpg,.jpeg,.png"/>
        </q-field>
        <div class="q-pt-lg">
            <q-btn color="primary" label="save" @click="submit" :disabled="isProcessing"/>
        </div>
    </div>
</template>
<script>
    import {required, email, sameAs, minLength} from 'vuelidate/lib/validators'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {mapActions, mapGetters} from 'vuex'

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
                    minLength: minLength(3)
                },
                password_confirmation: {
                    sameAsPassword: sameAs('password')
                }
            }
        },
        created() {
            if (this.user !== null) {
                this.loadValues(this.user)
            }
            document.title = 'My Profile - Wonderus';
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                isProcessing: 'users/isUpdating'
            })
        },
        watch: {
            user: function (val) {
                this.loadValues(val)
            }
        },
        methods: {
            ...mapActions({
                update: 'users/update',
                loadAuthUser: 'auth/user',
            }),
            loadValues(user) {
                ['email', 'firstName', 'lastName'].forEach(i => this.form[i] = user[i])
            },
            submit() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.update({id: this.user.id, model: this.prepare()}).then(() => {
                    ['password', 'password_confirmation'].forEach(i => this.form[i] = '');
                    this.loadAuthUser()
                })
            },
            prepare() {
                const data = new FormData();
                data.append('_method', 'PUT');
                for (let i in this.form) {
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