<template>
    <q-page>
        <search-form></search-form>
        <div class="row flex-center">
            <div class="col-xs-12 col-sm-8">
                <div class="row q-my-lg" v-show="items.length > 0">
                    <div class="col q-headline">Saved cards</div>
                </div>
                <cards-list :items="items"/>
            </div>
        </div>
    </q-page>
</template>
<script>
    import SearchForm from '../../components/SearchForm.vue'
    import CardsList from "../../components/card/CardsList";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                items: 'users/getFavoriteCards'
            })
        },
        components: {CardsList, SearchForm},
        created() {
            document.title = 'Saved cards - Wonderus';
        }
    }
</script>