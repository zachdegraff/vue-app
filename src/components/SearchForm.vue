<template>
    <div>
        <div class="search-form-container row justify-center">
            <q-search v-model="query" @keyup.enter="submit" class="col-sx-12 col-md-8 bg-white q-pa-md">
                <q-autocomplete separator @search="search" @selected="selected" :min-characters="3"/>
            </q-search>
        </div>
        <view-card :id="card.id" v-if="card" @closed="close"/>
    </div>
</template>
<script>
    import ViewCard from '../components/card/ViewCard.vue'
    import ModalManager from '../mixins/ModalManager'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                query: '',
                card: null
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current'
            }),
        },
        components: {ViewCard},
        created() {
            this.query = this.$route.query.q;
        },
        mixins: [ModalManager],
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
            close() {
                this.closeModalWindow();
                this.card = null
            },
            selected(item) {
                if (item.type === 'collection') {
                    return this.$router.push({name: 'collection_cards', params: {name: item.name}})
                }
                this.openModalWindow('view_card', {id: item.id});
                this.card = item
            },
            params(terms) {
                let params = {terms};
                if (this.team !== null) {
                    params['teamId'] = this.team.id
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