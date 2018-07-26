<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Create a card" @click="createCard" class="q-mr-md q-mb-md"/>
                    <q-btn outline no-caps color="primary" label="All cards" to="/cards/table" class="q-mr-md q-mb-md"/>
                    <q-btn outline no-caps color="primary" label="Saved cards" to="/cards/saved" class="q-mr-md q-mb-md"/>
                </div>
                <div class="row q-mb-lg">
                    <div class="col q-headline">Saved cards</div>
                </div>
                <cards-list :items="items"/>
            </div>
            <div class="col-lg-3 q-pa-xl gt-md">
                <q-btn no-caps color="primary" label="Create a card" @click="createCard" class="full-width q-mb-md" />
                <q-btn outline no-caps color="primary" label="All cards" to="/cards/table" class="full-width q-mb-md"/>
                <q-btn outline no-caps color="primary" label="Saved cards" to="/cards/saved" class="full-width q-mb-md"/>
                <q-card inline class="full-width">
                    <q-card-title>
                        Set up Slack Integration
                    </q-card-title>
                    <q-card-main>
                        <img src="http://via.placeholder.com/100x100" class="float-right q-ml-md"/>
                        Ask questions directly from Slack. (Message should be informing about the benefints and utility of Slack Integration)
                        <br/>
                        <q-btn color="primary" outline label="Learn more" class="q-mt-lg"/>
                    </q-card-main>
                </q-card>
            </div>
        </div>
    </div>
</template>
<script>
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
        components: {CardsList, SearchForm, SiteNavigation},
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