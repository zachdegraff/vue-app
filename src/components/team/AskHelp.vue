<template>
    <q-modal v-model="isOpen" @hide="closeAskHelp" class="app-modal" :content-classes="['app-ask-help-content']">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>What are you wondering?</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <form class="row q-pa-xl flex-center">
                <q-field class="col-xs-12" :error="$v.request.$error" :error-label="firstErrorFor($v.request)">
                    <q-input ref="field" type="textarea" v-model="request" @blur="$v.request.$touch" float-label="Your request"></q-input>
                </q-field>
                <div class="col-xs-12 q-mt-md q-body-2">
                    <span v-if="card">Your request will be linked to {{card.name}} and shared with the {{team.name}} team.</span>
                    <span v-if="team && !card">Your request will be shared with the {{team.name}} team.</span>
                </div>
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
                request: '',
                isOpen: true
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                card: 'editor/getActiveCard',
                searchQuery: 'search/getQuery',
                isProcessing: 'questions/isHelpAsking'
            })
        },
        mixins: [ValidatorMessages],
        validations: {
            request: {
                required
            },
        },
        mounted() {
            this.$refs.field.focus()
        },
        methods: {
            ...mapActions({
                askHelp: 'questions/store',
                closeAskHelp: 'modals/closeAskHelp'
            }),
            submit() {
                this.$v.request.$touch();
                if (this.$v.request.$error) {
                    return
                }
                if (this.team === null) {
                    return this.$q.notify('Please, choose team.')
                }
                const params = {
                    id: this.team.id,
                    content: this.request,
                    searchQuery: this.searchQuery
                };
                if (this.card !== undefined) {
                    params['cardId'] = this.card.id
                }
                this.askHelp(params).then(this.closeAskHelp);
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
            .text-card-name {
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