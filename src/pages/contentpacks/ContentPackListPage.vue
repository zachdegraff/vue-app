<template>
    <div class="content-container content-packs">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Submit request" class="q-mb-md" />
                </div>
                <div class="row q-mb-lg">
                    <div class="col q-headline">Content Packs</div>
                </div>
                <div class="row q-my-lg questions-container">
                    <q-tabs no-pane-border color="#f7f7f7" class="col">
                        <!-- Tabs - notice slot="title" -->
                        <q-route-tab label="All Content Packs" to="/content-packs" slot="title" name="all"/>
                        <q-route-tab label="Subscribed Content Packs" to="/content-packs/subscribed" slot="title" name="subscribed"/>
                        <!-- Targets -->
                        <q-tab-pane name="all">
                            <q-infinite-scroll :handler="loadCPs">
                                <content-packs :filter="false" name="content-packs" :team="team" :items="contentpacks" ></content-packs>
                                <q-spinner slot="message" :size="40" color="red" class="custom-spinner"/>
                            </q-infinite-scroll>
                        </q-tab-pane>

                        <q-tab-pane name="subscribed">
                            <q-infinite-scroll :handler="loadCPs">
                                <content-packs :filter="true" name="subscribed-content-packs" :team="team" :items="cpsubscriptions"></content-packs>
                            </q-infinite-scroll>
                        </q-tab-pane>
                    </q-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import ContentPacks from '../../components/contentpacks/ContentPacksList.vue'

    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: () => {
            return { isLastPage: false }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                contentpacks: 'contentpacks/getContentPacks',
                cpsubscriptions: 'contentpacks/getContentPackSubscriptions',
            })
        },
        watch: {
            team: function (val) {
                if (val === null) return;
                this.loadContentPacks()
            },
        },
        components: {
             ContentPacks, SiteNavigation
        },
        methods: {
            ...mapActions({
                openAskHelp: 'modals/openAskHelp',
                flushQuestions: 'contentpacks/flushToDefaults',
                loadContentPacks: 'contentpacks/loadContentPacks',
            }),
            loadCPs(idx, done) {
                this.loadContentPacks({page: idx}).then((data) => {
                    data.length === 0 ? done(true) : done();
                })
            },
        }
    }
</script>
<style lang="scss">
    .questions-container {
        .q-tabs-bar {
            border-color: #2fab65
        }
        .q-tab-label {
            color: #555;
            text-transform: none;
        }
        .q-tabs-inverted.q-tabs-position-top {
            .q-tabs-panes {
                padding-top: 20px;
                border-top: none;
            }
        }
    }

    .questions-item-comments {
        padding: 0 20px 20px;
    }

    .questions-item-comments-item {
        background: #f0f0f0;
        border-radius: 3px;
        margin-top: 10px;
        &:first-child {
            margin-top: 0;
        }
    }

    .q-infinite-scroll-message {
        text-align: center;
    }

    .custom-spinner {
        position: absolute;
        width: 10%;
        left: 40%;
    }
</style>
