<template>
    <div>
        <div class="row text-center card-item" v-if="!team">
            <div class="col">
                <q-spinner :size="50" color="red"></q-spinner>
            </div>
        </div>
        <div v-if="team">
            <div class="q-headline">About Team</div>
            <div class="row gutter-x-md q-mt-md">
                <div class="col-xs-12 col-sm-4 col-lg-3">
                    <img :src="photo(team.photo)" class="round-borders full-width"/>
                </div>
                <div class="col-xs-12 col-sm-8 col-lg-9">
                    <q-field class="q-mt-md" :error="$v.form.name.$error" :error-label="firstErrorFor($v.form.name)">
                        <q-input v-model="form.name" float-label="Team Name" @blur="$v.form.name.$touch" :readonly="!isOwner"/>
                    </q-field>
                    <q-field class="q-mt-lg" v-if="user.isSuperAdmin">
                        <q-select :options="options" float-label="Coupon" v-model="form.couponId"/>
                    </q-field>

                    <q-field class="q-mt-lg" label="Change Team Photo" label-width="12" v-if="isOwner">
                        <image-chooser @change="changeFile"></image-chooser>
                    </q-field>
                    <div class="text-right" v-show="isOwner">
                        <q-btn @click="save" color="primary" class="q-mt-lg" label="save" :disable="isDisabledSaveBtn"/>
                    </div>
                </div>
            </div>
            <div class="q-mt-lg text-center">
                <q-btn label="Create new team" flat no-caps color="primary" @click="create"/>
            </div>
            <div class="text-center q-mt-lg" v-if="isOwner">
                To remove this team from Wonderus, please contact
                <a href="mailto:hello@wonderus.app">hello@wonderus.app</a>
            </div>
            <div class="text-center q-mt-lg" v-if="!isOwner">
                Only team admins can make changes to team settings and invite new members.
            </div>
        </div>
    </div>
</template>
<script>
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import ImageChooser from '../../components/ImageChooser'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: ['id'],
        data: () => ({
            form: {
                name: '',
                couponId: ''
            },
            file: null
        }),
        mixins: [ValidatorMessages],
        watch: {
            team: function (val) {
                if (!val) return;

                this.init(val)
            }
        },
        validations: {
            form: {
                name: {
                    required
                }
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                getTeam: 'teams/getById',
                coupons: 'subscription/getCoupons',
                isUpdating: 'teams/isUpdating',
                isValidSubscription: 'subscription/isValid'
            }),
            team() {
                return this.getTeam(this.id)
            },
            options() {
                const items = [{value: '', label: ''}];
                items.push(...this.coupons.map(coupon => {
                    return {value: coupon.id, label: coupon.name}
                }));
                return items
            },
            isOwner() {
                if (!this.team) {
                    return false;
                }
                return this.team.isOwner
            },
            isDisabledSaveBtn() {
                if (this.user.isSuperAdmin) {
                    return false
                }
                return this.isUpdating || !this.isValidSubscription
            }
        },
        components: {
            ImageChooser
        },
        created() {
            this.loadCoupons();
            if (this.team) this.init(this.team)
        },
        methods: {
            ...mapActions({
                update: 'teams/update',
                create: 'modals/openCreateTeam',
                loadCoupons: 'subscription/loadCoupons'
            }),
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.update({id: this.id, form: this.prepare()});
            },
            init(team) {
                this.form = Object.assign(this.form, team);
                if (team.coupon) {
                    this.form.couponId = team.coupon.id
                }
                document.title = `Manage ${team.name} team - Wonderus`
            },
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return path
            },
            prepare() {
                const data = new FormData();
                for (let i in this.form) {
                    data.append(i, this.form[i])
                }
                data.append('_method', 'PUT');
                if (this.file !== null) {
                    data.append('file', this.file);
                }
                return data
            },
            changeFile(file) {
                this.file = file
            }
        }
    }
</script>