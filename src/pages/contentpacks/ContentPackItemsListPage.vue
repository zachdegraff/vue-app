<template>
    <div class="content-container content-pack-items">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row lt-lg">
                    <q-btn no-caps color="primary" label="Submit request" class="q-mb-md" />
                </div>
                <div class="row q-mb-lg">
                    <div class="col q-headline">Content Pack Items</div>
                </div>

                <div class="row q-my-lg questions-container">¸
                    <q-infinite-scroll :handler="loadItems">
                        <content-pack-items-list :items="items"></content-pack-items-list>
                        <q-spinner slot="message" :size="40" color="red" class="custom-spinner"/>
                    </q-infinite-scroll>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import {mapActions, mapGetters} from 'vuex'
    import ContentPackItemsList from "../../components/contentpacks/ContentPackItemsList";

    export default {
        props: ['id'],
        computed: {
            ...mapGetters({
                team: 'teams/current',
                items: 'contentpacks/getContentPackItems',
                contentPack: 'contentpacks/activeContentPack'
            })
        },
        watch: {
            contentPack: function (val) {
            }
        },
        components: {
            ContentPackItemsList,
            SiteNavigation
        },
        methods: {
            ...mapActions({
                loadContentPackItems: 'contentpacks/loadItems',
                setActiveContentPack: 'contentpacks/setActiveContentPack'
            }),
            loadItems(idx, done) {
                this.loadContentPackItems({id: this.id, page: idx}).then((data) => {
                    data.length === 0 ? done(true) : done();
                })
            },
        },
        created() {
            this.setActiveContentPack({contentPackId: this.id}).then((data) => {
            })
        }
    }
</script>

<style lang="scss">
.content-pack-items {
    .custom-spinner {
        position: absolute;
        width: 10%;
        left: 40%;
    }
}
</style>
