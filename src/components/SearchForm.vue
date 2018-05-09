<template>
    <div class="search-form-container row justify-center bg-blue-3">
        <q-search v-model="query" @keyup.enter="submit" class="col-sx-12 col-md-8 bg-white q-pa-md">
            <q-autocomplete separator @search="search" @selected="selected" :min-characters="3"/>
        </q-search>
    </div>
</template>
<script>
    import CardResource from '../resources/card/CardResource'

    export default {
        data: () => {
            return {
                query: ''
            }
        },
        created() {
            this.query = this.$route.query.q;
        },
        methods: {
            submit() {
                this.$router.push({name: 'search_cards', query: {q: this.query}})
            },
            search(terms, done) {
                CardResource.hints(terms).then(({data}) => {
                    const result = data.map(item => {
                        return {
                            ...item,
                            label: item.name,
                            value: item.name
                        };
                    });
                    done(result);
                }).catch(() => done([]));
            },
            selected(item) {
                this.$router.push({name: 'view_card', params: {id: item.id}})
            }
        }
    }
</script>
<style lang="scss">
    .search-form-container {
        padding: 100px 0;
        position: relative;
    }
</style>