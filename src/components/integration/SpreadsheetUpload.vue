<template>
    <div class="row gutter-md">
        <div class="col-xs-3 col-sm-1">
            <img src="statics/integrations/spreadsheet.png" width="45"/>
        </div>
        <div class="col-xs-9 col-sm-9">
            <div class="q-headline">Spreadsheet Upload</div>
            <div class="q-mt-sm">Import existing cards from an Excel or csv spreadsheet by sending your file to
                <a href="mailto:hello@wonderus.app">hello@wonderus.app</a></div>
        </div>
        <div class="col-xs-12 col-sm-2">
            <q-btn label="send file" color="primary" class="q-mt-md" @click="openMailClient"/>
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
            openMailClient() {
                openURL(`mailto:hello@wonderus.app?subject=Spreadsheet Upload`)
            }
        }
    }
</script>