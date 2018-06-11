<template>
    <q-page>
        <ask-help v-if="isAskHelpOpen"></ask-help>
    </q-page>
</template>
<script>
    import AskHelp from '../../components/team/AskHelp'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        components: {AskHelp},
        watch: {
            isAskHelpOpen: function (val) {
                if (!val) {
                    this.$router.push({name: 'home'})
                }
            }
        },
        computed: {
            ...mapGetters({
                isAskHelpOpen: 'modals/isAskHelpOpen'
            })
        },
        created() {
            this.openAskHelp()
        },
        methods: {
            ...mapActions({
                openAskHelp: 'modals/openAskHelp'
            })
        }
    }
</script>