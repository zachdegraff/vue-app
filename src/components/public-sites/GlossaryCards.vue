<template>
    <div class="row gutter-sm">
        <div class="glossary-alphabet">
            <div class="jump-to q-body-1 q-my-xs">Jump to...</div>
            <span :class="{'active-letter': Object.keys(cards).includes(char) }" v-for="char in chars" v-scroll-to="{el:`.char${char.charCodeAt(0)}`}">{{char}}</span>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 glossary-card-block" v-for="(list, key) in cards">
            <h3 class="glossary-letter" :class="`char${key.charCodeAt(0)}`" :style="{color: letterColor, 'border-color': letterColor}">{{key}}</h3>
            <div class="glossary-cards">
                <div v-for="card in list">
                    <router-link :to="`/for/${site.slug}/${card.id}`">
                        {{card.name}}
                        <span v-if="card.shorthand.length" v-html="shorthand(card.shorthand)"/>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    import {route} from '../../helpers'

    export default {
        props: {
            site: {
                required: true,
                type: Object
            },
            items: {
                required: true,
                type: Array
            },
            letterColor: {
                type: String
            }
        },
        computed: {
            chars() {
                let a = [], i = 'a'.charCodeAt(0), j = 'z'.charCodeAt(0);
                for (; i <= j; ++i) {
                    a.push(String.fromCharCode(i));
                }
                a.push("#");
                return a;
            },
            cards() {
                const result = {}, other = [], items = this.items.sort((a, b) => {
                    return ('' + a.name.toLowerCase()).localeCompare(b.name.toLowerCase())
                });

                items.forEach(item => {
                    let letter = item.name.charAt(0).toLocaleLowerCase();
                    if (!letter.match(/[a-z]/)) {
                        return other.push(item);
                    }
                    if (result[letter] === undefined) {
                        result[letter] = []
                    }
                    result[letter].push(item)
                });
                if (other.length > 0) {
                    result['#'] = other
                }
                return result
            }
        },
        methods: {
            shorthand(list) {
                if (list.length === 0) {
                    return '';
                }
                return '(' + list.map(i => `<em>${i}</em>`).join(', ') + ')'
            }
        }
    }
</script>
<style lang="scss">
    .glossary-letter {
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

    .glossary-cards {
        display: inline-block;
        margin-left: 80px;
        line-height: 30px;
        a {
            text-decoration: none;
            color: #95989D;
            font-size: 17px;
            display: block;
        }
    }

    .glossary-card-block {
        position: relative;
        margin-top: 20px;
    }

    .glossary-alphabet {
        text-transform: uppercase;
        span {
            padding-right: 10px;
            color: #d0d1d2;
            font-size: 18px;
            cursor: default;
            display: inline-block;
        }
    }

    .active-letter {
        font-weight: bold;
        cursor: pointer !important;
        color: #95989D !important;
    }

    .jump-to {
        display: block;
        color: #95989D !important;
        width: 95px !important;
        text-transform: none;
    }
</style>