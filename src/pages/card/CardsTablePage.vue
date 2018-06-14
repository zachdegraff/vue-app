<template>
    <q-page>
        <search-form></search-form>
        <div class="row flex-center">
            <div class="col-xs-12 col-sm-8">
                <div class="row gutter-sm">
                    <div class="col">
                        <q-table
                                :title="title"
                                :data="items"
                                :columns="table.columns"
                                :visible-columns="table.visible"
                                :pagination.sync="table.pagination"
                                :filter="filter.name"
                                row-key="id"
                                :loading="isCardsLoading"
                                class="q-mt-xl">

                            <tr slot="header" slot-scope="props">
                                <q-th key="name" :props="props">
                                    <q-input v-model.lazy="filter.name" float-label="Card Name" class="q-mb-md" style="display: inline-block"/>
                                </q-th>
                                <q-th key="shorthand" :props="props">
                                    <q-input v-model.lazy="filter.shorthand" float-label="Shorthand" class="q-mb-md" style="display: inline-block"/>
                                </q-th>
                                <q-th key="description" :props="props">
                                    <br/>
                                    Description
                                </q-th>
                                <q-th key="collections" :props="props">
                                    <q-select v-model="filter.collection" :options="options" float-label=" " class="q-mb-md"/>
                                </q-th>
                            </tr>


                            <q-td slot="body-cell-name" slot-scope="props" :props="props">
                                <a :href="createViewUrl(props.row)" @click.prevent.stop="showCard(props.row.id)">{{props.value}}</a>
                            </q-td>
                            <q-td slot="body-cell-shorthand" slot-scope="props" :props="props" style="max-width: 200px;white-space: normal">
                                <q-chip v-for="(tag, idx) in props.value" :key="idx" small color="primary" class="q-ma-xs">{{tag}}</q-chip>
                            </q-td>
                            <q-td slot="body-cell-description" slot-scope="props" :props="props" style="max-width: 500px;white-space: normal">
                                <p v-html="replaceNewLines(props.value)"></p>
                            </q-td>
                            <q-td slot="body-cell-collections" slot-scope="props" :props="props" style="max-width: 300px;white-space: normal">
                                <q-chip v-for="(col, idx) in props.value" :key="idx" small square color="faded" class="q-ma-xs">#{{col.name}}</q-chip>
                            </q-td>
                        </q-table>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>
<script>
    import SearchForm from '../../components/SearchForm.vue'
    import {mapActions, mapGetters} from 'vuex'
    import {route} from '../../helpers'

    export default {
        data: () => ({
            items: [],
            filter: {
                name: '',
                shorthand: '',
                collection: ''
            },
            options: [],
            table: {
                visible: [
                    'name', 'shorthand', 'description', 'collections'
                ],
                columns: [
                    {
                        name: 'id',
                        label: 'ID',
                        field: 'id',
                    },
                    {
                        name: 'name',
                        required: true,
                        label: 'Card Name',
                        align: 'left',
                        field: 'name',
                        sortable: true,
                    },
                    {
                        name: 'shorthand',
                        required: true,
                        label: 'Shorthand',
                        align: 'left',
                        field: 'shorthand',
                        sortable: true,
                        sort: (a, b) => a.length - b.length
                    },
                    {
                        name: 'description',
                        label: 'Card Description',
                        field: 'description',
                        align: 'left'
                    },
                    {
                        name: 'collections',
                        label: 'Collections',
                        field: 'collections',
                        align: 'left',
                        sort: (a, b) => a.length - b.length
                    },
                ],
                pagination: {
                    page: 1,
                    rowsPerPage: 100,
                    sortBy: 'name',
                    descending: false
                }
            },

        }),
        computed: {
            ...mapGetters({
                team: 'teams/current',
                cards: 'cards/getItems',
                collections: 'collections/all',
                isCardsLoading: 'cards/isCardsLoading',
                getFilteredItems: 'cards/getFilteredItems'
            }),
            title() {
                if (this.team !== null) {
                    return `${this.team.name}'s Cards`
                }
                return 'All Cards'
            }
        },
        watch: {
            'filter.name': function (val) {
                this.items = this.getFilteredItems(this.filter)
            },
            'filter.shorthand': function (val) {
                this.items = this.getFilteredItems(this.filter)
            },
            'filter.collection': function (val) {
                this.items = this.getFilteredItems(this.filter)
            },
            cards: function (val) {
                this.items = this.getFilteredItems(this.filter)
            },
            team: function (val) {
                if (val !== null) {
                    this.load();
                }
            },
            collections: function (val) {
                this.fillOptions(val)
            },
        },
        components: {SearchForm},
        created() {
            this.load();
            document.title = this.title;
            this.fillOptions(this.collections);
        },
        methods: {
            ...mapActions({
                load: 'cards/all',
                showCard: 'modals/openViewCard',
            }),
            fillOptions(collections) {
                this.options.push({value: '', label: 'Collections'});

                collections.forEach(item => {
                    if (item.cards > 0) {
                        this.options.push({value: item.id, label: item.name})
                    }
                })
            },
            createViewUrl(card) {
                return route('view_card', {id: card.id})
            },
            replaceNewLines(value) {
                if (value === null) return '';

                return value.replace(/\n/g, '<br/>')
            }
        }
    }

</script>