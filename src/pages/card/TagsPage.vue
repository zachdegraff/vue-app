<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <site-navigation class="col-lg-2 gt-md"/>
            <div class="col-md-12 col-lg-7">
                <div class="row q-mb-lg">
                    <div class="col q-headline">Tags</div>
                </div>
                <tags-grid-list :items="tags"></tags-grid-list>
            </div>
            <div class="col-lg-3 q-px-xl gt-md">

            </div>
        </div>
    </div>
</template>

<script>
    import SiteNavigation from '../../components/context/SiteNavigation.vue'
    import TagsGridList from '../../components/card/TagsGridList.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        created() {
            document.title = this.title
        },
        watch: {
            team: function (val) {
                document.title = this.title
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/current',
                tags: 'tags/allNonEmpty'
            }),
            title() {
                if (this.team === null) {
                    return 'Tags - Wonderus'
                }
                return `${this.team.name} Tags - Wonderus`
            }
        },
        components: {
            TagsGridList, SiteNavigation
        }
    }
</script>