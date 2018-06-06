<template>
    <div>
        <q-page>
            <search-form></search-form>
            <div class="row flex-center">
                <div class="col-xs-12 col-sm-8">
                    <div class="row q-my-lg" v-show="items.length > 0">
                        <div class="col q-headline">{{team ? team.name : ''}} cards</div>
                    </div>
                    <div class="row gutter-sm" v-show="items.length > 0">
                        <div class="col-xs-12 col-sm-6 col-lg-3" v-for="card in items">
                            <q-card class="cursor-pointer" @click.native="open(card)">
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
        <view-card :id="card.id" v-if="card" @closed="cardClosed"></view-card>
    </div>
</template>
<script>
    import ViewCard from '../../components/card/ViewCard.vue'
    import SearchForm from '../../components/SearchForm.vue'
    import ModalManager from '../../mixins/ModalManager'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return {
                items: [],
                card: null,
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                isLoading: 'cards/isCardsLoading'
            }),
            title() {
                return `${this.team ? this.team.name : ''} cards - Wonderus`
            }
        },
        components: {SearchForm, ViewCard},
        mixins: [ModalManager],
        watch: {
            team: function (val) {
                document.title = this.title;
                this.load(this.params()).then(items => this.items = items)
            }
        },
        created() {
            console.log('page created');
            document.title = this.title;
            this.load(this.params()).then(items => this.items = items)
        },
        mounted() {
            console.log('page mounted');
        },
        methods: {
            ...mapActions({
                load: 'cards/all'
            }),
            params() {
                if (this.team !== null) {
                    return {teamId: this.team.id}
                }
                return {}
            },
            open(card) {
                this.openModalWindow('view_card', {id: card.id});
                this.card = card
            },
            cardClosed() {
                this.closeModalWindow();
                this.card = null
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