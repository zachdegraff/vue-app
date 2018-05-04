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
            <q-btn @click="$emit('change', 'view-card')" color="primary" class="q-mt-lg">SAVE</q-btn>
        </div>

    </div>
</template>
<script>
    export default {
        data: () => {
            return {
                name: 'Anxiety Disorders Interview Schedule',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at sagittis ligula. Aliquam nec nunc diam. Nulla gravida nibh in mi posuere, sed sollicitudin purus consequat. Donec dignissim nibh tortor. Aenean quis feugiat dolor, ac molestie lectus. Cras accumsan elit est, non dapibus nibh aliquam vel. Suspendisse pellentesque, purus sed dictum lacinia, dolor quam varius nibh, non placerat arcu quam eu metus. Mauris quis consectetur justo. Fusce interdum sodales sodales. Phasellus imperdiet sit amet dolor in malesuada. Maecenas leo velit, fringilla non egestas nec, luctus sit amet massa. Praesent a sem nec arcu fringilla mattis.\n' +
                'Fusce quam ex, luctus consequat quam tempor, commodo tempor augue. Sed vel justo dui. Etiam vitae scelerisque nulla, eu rhoncus arcu. Nunc ut nisl et nulla mattis scelerisque. Mauris finibus orci neque, non hendrerit libero molestie fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lobortis dignissim massa ac mollis.\n' +
                'Nullam a odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget facilisis ipsum. Phasellus fringilla imperdiet sollicitudin. Praesent eget feugiat sapien, eu ullamcorper nulla. Vestibulum eu blandit lacus. Integer quis sem sed ex commodo consequat sit amet vel purus. Aliquam erat volutpat. Nullam maximus varius sem ac feugiat. Proin accumsan elit eu est sodales ultrices. Curabitur fringilla massa at risus ornare lobortis mattis tincidunt elit. Cras tempor dignissim tincidunt. Phasellus turpis ex, rutrum vulputate sagittis et, pellentesque in erat. Cras sed nisl a libero mattis ultrices ornare vitae arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam non neque sed lectus ultricies imperdiet.',
                tags: ['ADIS', 'ADIS'],
                resources: ['https://www.google.com/', 'https://analytics.google.com/analytics/web/'],
                concepts: ['https://www.wikipedia.org/']
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