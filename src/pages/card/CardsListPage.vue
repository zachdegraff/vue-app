<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Create a card" @click="createCard" class="q-mr-md q-mb-md"/>
                    <q-select
                            class="q-mr-md q-mb-md"
                            filter
                            multiple
                            stack-label="Filter by tag"
                            :display-value="selectTagsLabel"
                            v-model="filterTagsIdList"
                            :options="options"
                    />
                </div>
                <div class="row q-mb-lg" v-if="team">
                    <div class="col q-headline">{{team.name}} Glossary</div>
                </div>
                <div class="q-card full-width empty_card" v-show="isEmptyCards">
                    <h2>No cards yet!</h2>
                    <p>Get started by creating your first Knowledge Card for a frequently used team concept.</p>
                    <q-btn no-caps color="primary" :label="createCardLabel" class="q-mr-md q-mb-md" @click="createCard"/>
                </div>
                <div class="row flex-center q-mt-lg" v-show="isLoading">
                    <q-spinner :size="36" color="red"/>
                </div>
                <cards-list :items="items" :filterTagsIdList="filterTagsIdList"></cards-list>
            </div>
            <div class="col-lg-3 q-px-xl gt-md">
                <q-btn no-caps color="primary" :label="createCardLabel" @click="createCard" class="full-width q-mb-md"/>
                <q-select
                        class="margin-15 q-mr-md q-mb-md"
                        filter
                        multiple
                        stack-label="Filter by tag"
                        :display-value="selectTagsLabel"
                        v-model="filterTagsIdList"
                        :options="options"
                />
                <q-btn to="/glossary/tags" outline no-caps color="primary" label="Manage Tags" class="full-width q-mt-lg"/>
            </div>
        </div>
    </div>
</template>
<script>
    import SlackIntegration from '../../components/context/SlackIntegration.vue'
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import CardsList from '../../components/card/CardsList'
    import {mapActions, mapGetters} from 'vuex'
    import {prop, route} from "../../helpers"

    export default {
        data: () => {
            return {
                filterTagsIdList: [],
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                items: 'cards/getItems',
                cardCount: 'cards/cardCount',
                isLoading: 'cards/isCardsLoading',
            }),
            tags() {
                const result = {};
                this.items.forEach(item => {
                    if (!item.tags || item.tags.length === 0) {
                        return
                    }
                    item.tags.forEach(tag => result[tag.id] = tag)
                });
                return Object.values(result)
            },
            options() {
                this.tags.sort(function (a, b) {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    return x < y ? -1 : x > y ? 1 : 0;
                });
                return this.tags.map(item => {
                        return {'label': item.name, 'value': item.id}
                    }
                );
            },
            selectTagsLabel() {
                if (this.filterTagsIdList.length === 0) {
                    return 'No tags selected'
                }
                if (this.filterTagsIdList.length === 1) {
                    return '1 tag selected'
                }
                return `${this.filterTagsIdList.length} tags selected`
            },
            title() {
                return `${prop(this.team, 'name')} Glossary - Wonderus`
            },
            createCardLabel() {
                if (this.filterTagsIdList.length === 0) {
                    return 'Create a card';
                }
                return 'Create a card with tags';
            },
            isEmptyCards() {
                if (this.isLoading) {
                    return false
                }
                return this.items.length === 0;
            }
        },
        components: {CardsList, SiteNavigation, SlackIntegration},
        watch: {
            team: function (val, old) {
                if (val === old) return;

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
                create: 'editor/create',
            }),
            createCard() {
                if (this.filterTagsIdList.length === 0) {
                    return this.create()
                }
                const tags = this.tags.filter(item => {
                    return this.filterTagsIdList.includes(item.id)
                }).map(item => item.name);

                this.create({tags})
            }
        }
    }
</script>
<style>
    .empty_card {
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .margin-15 {
        margin-bottom: 15px;
    }
</style>