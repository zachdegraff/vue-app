<template>
    <q-page>
        <create-card @closed="redirect"></create-card>
    </q-page>
</template>
<script>
    import CreateCard from "../../components/card/CreateCard.vue";

    export default {
        components: {
            CreateCard
        },
        methods: {
            redirect() {
                this.$router.push({name: 'cards_list'})
            }
        }
    }
</script>