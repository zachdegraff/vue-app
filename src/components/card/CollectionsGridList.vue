<template>
    <div class="row gutter-sm" v-if="items" v-show="items.length > 0">
        <div class="col-xs-6 col-sm-6 col-md-3" v-for="collection in items" :key="collection.id">
            <q-card
                    class="cursor-pointer q-mb-md"
                    @click.native="$router.push({name: 'collection_cards', params: {name: collection.name}})">
                <q-card-media>
                    <img src="statics/blank-card.png" />
                    <div class="collections-item-title q-title">#{{collection.name}} ({{collection.cards}})</div>
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
    .collections-item-title {
        color: #0c0c0c;
        position: absolute;
        left: 0;
        line-height: 1.5;
        transform: translateY(-50%);
        text-align: center;
        top: 50%;
        width: 100%;
    }
</style>