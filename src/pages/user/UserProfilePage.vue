<template>
	<div class="content-container">
		<div class="row flex-center">
			<div class="col-xs-12 col-sm-8">
				<h5>My Profile</h5>
				<q-field :error="$v.form.email.$error" :error-label="firstErrorFor($v.form.email)" class="q-py-sm">
					<q-input @blur="$v.form.email.$touch" float-label="Email" type="text" v-model="form.email"/>
				</q-field>
				<q-field :error="$v.form.firstName.$error" :error-label="firstErrorFor($v.form.firstName)" class="q-py-sm">
					<q-input @blur="$v.form.firstName.$touch" float-label="First Name" type="text" v-model="form.firstName"/>
				</q-field>
				<q-field class="q-py-sm">
					<q-input float-label="Last Name" type="text" v-model="form.lastName"/>
				</q-field>
				<q-field :error="$v.form.password.$error" :error-label="firstErrorFor($v.form.password)" class="q-py-sm">
					<q-input @blur="$v.form.password.$touch" float-label="Password" type="password" v-model="form.password"/>
				</q-field>
				<q-field :error="$v.form.password_confirmation.$error" :error-label="firstErrorFor($v.form.password_confirmation)" class="q-py-sm">
					<q-input @blur="$v.form.password_confirmation.$touch" float-label="Repeat Password" type="password" v-model="form.password_confirmation"/>
				</q-field>
				<q-field class="q-py-sm" label="Profile Picture" label-width="12" v-if="user">
					<image-chooser :path="user.photo" @change="changeFile"></image-chooser>
				</q-field>
				<q-field class="q-py-sm">
					<q-checkbox label="Receive email notifications for requests" v-model="form.sendNotifications"/>
				</q-field>
				<q-field class="q-py-sm">
					<q-checkbox label="Turn on Dark Mode?" v-model="form.darkMode"/>
				</q-field>
				<div class="q-pt-lg">
					<q-btn :disabled="isProcessing" @click="submit" color="primary" label="save"/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {required, email, sameAs, minLength} from 'vuelidate/lib/validators'
	import ValidatorMessages from '../../mixins/ValidatorMessages'
	import ImageChooser from '../../components/ImageChooser'
	import {mapActions, mapGetters} from 'vuex'

	export default {
		components: {ImageChooser},
		data: () => {
			return {
				form: {
					email: '',
					firstName: '',
					lastName: '',
					password: '',
					password_confirmation: '',
					file: null,
					flushPhoto: false,
					sendNotifications: true,
					darkMode: true
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
					minLength: minLength(8),
					exactPattern: (value) => {
						if (value === '') {
							return true
						}
						return value.match(/^(?=.*[0-9!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/) !== null
					}
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
				if (val !== null) {
					this.loadValues(val)
				}
			}
		},
		methods: {
			...mapActions({
				update: 'users/update'
			}),
			loadValues(user) {
				['email', 'firstName', 'lastName', 'sendNotifications', 'darkMode'].forEach(i => this.form[i] = user[i])
			},
			submit() {
				this.$v.form.$touch();
				if (this.$v.form.$error) {
					return
				}

				this.update({id: this.user.id, model: this.prepare()}).then(() => {
					['password', 'password_confirmation'].forEach(i => this.form[i] = '')
				})
			},
			prepare() {
				const data = new FormData();
				data.append('_method', 'PUT');
				for (let i in this.form) {
					let val = this.form[i];
					if (val instanceof Boolean) {
						val = Number(val)
					}
					data.append(i, this.form[i])
				}
				return data
			},
			changeFile(file) {
				this.form.flushPhoto = file === null;
				this.form.file = file
			}
		}
	}
</script>
