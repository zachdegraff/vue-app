<template>
    <q-modal :value="isOpen" class="app-modal" :content-classes="['app-modal-content']" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
        <app-modal-layout v-if="model">
            <q-toolbar slot="header">
                <q-toolbar-title>Editing {{model.name}}</q-toolbar-title>
                <q-btn flat icon="close" @click="redirect" class="float-right"/>
            </q-toolbar>
            <div class="row q-py-xl gutter-md flex-center">
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-input v-model="model.name" float-label="Name"/>
                </div>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-input v-model="model.description" type="textarea" float-label="Short Description"/>
                </div>
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-chips-input v-model="model.shorthands" float-label="Shorthands"/>
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
                    <q-btn @click="save" color="primary" class="q-mt-lg" :disable="isProcessing">SAVE</q-btn>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import CardResource from '../../resources/card/CardResource';
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import {CARD_SECTIONS} from "../../consts";
    import {notify} from "../../helpers";

    export default {
        props: {
            id: {
                required: true
            }
        },
        data: () => {
            return {
                model: null,
                isProcessing: false
            }
        },
        created() {
            this.load()
        },
        computed: {
            isOpen() {
                return this.model !== null
            }
        },
        components: {
            AppModalLayout
        },
        methods: {
            load() {
                const item = this.$store.getters['cards/getItemById'](this.id);
                if (null !== item) {
                    return this.model = item
                }
                CardResource.get(this.id).then(({data}) => this.model = data.data)
            },
            save() {
                this.isProcessing = true;
                CardResource.update(this.id, this.model).then(({data}) => {
                    notify(data.message);
                    this.isProcessing = false;
                    this.$store.commit('cards/replace', data.card);
                    this.redirect()
                }).catch(() => this.isProcessing = false)
            },
            redirect() {
                this.$router.push({name: 'view_card', params: {id: this.id}})
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