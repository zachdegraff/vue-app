<template>
    <q-modal v-model="isOpen" @hide="redirect" class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Adding a new card</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <div class="row q-py-xl gutter-md flex-center">
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.form.team_id.$error" :error-label="firstErrorFor($v.form.team_id)">
                    <q-select v-model="form.team_id" float-label="Team" :options="options" @change="$v.form.team_id.$touch"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10" :error="$v.form.name.$error" :error-label="firstErrorFor($v.form.name)">
                    <q-input v-model="form.name" float-label="Name" @blur="$v.form.name.$touch"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-input v-model="form.description" type="textarea" float-label="Short Description"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-chips-input v-model="form.shorthand" float-label="Shorthand"/>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <strong>Resources</strong><br/>
                    <q-input v-for="(resource, idx) in form.resources" :key="idx" v-model="resource.content" float-label="Input resource link"/>
                    <q-btn @click="addResource" class="q-mt-sm">Add a new field</q-btn>
                </q-field>
                <q-field class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <strong>Related Concepts</strong><br/>
                    <q-input v-for="(concept, idx) in form.concepts" :key="idx" v-model="concept.content" float-label="Input related concept link "/>
                    <q-btn @click="addConcept" class="q-mt-sm">Add a new field</q-btn>
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
    import CardResource from '../../resources/card/CardResource'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'
    import {CARD_SECTIONS} from "../../consts"

    export default {
        data: () => {
            return {
                form: {
                    team_id: '',
                    name: '',
                    description: '',
                    shorthand: [],
                    resources: [],
                    concepts: []
                },
                options: [],
                isOpen: true
            }
        },
        mixins: [ValidatorMessages],
        computed: {
            ...mapGetters({
                team: 'teams/current',
                isProcessing: 'cards/isCreating'
            })
        },
        components: {
            AppModalLayout
        },
        validations: {
            form: {
                team_id: {
                    required
                },
                name: {
                    required
                }
            }
        },
        created() {
            CardResource.teams().then(({data}) => {
                this.options = data.data.map(team => {
                    if (this.team && this.team.id === team.id) {
                        this.form.team_id = team.id
                    }
                    return {value: team.id, label: team.name}
                })
            })
        },
        methods: {
            ...mapActions({
                create: 'cards/create'
            }),
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.create(this.form).then(this.redirect)
            },
            redirect() {
                this.$router.push({name: 'cards_list'})
            },
            addResource() {
                this.form.resources.push({
                    section: CARD_SECTIONS.RESOURCE,
                    content: ''
                })
            },
            addConcept() {
                this.form.concepts.push({
                    section: CARD_SECTIONS.CONCEPT,
                    content: ''
                })
            }
        }
    }
</script>