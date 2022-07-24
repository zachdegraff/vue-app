<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Submit request" class="q-mb-md" :disabled="!isValidSubscription"/>
                </div>
                <div class="row q-mb-lg">
                    <div class="col q-headline">Content Packs</div>
                </div>
                <div class="row q-my-lg questions-container">
                    <q-tabs no-pane-border color="#f7f7f7" class="col">
                        <!-- Tabs - notice slot="title" -->
                        <q-route-tab label="All Content Packs" to="/contentpacks" slot="title" name="all"/>
                        <q-route-tab label="Subscribed Content Packs" to="/contentpacks/subscribedcontentpacks" slot="title" name="subscribed"/>
                        <q-route-tab label="Available Content Packs" to="/contentpacks/availablecontentpacks" slot="title" name="available"/>

                        <!-- Targets -->
                        <q-tab-pane name="all">
                            <q-infinite-scroll :handler="loadCPs">
                                <content-packs :items="contentpacks" :subscriptions="cpsubscriptions"></content-packs>
                                <q-spinner slot="message" :size="40" color="red"/>
                            </q-infinite-scroll>
                        </q-tab-pane>
                    </q-tabs>
                </div>
            </div>
            <div class="col-lg-3 q-px-xl gt-md">
                <q-btn no-caps color="primary" label="Submit request" class="full-width q-mb-lg" @click="openAskHelp" :disabled="!isValidSubscription"/>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import ContentPacks from '../../components/contentpacks/contentpacks.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
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
            }
        },
        components: {
             ContentPacks, SiteNavigation
        },

        methods: {
            ...mapActions({
                openAskHelp: 'modals/openAskHelp',
                flushQuestions: 'contentpacks/flushToDefaults',
                loadContentPacks: 'contentpacks/loadContentPacks',
                loadSubscribedContentPacks: 'contentpacks/loadSubscribedContentPacks'
            }),
            loadCPs(idx, done) {
                this.loadContentPacks().then((data) => {
                    done(true);
                })
                this.loadSubscribedContentPacks().then((data) => {
                    done(true);
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
</style>
