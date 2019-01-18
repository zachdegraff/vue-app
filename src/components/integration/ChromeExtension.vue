<template>
    <div class="row gutter-md full-width">
        <div class="col-xs-12 col-sm-10">
            <img src="statics/integrations/chrome-icon.png" class="float-left" width="50"/>
            <div style="margin-left: 70px">
                <div class="q-headline">Google Chrome Extension</div>
                <div class="q-mt-sm">Search your team glossary from anywhere on the web by highlighting text on the page</div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-2">
            <q-btn label="add to chrome" color="primary" class="full-width q-mt-md" @click="openExtensionPage"/>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {openURL} from 'quasar'

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current'
            }),
            isOwner() {
                if (!this.team) {
                    return false;
                }
                return this.team.isOwner
            }
        },
        watch: {
            team: function (val) {
                this.checkUserRights()
            }
        },
        created() {
            this.checkUserRights()
        },
        methods: {
            checkUserRights() {
                if (!this.team) return;

                if (!this.isOwner) {
                    this.$router.push({name: 'home'})
                }
            },
            openExtensionPage() {
                openURL(`https://chrome.google.com/webstore/detail/wonderus/edilcchikfplmgfoaekmlaeemedhimpb`)
            }
        }
    }
</script>