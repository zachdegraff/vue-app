<template>
    <q-page>
        <search-form></search-form>
        <div class="row flex-center">
            <div class="col-xs-12 col-sm-8">
                <div class="row q-my-lg" v-show="items.length > 0">
                    <div class="col q-headline">{{team ? team.name : ''}} cards</div>
                </div>
                <cards-list :items="items"/>
            </div>
        </div>
        <div class="row flex-center q-mt-lg">
            <q-spinner :size="36" color="red" v-show="isLoading"></q-spinner>
        </div>
    </q-page>
</template>
<script>
    import SearchForm from '../../components/SearchForm.vue'
    import {mapActions, mapGetters} from 'vuex'
    import {prop, route} from "../../helpers"
    import CardsList from "../../components/card/CardsList";

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current',
                items: 'cards/getItems',
                isLoading: 'cards/isCardsLoading'
            }),
            title() {
                return `${prop(this.team, 'name')} cards - Wonderus`
            }
        },
        components: {CardsList, SearchForm},
        watch: {
            team: function (val) {
                this.load();
                document.title = this.title;
            }
        },
        created() {
            this.load();
            document.title = this.title;
        },
        methods: {
            ...mapActions({
                load: 'cards/all'
            }),
            createViewUrl(card) {
                return route('view_card', {id: card.id})
            },
        }
    }
</script>