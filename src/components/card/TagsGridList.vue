<template>
    <div class="row flex-center gutter-sm" v-if="items" v-show="items.length > 0">
        <div class="col-xs-9 col-sm-6 col-md-3" v-for="tag in items" :key="tag.id">
            <q-card
                    class="cursor-pointer q-mb-md"
                    @click.native="$router.push({name: 'tag_cards', params: {name: tag.name}})">
                <q-card-media>
                    <img src="statics/blank-card.png" />
                    <div class="tags-item-title q-title">#{{tag.name}} ({{tag.cards}})</div>
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
        }
    }
</script>
<style lang="scss">
    .tags-item-title {
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