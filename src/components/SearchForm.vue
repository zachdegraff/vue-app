<template>
    <div class="search-form-container row justify-center">
        <q-search v-model="query" @keyup.enter="submit" class="col-sx-12 col-md-8 bg-white q-pa-md">
            <q-autocomplete separator @search="search" @selected="selected" :min-characters="3"/>
        </q-search>
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
                team: 'teams/current'
            }),
        },
        created() {
            this.query = this.$route.query.q;
        },
        methods: {
            ...mapActions({
                hints: 'cards/hints'
            }),
            submit() {
                this.$router.push({name: 'search_cards', query: {q: this.query}})
            },
            search(terms, done) {
                this.hints(this.params(terms)).then(items => {
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
                this.$router.push({name: 'view_card', params: {id: item.id}})
            },
            params(terms) {
                let params = {terms};
                if (this.team !== null) {
                    params['team_id'] = this.team.id
                }
                return params
            }
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