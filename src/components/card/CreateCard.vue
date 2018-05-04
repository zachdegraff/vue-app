<template>
    <div class="row layout-padding gutter-md">
        <div class="col-md-8">
            <q-input v-model="name" float-label="Name"/>
        </div>
        <div class="col-md-8">
            <q-input v-model="description" type="textarea" float-label="Short Description"/>
        </div>
        <div class="col-md-8">
            <q-chips-input v-model="tags" float-label="Shorthands"/>
        </div>
        <div class="col-md-8">
            <strong>Resources</strong><br/>
            <q-input v-for="(res, idx) in resources" :key="idx" :value="res" float-label="Resource"/>
            <q-btn @click="addResourceField" class="q-mt-sm">Add a new field</q-btn>
        </div>
        <div class="col-md-8">
            <strong>Related Concepts</strong><br/>
            <q-input v-for="(concept, idx) in concepts" :key="idx" :value="concept" float-label="Related Concept"/>
            <q-btn @click="addConceptField" class="q-mt-sm">Add a new field</q-btn>
        </div>
        <div class="col-md-8">
            <q-btn @click="$emit('saved')" color="primary" class="q-mt-lg">CREATE</q-btn>
        </div>
    </div>
</template>
<script>
    export default {
        data: () => {
            return {
                name: '',
                description: '',
                tags: [],
                resources: [],
                concepts: []
            }
        },
        methods: {
            addConceptField() {
                this.concepts.push('')
            },
            addResourceField() {
                this.resources.push('')
            }
        }
    }

</script>