<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row q-mb-lg">
                    <div class="q-headline col-md-8 margin-bottom-20">
                        <router-link v-bind:to="'/glossary/tags'" tag='a' class='primary not_underlined'>Tags</router-link>
                        <span>> {{tag}} tag</span>
                    </div>
                    <br>
                    <div class="col-md-4 max-991">
                        <q-btn no-caps color="primary" label="Create card with tag" class="full-width q-mb-md" @click="createCard({tags: [tag]})"/>
                    </div>
                </div>
                <q-spinner :size="36" color="red" v-show="isLoading"></q-spinner>
                <cards-list :items="items"/>
            </div>
            <div class="col-lg-3 q-px-xl gt-md">
                <q-btn no-caps color="primary" label="Create card with tag" class="full-width q-mb-md" @click="createCard({tags: [tag]})"/>
            </div>

        </div>
    </div>
</template>
<script>
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
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
        components: {CardsList, SearchForm, SiteNavigation},
        watch: {
            team: function (val) {
                this.filter(this.params());
                document.title = this.title;
            }
        },
        created() {
            this.filter(this.params());
            document.title = this.title;
        },
        methods: {
            ...mapActions({
                filter: 'cards/all',
                createCard: 'editor/create',
                openAskHelp: 'modals/openAskHelp',
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

    .not_underlined {
        text-decoration: none;
    }

    .margin-bottom-20 {
        margin-bottom: 20px;
    }

    @media only screen and (min-width: 992px) {
        .max-991 {
            display: none;
        }
    }
</style>