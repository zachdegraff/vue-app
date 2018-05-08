<template>
    <q-page>
        <search-form></search-form>
        <div class="row flex-center">
            <div class="q-mt-lg">
                <q-btn color="primary" @click="$router.push({name: 'cards_list'})">My Cards</q-btn>
            </div>
        </div>
    </q-page>
</template>

<script>
    import SearchForm from '../components/SearchForm.vue'

    export default {
        data: () => {
            return {}
        },
        components: {
            SearchForm
        },
        methods: {}
    }
</script>