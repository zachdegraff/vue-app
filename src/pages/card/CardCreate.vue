<template>
    <transition name="modal-page">
        <div class="modal-page row flex-center">
            <div class="modal-page-overlay"></div>
            <div class="modal-page-content">
                <div class="q-layout-header">
                    <q-toolbar>
                        <q-toolbar-title>Adding a new card</q-toolbar-title>
                        <q-btn flat icon="close" @click="$router.go(-1)" class="float-right"/>
                    </q-toolbar>
                </div>
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
                        <q-btn @click="save" color="primary" class="q-mt-lg" :disable="isProcessing">create</q-btn>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import CardResource from '../../resources/card/CardResource';
    import {CARD_SECTIONS} from "../../consts";
    import {notify} from "../../helpers";

    export default {
        data: () => {
            return {
                model: {
                    name: '',
                    description: '',
                    shorthands: [],
                    resources: [],
                    concepts: []
                },
                isProcessing: false
            }
        },
        methods: {
            save() {
                this.isProcessing = true;
                CardResource.create(this.model).then(({data}) => {
                    notify(data.message);
                    this.isProcessing = false;
                    this.$store.commit('cards/replace', data.card);
                    this.$router.go(-1);
                }).catch(() => this.isProcessing = false)
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