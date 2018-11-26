<template>
    <div>
        <q-card class="full-width q-ma-md" v-for="card in cards" :key="card.id">
            <q-card-title>
                <router-link :to="`/for/${site.slug}/${card.id}`" :style="accentColor">{{card.name}}</router-link>
                <span slot="subtitle">{{card.shorthand.join(', ')}}</span>
            </q-card-title>
            <q-card-main v-html="filterDescription(card)"/>
        </q-card>
    </div>
</template>
<script>
    import {strip_tags} from '../../helpers'

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
            accentColor() {
                if (this.site.accentColor) {
                    return {color: this.site.accentColor}
                }
                return {}
            }
        },
        methods: {
            convertLinks(content) {
                return content.replace(/\/(cards|glossary)\/([0-9]+)/g, `/for/${this.link}/$2`)
            },
            filterDescription(card) {
                let content = strip_tags(card.description).substring(0, 500);
                if (card.description.length > 500) {
                    content += '...'
                }

                return this.convertLinks(content)
            }
        }
    }
</script>