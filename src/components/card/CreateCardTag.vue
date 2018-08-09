<template>
    <q-modal v-model="isOpen" @hide="closeAdding" class="app-modal" :content-classes="['app-modal-card-tag']">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Create a new tag</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <div class="row q-py-xl gutter-md flex-center">
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.form.name.$error" :error-label="firstErrorFor($v.form.name)">
                    <q-input v-model="form.name" float-label="Name" @blur="$v.form.name.$touch"/>
                </q-field>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-btn @click="save" color="primary" class="q-mt-lg" :disable="isProcessing">create</q-btn>
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

    export default {
        data: () => {
            return {
                form: {
                    name: ''
                },
                isOpen: true
            }
        },
        mixins: [ValidatorMessages],
        validations: {
            form: {
                name: {
                    required
                }
            }
        },
        created() {
            document.title = 'Create a new tag - Wonderus'
        },
        computed: {
            ...mapGetters({
                isProcessing: 'tags/isCreating'
            })
        },
        components: {
            AppModalLayout
        },
        methods: {
            ...mapActions({
                create: 'tags/create',
                closeAdding: 'modals/closeCreateCardTag'
            }),
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.create(this.form).then(this.closeAdding)
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