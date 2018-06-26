<template>
    <div>
        <div class="search-form-container row justify-center">
            <q-search v-model.lazy="query" @keyup.enter="submit" class="col-sx-12 col-md-8 bg-white q-pa-md">
                <q-autocomplete separator @search="search" @selected="selected" :min-characters="2"/>
            </q-search>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                query: ''
            }
        },
        computed: {
            ...mapGetters({
                searchQuery: 'search/getQuery'
            }),
        },
        created() {
            this.query = this.searchQuery;
            if (this.$route.query.q !== undefined) {
                this.query = this.$route.query.q;
            }
        },
        watch: {
            query: function (val) {
                this.changeQuery(val)
            }
        },
        methods: {
            ...mapActions({
                hints: 'search/hints',
                showCard: 'modals/openViewCard',
                changeQuery: 'search/changeQuery'
            }),
            submit() {
                this.$router.push({name: 'search_cards', query: {q: this.query}})
            },
            search(terms, done) {
                this.hints({terms}).then(items => {
                    const result = items.map(item => {
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
                if (item.type === 'collection') {
                    return this.$router.push({name: 'collection_cards', params: {name: item.name}})
                }
                this.showCard(item.id)
            },
        }
    }
</script>
<style lang="scss">
    .search-form-container {
        background: #36cb77;
        padding: 100px 0;
        position: relative;
    }
</style>