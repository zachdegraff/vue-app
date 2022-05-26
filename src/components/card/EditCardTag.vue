<template>
    <q-modal v-model="isOpen" @hide="closeEditing" class="app-modal" :content-classes="['app-modal-card-tag']">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title v-if="tag">Editing {{tag.name}}</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>

            <div class="row text-center card-item" v-if="!tag">
                <div class="col">
                    <q-spinner :size="50" color="red"></q-spinner>
                </div>
            </div>

            <div class="row q-py-xl gutter-md flex-center" v-if="tag">
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.form.name.$error" :error-label="firstErrorFor($v.form.name)">
                    <q-input v-model="form.name" float-label="Name" @blur="$v.form.name.$touch"/>
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
                form: {
                    name: ''
                },
                file: null,
                isOpen: true
            }
        },
        mixins: [ValidatorMessages],
        watch: {
            tag: function (val) {
                if (val) {
                    this.form.name = val.name;
                    document.title = `Editing ${val.name} tag - Wonderus`
                }
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
                tag: 'tags/getEditingTag',
                isProcessing: 'tags/isUpdating'
            })
        },
        components: {
            AppModalLayout
        },
        created() {
            this.form.name = this.tag ? this.tag.name : ''
        },
        methods: {
            ...mapActions({
                update: 'tags/update',
                closeEditing: 'modals/closeEditCardTag',
            }),
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.update({id: this.tag.id, form: this.form}).then(this.closeEditing);
            }
        }
    }
</script>
<style lang="scss">
    .app-modal {
        .app-modal-card-tag {
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
            .app-modal-card-tag {
                top: 0;
                left: 0;
                margin: 0;
                overflow: auto;
            }
        }
    }
</style>
