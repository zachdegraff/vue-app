<template>
    <div>
        <q-page>
            <search-form></search-form>
            <div class="row flex-center">
                <div class="col-xs-12 col-sm-8">
                    <div class="row q-my-lg" v-show="items.length > 0">
                        <div class="col q-headline">#{{tag}} tag</div>
                    </div>
                    <cards-list :items="items"/>
                </div>
            </div>
            <div class="row flex-center q-mt-lg">
                <q-spinner :size="36" color="red" v-show="isLoading"></q-spinner>
            </div>
        </q-page>

    </div>
</template>
<script>
    import SearchForm from '../../components/SearchForm.vue'
    import CardsList from '../../components/card/CardsList'
    import {mapActions, mapGetters} from 'vuex'
    import {prop} from '../../helpers'


    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current',
                items: 'cards/getItems',
                isLoading: 'cards/isCardsLoading'
            }),
            tag() {
                return this.$route.params.name
            },
            title() {
                return `${this.tag} - ${prop(this.team, 'name')} - Wonderus`;
            }
        },
        components: {CardsList, SearchForm},
        watch: {
            team: function (val) {
                this.filter(this.params());
                document.title = this.title;
            }
        },
        created() {
            this.filter(this.params());
            document.title = this.title;
            this.changeQuery('#' + this.tag)
        },
        methods: {
            ...mapActions({
                filter: 'cards/all',
                changeQuery: 'search/changeQuery'
            }),
            params() {
                return {tag: this.tag};
            }
        }
    }
</script>
<style lang="scss">
    .list-card-title {
        position: absolute;
        color: #0c0c0c;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        text-align: center;
    }
</style>