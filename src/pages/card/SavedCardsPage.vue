<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Create a card" @click="createCard" class="q-mr-md q-mb-md"/>
                    <q-btn outline no-caps color="primary" label="Filter cards" to="/cards/table" class="q-mr-md q-mb-md"/>
                    <q-btn outline no-caps color="primary" label="Saved cards" to="/cards/saved" class="q-mr-md q-mb-md"/>
                </div>
                <div class="row q-mb-lg">
                    <div class="col q-headline">Saved cards</div>
                </div>
                <cards-list :items="items"/>
            </div>
            <div class="col-lg-3 q-px-xl gt-md">
                <q-btn no-caps color="primary" label="Create a card" @click="createCard" class="full-width q-mb-md" />
                <q-btn outline no-caps color="primary" label="Filter cards" to="/cards/table" class="full-width q-mb-md"/>
                <q-btn outline no-caps color="primary" label="Saved cards" to="/cards/saved" class="full-width q-mb-md"/>
                <slack-integration class="full-width"/>
            </div>
        </div>
    </div>
</template>
<script>
    import SlackIntegration from '../../components/context/SlackIntegration.vue'
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import SearchForm from '../../components/SearchForm.vue'
    import CardsList from "../../components/card/CardsList";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                items: 'users/getFavoriteCards'
            })
        },
        components: {CardsList, SearchForm, SiteNavigation, SlackIntegration},
        created() {
            document.title = 'Saved cards - Wonderus';
        },
        methods: {
            ...mapActions({
                createCard: 'editor/create',
            })
        }
    }
</script>