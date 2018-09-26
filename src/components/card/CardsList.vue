<template>
    <div class="row gutter-sm cards-list">
       <div class="charArray">
         <span class="bold">Jump To: </span>  <span @click="getClassName(char)" v-bind:class="{ 'bold': Object.keys(items).includes(char) }" v-for="char in charArray">{{char}}</span>
       </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 card-block" v-for="(cards,key) in items">
            <h3 class="letter" v-if="key !== '#'" :class="key">{{key}}</h3>
            <h3 class="letter lastItem" v-if="key == '#'" >{{key}}</h3>
            <div class="cards">
                <div v-for="card in cards">
                    <a v-if="card" :href="createViewUrl(card)" @click.prevent.stop="showCard(card.id)"> {{card.name}} <span v-if="false">(<span v-for="(shorthand, ind) in card.shorthand">{{shorthand}}<span v-if="ind !== card.shorthand.length - 1">, </span> </span>)</span></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {mapActions, mapGetters} from 'vuex'
    import {route} from '../../helpers'
    import VueScrollTo from 'vue-scrollto';
    Vue.use(VueScrollTo);

    export default {
        computed: {
            ...mapGetters({
                charArray: 'cards/getCharArray',
            }),
        },
        props: {
            items: {
                required: true
            }
        },
        methods: {
            ...mapActions({
                showCard: 'modals/openCardsEditor'
            }),
            getClassName(char){
                if(char === '#'){
                    VueScrollTo.scrollTo('.lastItem');
                }else{
                    VueScrollTo.scrollTo('.'+char);
                }
            },
            createViewUrl(card) {
                if(card)
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
        width: 50px;
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
        margin-left: 80px;
        line-height: 30px;
    }
    .card-block{
        position: relative;
        margin-top: 20px;
    }
    .cards div a:hover{
        color:#006400;
    }
    .charArray{
        text-transform: uppercase;
    }
    .charArray span{
        padding-right: 10px;
        color: #d0d1d2;
        font-size: 18px;
        cursor: not-allowed;
    }
    .bold{
        font-weight: bold;
        cursor: pointer !important;
        color: #95989D !important;
    }
</style>