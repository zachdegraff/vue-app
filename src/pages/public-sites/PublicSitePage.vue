<template>
    <div class="content-container">
        <div class="row gutter-x-lg">
            <div class="col-lg-2 gt-md"></div>
            <div class="col-md-12 col-lg-7">
              <h1>{{siteData.name}}</h1>
            </div>
        </div>
        <invite-member v-if="isMemberInviting"></invite-member>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                siteData: 'publicSites/getSiteData'
            })
        },
        created() {
           this.$store.commit('publicSites/setSiteLink', this.$route.params.name, {root: true});
           this.getSite();
        },
        methods: {
            ...mapActions({
                getSite: 'publicSites/getSiteDataByLink'
            }),

        }
    }
</script>