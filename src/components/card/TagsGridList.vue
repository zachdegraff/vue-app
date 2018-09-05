<template>
    <div class="row gutter-sm" v-if="items" v-show="items.length > 0">
        <div class="col-xs-9 col-sm-6 col-md-3" v-for="tag in items" :key="tag.id">
            <q-card class="tags-item cursor-pointer q-mb-md relative-position">
                <q-btn flat icon="more_vert" class="tags-item-menu">
                    <q-popover>
                        <q-list link class="no-border">
                            <q-item @click.native="edit(tag)" v-close-overlay>
                                <q-item-main label="Edit Tag"/>
                            </q-item>
                        </q-list>
                    </q-popover>
                </q-btn>
                <q-card-media @click.native="$router.push({name: 'tag_cards', params: {name: tag.name}})">
                    <img src="statics/blank-card.png"/>
                    <div class="tags-item-title q-pa-sm">{{tag.name}} ({{tag.cards}})</div>
                </q-card-media>
            </q-card>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        props: {
            items: {
                type: Array,
                required: true
            },
        },
        methods: {
            ...mapActions({
                edit: 'tags/edit'
            })
        }
    }
</script>
<style lang="scss">
    .tags-item {
        &:hover {
            .tags-item-menu {
                display: block;
            }
        }
    }

    .tags-item-title {
        color: #0c0c0c;
        position: absolute;
        left: 0;
        line-height: 1.5;
        font-size: 16px;
        transform: translateY(-50%);
        text-align: center;
        top: 50%;
        width: 100%;
    }

    .tags-item-menu {
        display: none;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 100;
    }
</style>