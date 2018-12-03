<template>
    <div>
        <q-card class="full-width q-ma-md" v-for="card in cards" :key="card.id">
            <q-card-title>
                <router-link :to="`/for/${site.slug}/${card.id}`">{{card.name}}</router-link>
                <span slot="subtitle">{{card.shorthand.join(', ')}}</span>
            </q-card-title>
            <q-card-main class="relative-position" @click.native="handleClicks">
                <div v-html="convertLinks(card)" class="public-site-cards-item-content"/>
                <i></i>
            </q-card-main>
        </q-card>
    </div>
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
        computed: {
            link() {
                return this.$route.params.name
            }
        },
        mixins: [PublicSiteLinks]
    }
</script>
<style>
    .public-site-cards-item-content {
        position: relative;
        height: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .public-site-cards-item-content + i {
        position: absolute;
        bottom: 16px;
        left: 0;
        right: 0;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(247, 247, 247, 1));;
        display: block;
        height: 30px;
    }
</style>