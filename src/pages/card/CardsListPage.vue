<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7 q-headline">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Create a card" @click="createCard" class="q-mr-md q-mb-md"/>
                    <q-btn outline no-caps color="primary" label="All cards" to="/cards/table" class="q-mr-md q-mb-md"/>
                    <q-btn outline no-caps color="primary" label="Saved cards" to="/cards/saved" class="q-mr-md q-mb-md"/>
                </div>
                <div class="row q-mb-lg" v-if="team">
                    <div class="col q-headline">{{team.name}} cards</div>
                </div>
                <div class="row flex-center q-mt-lg" v-show="isLoading">
                    <q-spinner :size="36" color="red" />
                </div>
                <cards-list :items="items"></cards-list>
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
    import CardsList from '../../components/card/CardsList'
    import {mapActions, mapGetters} from 'vuex'
    import {prop, route} from "../../helpers"

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
        components: {CardsList, SiteNavigation},
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
                load: 'cards/all',
                createCard: 'editor/create',
            })
        }
    }
</script>