<template>
    <div>
        <ask-help v-if="isAskHelpOpen"/>
        <cards-editor v-if="isCardsEditorOpen"></cards-editor>
    </div>
</template>
<script>
    import AskHelp from '../components/team/AskHelp.vue'
    import CardsEditor from "./card/CardsEditor";

    import {mapGetters} from 'vuex'

    export default {
        data: () => {
            return {}
        },
        computed: {
            ...mapGetters({
                isAskHelpOpen: 'modals/isAskHelpOpen',
                isCardsEditorOpen: 'modals/isCardsEditorOpen'
            })
        },
        components: {AskHelp, CardsEditor}
    }
</script>