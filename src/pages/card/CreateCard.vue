<template>
    <q-modal v-model="isOpen" @hide="redirect" class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <app-modal-layout v-if="model">
            <q-toolbar slot="header">
                <q-toolbar-title>Adding a new card</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <div class="row q-py-xl gutter-md flex-center">
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-input v-model="model.name" float-label="Name"/>
                </div>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-input v-model="model.description" type="textarea" float-label="Short Description"/>
                </div>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-chips-input v-model="model.shorthand" float-label="Shorthand"/>
                </div>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <strong>Resources</strong><br/>
                    <q-input v-for="(resource, idx) in model.resources" :key="idx" v-model="resource.content" float-label="Resource"/>
                    <q-btn @click="addResource" class="q-mt-sm">Add a new field</q-btn>
                </div>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <strong>Related Concepts</strong><br/>
                    <q-input v-for="(concept, idx) in model.concepts" :key="idx" v-model="concept.content" float-label="Related Concept"/>
                    <q-btn @click="addConcept" class="q-mt-sm">Add a new field</q-btn>
                </div>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-btn @click="save" color="primary" class="q-mt-lg" :disable="isProcessing">create</q-btn>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import {mapActions, mapGetters} from 'vuex'
    import {CARD_SECTIONS} from "../../consts"
    import {notify} from "../../helpers"

    export default {
        data: () => {
            return {
                model: {
                    name: '',
                    description: '',
                    shorthand: [],
                    resources: [],
                    concepts: []
                },
                isOpen: true
            }
        },
        computed: {
            ...mapGetters({
                isProcessing: 'cards/isCreating'
            })
        },
        components: {
            AppModalLayout
        },
        methods: {
            ...mapActions({
                create: 'cards/create'
            }),
            save() {
                this.create(this.model).then(this.redirect)
            },
            redirect() {
                this.$router.push({name: 'cards_list'})
            },
            addResource() {
                this.model.resources.push({
                    section: CARD_SECTIONS.RESOURCE,
                    content: ''
                })
            },
            addConcept() {
                this.model.concepts.push({
                    section: CARD_SECTIONS.CONCEPT,
                    content: ''
                })
            }
        }
    }
</script>