<template>
    <q-page>
        <view-card :id="id" @closed="$router.push({name: 'cards_list'})"></view-card>
    </q-page>
</template>
<script>
    import ViewCard from '../../components/card/ViewCard.vue'

    export default {
        props: {
            id: {
                required: true
            }
        },
        components: {
            ViewCard
        }
    }
</script>