<template>
    <q-page>
        <edit-card :id="id" @closed="$router.push({name: 'view_card', params: {id}})"></edit-card>
    </q-page>
</template>
<script>
    import EditCard from '../../components/card/EditCard.vue'

    export default {
        props: {
            id: {
                required: true
            }
        },
        components: {
            EditCard
        }
    }
</script>