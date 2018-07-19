<template>
    <q-modal v-model="isOpen" @hide="closeEditing" class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '80vw', minHeight: '50vh'}">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title v-if="team">Editing {{team.name}}</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>

            <div class="row text-center card-item" v-if="!team">
                <div class="col">
                    <q-spinner :size="50" color="red"></q-spinner>
                </div>
            </div>

            <div class="row q-py-xl gutter-md flex-center" v-if="team">
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.team.name.$error" :error-label="firstErrorFor($v.team.name)">
                    <q-input v-model="team.name" float-label="Name" @blur="$v.team.name.$touch"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" label="Image" label-width="12">
                    <image-chooser :path="team.photo" @change="changeFile"></image-chooser>
                </q-field>

                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-btn @click="save" color="primary" class="q-mt-lg" :disable="isProcessing">save</q-btn>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'
    import ImageChooser from "../ImageChooser";

    export default {
        data: () => {
            return {
                file: null,
                isOpen: true
            }
        },
        mixins: [ValidatorMessages],
        watch: {
            team: function(val) {
                if (val) {
                    document.title = `Editing ${val.name} team - Wonderus`
                }
            }
        },
        validations: {
            team: {
                name: {
                    required
                }
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/getEditingTeam',
                isProcessing: 'teams/isUpdating'
            })
        },
        components: {
            ImageChooser,
            AppModalLayout
        },
        methods: {
            ...mapActions({
                update: 'teams/update',
                closeEditing: 'modals/closeEditTeam',
            }),
            save() {
                this.$v.team.$touch();
                if (this.$v.team.$error) {
                    return
                }

                this.update({id: this.team.id, form: this.prepare()}).then(this.closeEditing);
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