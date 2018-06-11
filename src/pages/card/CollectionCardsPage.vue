<template>
    <div>
        <q-page>
            <search-form></search-form>
            <div class="row flex-center">
                <div class="col-xs-12 col-sm-8">
                    <div class="row q-my-lg" v-show="items.length > 0">
                        <div class="col q-headline">#{{collection}} collection</div>
                    </div>
                    <div class="row gutter-sm" v-show="items.length > 0">
                        <div class="col-xs-12 col-sm-6 col-lg-3" v-for="card in items">
                            <q-card class="cursor-pointer" @click.native="showCard(card.id)">
                                <q-card-media>
                                    <img :src="getCardImage(card.thumb)">

                                    <q-card-title slot="overlay" v-if="card.thumb">{{card.name}}</q-card-title>
                                    <div class="list-card-title q-title" v-if="!card.thumb">{{card.name}}</div>
                                </q-card-media>
                            </q-card>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row flex-center q-mt-lg">
                <q-spinner :size="36" color="red" v-show="isLoading"></q-spinner>
            </div>
        </q-page>

    </div>
</template>
<script>
    import ViewCard from '../../components/card/ViewCard.vue'
    import SearchForm from '../../components/SearchForm.vue'
    import {mapActions, mapGetters} from 'vuex'
    import {prop} from "../../helpers";

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current',
                items: 'cards/getItems',
                isLoading: 'cards/isCardsLoading'
            }),
            title() {
                return `${this.collection} - ${prop(this.team, 'name')} - Wonderus`;
            },
            collection() {
                return this.$route.params.name
            }
        },
        components: {SearchForm, ViewCard},
        watch: {
            team: function (val) {
                this.filter(this.params());
                document.title = this.title;
            }
        },
        created() {
            this.filter(this.params());
            document.title = this.title;
            this.changeQuery('#' + this.collection)
        },
        methods: {
            ...mapActions({
                filter: 'cards/all',
                showCard: 'modals/openViewCard',
                changeQuery: 'search/changeQuery'
            }),
            params() {
                return {collection: this.collection};
            },
            getCardImage(path) {
                if (path === null) {
                    return 'statics/blank-card.png'
                }
                return path
            },
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