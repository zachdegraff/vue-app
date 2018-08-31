<template>
    <q-card class="self-center q-mb-md bg-white">
        <q-list no-border>
            <q-item>
                <q-item-side>
                    <img :src="avatar(item.user.photo)" class="feed-item-avatar"/>
                </q-item-side>
                <q-item-main>
                    <q-item-tile label>
                        {{item.user.fullName}} created <a :href="createViewUrl(item.source)" @click.prevent.stop="showCard(item.source.id)">{{item.source.name}}</a>
                    </q-item-tile>
                    <q-item-tile sublabel>{{toLocaleString(item.createdAt)}}</q-item-tile>
                </q-item-main>
            </q-item>
        </q-list>
    </q-card>
</template>
<script>
    import DateFormatter from '../../mixins/DateFormatter'
    import {mapActions, mapGetters} from 'vuex'
    import {route} from '../../helpers'

    export default {
        props: ['item'],
        mixins: [DateFormatter],
        methods: {
            ...mapActions({
                showCard: 'modals/openCardsEditor'
            }),
            avatar(path) {
                if (!path) {
                    return 'statics/profile.jpg'
                }
                return path
            },
            createViewUrl(card) {
                return route('view_card', {id: card.id})
            }
        }
    }
</script>