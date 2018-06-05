<template>
    <div class="row" v-if="items" v-show="items.length > 0">
        <div class="col-xs-6 col-sm-6 col-md-3 q-mb-md" v-for="step in columns" :key="step">
            <router-link
                    class="home-collections-item"
                    v-for="collection in getItemsForStep(step)"
                    :to="{name: 'collection_cards', params: {name: collection.name}}"
                    :key="collection.id"
            >#{{collection.name}}({{collection.cards}})
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            items: {
                type: Array,
                required: true
            },
        },
        data: () => {
            return {
                columns: 4
            }
        },
        methods: {
            getItemsForStep(step) {
                const itemsPerStep = Math.ceil(this.items.length / this.columns),
                    startStepIndex = itemsPerStep * (step - 1);

                if (startStepIndex > this.items.length) {
                    return []
                }
                return this.items.slice(startStepIndex, startStepIndex + itemsPerStep);
            }
        }
    }
</script>
<style lang="scss">
    .home-collections-item {
        display: block;
        padding: 5px 0;
    }
</style>