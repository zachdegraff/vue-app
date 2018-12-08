<template>
    <div>
        <div class="row text-center card-item" v-if="!team">
            <div class="col">
                <q-spinner :size="50" color="red"></q-spinner>
            </div>
        </div>
        <div v-if="team">
            <div class="row gutter-x-md q-mt-md">
                <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3">
                    <img :src="photo(team.photo)" class="round-borders full-width"/>
                </div>
                <div class="col-xs-12 col-sm-6 col-lg-8 col-xl-9">
                    <q-field class="q-mt-md" :error="$v.form.name.$error" :error-label="firstErrorFor($v.form.name)">
                        <q-input v-model="form.name" float-label="Name" @blur="$v.form.name.$touch" :readonly="!isOwner"/>
                    </q-field>
                    <q-field class="q-mt-lg" v-if="isOwner">
                        <image-chooser @change="changeFile"></image-chooser>
                    </q-field>
                    <div class="q-mt-lg">
                        To remove this team from Wonderus, please contact <a href="mailto:hello@wonderus.app">hello@wonderus.app</a>
                    </div>
                    <div v-show="isOwner">
                        <q-btn @click="save" color="primary" class="q-mt-lg" label="save" :disable="isUpdating"/>
                    </div>
                </div>
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
                name: ''
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
                getTeam: 'teams/getById',
                isUpdating: 'teams/isUpdating'
            }),
            team() {
                return this.getTeam(this.id)
            },
            isOwner() {
                if (!this.team) {
                    return false;
                }
                return this.team.isOwner
            }
        },
        components: {
            ImageChooser
        },
        created() {
            if (this.team) this.init(this.team)
        },
        methods: {
            ...mapActions({
                update: 'teams/update'
            }),
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.update({id: this.id, form: this.prepare()});
            },
            init(team) {
                this.form = team;
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
                for (let i in this.team) {
                    data.append(i, this.team[i])
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