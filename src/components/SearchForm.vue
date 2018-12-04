<template>
    <div class="search-form">
        <q-search no-icon v-model.lazy="query" @keyup.enter="submit" :placeholder="placeholder" class="q-pa-sm">
            <q-autocomplete separator @search="search" @selected="selected" :min-characters="1"/>
            <i aria-hidden="true" class="q-icon q-if-control material-icons" @click="submit">search</i>
        </q-search>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import {router} from 'vue-router'

    export default {
        data: () => {
            return {
                query: ''
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                searchQuery: 'search/getQuery'
            }),
            placeholder() {
                if (this.team) {
                    return `Search ${this.team.name}`
                }
                return 'Search'
            }
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
                showCard: 'modals/openCardsEditor',
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
                if (item.type === 'tag') {
                    return this.$router.push({name: 'tag_cards', params: {name: item.name}})
                }
                this.showCard(item.id)
            },
        }
    }
</script>
<style lang="scss">
    .search-form {
        float: left;
        position: relative;
        z-index: 101;
        .q-input-target {
            font-size: .9rem;
            min-width: 250px;
        }
    }
</style>