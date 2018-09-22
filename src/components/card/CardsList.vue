<template>
    <div class="row gutter-sm cards-list">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 card-block" v-for="(cards,key) in items">
            <h3 class="letter">{{key}}</h3>
            <div class="cards">
                <div v-for="card in cards">
                    <a :href="createViewUrl(card)" @click.prevent.stop="showCard(card.id)"> {{card.name}} <span v-if="card.shorthand[0]">(<span v-for="(shorthand, index) in card.shorthand">{{shorthand}}<span v-if="index !== shorthand.length">, </span> </span>)</span></a>
                </div>
            </div>
            <!--<a :href="createViewUrl(card)" @click.prevent.stop="showCard(card.id)">-->
                <!--<q-card class="cards-list-item cursor-pointer self-center">-->
                    <!--<q-card-media>-->
                        <!--<img :src="getCardImage(card.thumb)">-->

                        <!--<q-card-title slot="overlay" v-if="card.thumb">-->
                            <!--{{card.name}}-->
                            <!--<span slot="subtitle" v-if="card.shorthand.length"><q-icon name="style" class="q-mr-sm"/><span v-html="shorthand(card.shorthand)"></span></span>-->
                        <!--</q-card-title>-->
                        <!--<div class="cards-list-item-title" v-if="!card.thumb">-->
                            <!--{{card.name}}-->
                            <!--<div v-if="card.shorthand.length">-->
                                <!--<q-icon name="style"/>-->
                                <!--<span v-html="shorthand(card.shorthand)"></span>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</q-card-media>-->
                <!--</q-card>-->
            <!--</a>-->
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import {route} from '../../helpers'

    export default {
        props: {
            items: {
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
    .letter{
        width: 5%;
        text-transform: uppercase;
        color: #5AD08E;
        border: 1px #5AD08E solid;
        border-radius: 100%;
        text-align: center;
        display: inline-block;
        position: absolute;
        margin: 5px;
    }
    .cards a{
        text-decoration: none;
        color: #95989D;
        font-size: 17px;
        display: block;
    }
    .cards{
        display: inline-block;
        margin-left: 10%;
        line-height: 30px;
    }
    .card-block{
        position: relative;
        margin-top: 20px;
    }
    .cards div a:hover{
        color:#006400;
    }
</style>