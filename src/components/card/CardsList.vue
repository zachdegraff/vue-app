<template>

    <div class="row gutter-sm cards-list" v-show="items.length > 0">
        <div class="col-xs-8 col-sm-6 col-md-4 col-lg-3" v-for="card in items">
            <a :href="createViewUrl(card)" @click.prevent.stop="showCard(card.id)">
                <q-card class="cards-list-item cursor-pointer self-center">
                    <q-card-media>
                        <img :src="getCardImage(card.thumb)">

                        <q-card-title slot="overlay" v-if="card.thumb">
                            {{card.name}}
                            <span slot="subtitle" v-if="card.shorthand.length"><q-icon name="style" class="q-mr-sm"/><span v-html="shorthand(card.shorthand)"></span></span>
                        </q-card-title>
                        <div class="cards-list-item-title" v-if="!card.thumb">
                            {{card.name}}
                            <div v-if="card.shorthand.length">
                                <q-icon name="style"/>
                                <span v-html="shorthand(card.shorthand)"></span>
                            </div>
                        </div>
                    </q-card-media>
                </q-card>
            </a>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import {route} from '../../helpers'

    export default {
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        methods: {
            ...mapActions({
                showCard: 'modals/openCardsEditor'
            }),
            createViewUrl(card) {
                return route('view_card', {id: card.id})
            },
            shorthand(list) {
                if (list.length === 0) {
                    return '';
                }
                return list.map(i => `<em>${i}</em>`).join(', ')
            },
            getCardImage(path) {
                if (path === null) {
                    return 'statics/blank-card.png'
                }
                return path
            }
        }
    }
</script>
<style lang="scss">
    .cards-list-item-title {
        color: #0c0c0c;
        position: absolute;
        left: 0;
        line-height: 1.5;
        font-size: 16px;
        transform: translateY(-50%);
        text-align: center;
        top: 50%;
        width: 100%;
        div {
            font-size: 14px;
        }
    }

    @media (max-width: 576px) {
        .cards-list {
            justify-content: center;
        }
    }
</style>