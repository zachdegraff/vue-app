<template>
    <carousel
            :per-page="3"
            :pagination-enabled="false"
            :navigation-enabled="cards.length > 3"
            :navigation-next-label="next"
            :navigation-prev-label="prev">
        <slide v-for="card in cards" :key="card.id">
            <div class="public-site-cards-item" :style="cover(card)" @click="open">
                <div class="public-site-cards-item-title" :style="accentColor" :class="{bottom: card.image}">
                    <div class="public-site-cards-item-title-name">{{card.name}}</div>
                    <div class="public-site-cards-item-title-shorthand">
                        {{card.shorthand.join(', ')}}
                    </div>
                </div>
                <div @click.native="handleClicks" v-show="!card.image" class="public-site-cards-item-content">
                    <div v-html="convertLinks(card)"/>
                </div>
                <i v-show="!card.image"></i>
            </div>
        </slide>
    </carousel>
</template>
<script>
    import PublicSiteLinks from '../../mixins/PublicSiteLinks'

    export default {
        props: {
            site: {
                type: Object,
                required: true
            },
            cards: {
                type: Array,
                required: true
            }
        },
        data: () => {
            return {
                prev: '<i class="q-icon material-icons">chevron_left</i>',
                next: '<i class="q-icon material-icons">chevron_right</i>'
            }
        },
        computed: {
            link() {
                return this.$route.params.name
            },
            accentColor() {
                if (!this.site) return {};

                return {background: this.site.accentColor}
            }
        },
        mixins: [PublicSiteLinks],
        methods: {
            open(card) {
                return this.$router.push(`/for/${site.slug}/${card.id}`)
            },
            cover(card) {
                if (card.image) {
                    return {
                        'background': `url(${card.image})`,
                        'background-size': 'cover'
                    }
                }
                return {}
            }
        }
    }
</script>
<style>
    .public-site-cards-item {
        border-radius: 10px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
        cursor: pointer;
        padding-bottom: 15px;
        margin: 5px 17px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        width: 285px;
        height: 230px;
    }

    .public-site-cards-item-title {
        padding: 10px 15px;

    }

    .public-site-cards-item-title.bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .public-site-cards-item-title-name {
        font-size: 18px;
    }

    .public-site-cards-item-title-shorthand {
        font-size: 13px;
    }

    .public-site-cards-item-content {
        padding: 15px;
        font-size: 12px;
        overflow: hidden;
    }

    .public-site-cards-item > i {
        position: absolute;
        bottom: 15px;
        left: 0;
        right: 0;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(247, 247, 247, 1));;
        display: block;
        height: 30px;
    }

    .VueCarousel-navigation-button {
        font-size: 40px;
        outline: 0;
    }
</style>