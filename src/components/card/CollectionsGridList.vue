<template>
    <div class="row gutter-sm" v-if="items" v-show="items.length > 0">
        <div class="col-xs-6 col-sm-6 col-md-3" v-for="step in columns" :key="step">
            <q-card
                    class="cursor-pointer q-mb-md"
                    v-for="collection in getItemsForStep(step)"
                    :key="collection.id"
                    @click.native="$router.push({name: 'collection_cards', params: {name: collection.name}})">
                <q-card-media>
                    <img src="statics/blank-card.png" />
                    <div class="home-card-title q-title">#{{collection.name}}({{collection.cards}})</div>
                </q-card-media>
            </q-card>
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