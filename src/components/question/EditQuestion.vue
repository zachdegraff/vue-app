<template>
    <q-modal v-model="isOpen"  @hide="closeEditQuestion" class="app-modal" :content-classes="['app-ask-help-content']">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>What are you wondering?</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <form class="row q-pa-xl flex-center" v-if="question">
                <q-field class="col-xs-12" :error="$v.question.$error" :error-label="firstErrorFor($v.question.content)">
                    <q-input ref="field" type="textarea" v-model="question.content" @blur="$v.question.content.$touch" float-label="Type your question"></q-input>
                </q-field>
                <br>
                <q-field class="col-xs-12 q-mt-xl">
                    <q-btn color="primary" label="Submit" @click="submit" :disable="isProcessing"></q-btn>
                </q-field>
            </form>
        </app-modal-layout>
    </q-modal>
</template>

<script>
    import AppModalLayout from '../context/modal/AppModalLayout'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        components: {AppModalLayout},
        data: () => {
            return {
                isOpen: true
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                isProcessing: 'questions/isUpdating',
                question: 'questions/getEditingQuestion'
            })
        },
        mixins: [ValidatorMessages],
        validations: {
            question: {
                content: {
                    required
                },
            },
        },
        methods: {
            ...mapActions({
                update: 'questions/update',
                closeEditQuestion: 'modals/closeEditQuestion',
            }),
            submit() {
                this.$v.question.$touch();
                if (this.$v.question.$error) {
                    return
                }
                this.update(this.question).then(this.closeEditQuestion)
            }
        }
    }
</script>
<style lang="scss">
    .app-modal {
        .app-ask-help-content {
            top: 100px;
            left: 50%;
            max-width: 600px;
            margin: 0 0 100px -300px;
            overflow: visible;
            max-height: none;

            .text-card-name{
                margin-top: 15px;
                margin-left: -24px
            }
        }
    }


    @media (max-width: 767px) {
        .app-modal {
            .app-ask-help-content {
                top: 0;
                left: 0;
                margin: 0;
                overflow: auto;
            }
        }
    }
</style>