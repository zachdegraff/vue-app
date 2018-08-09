<template>
    <div>
        <ask-help v-if="isAskHelpOpen"/>
        <cards-editor v-if="isCardsEditorOpen"/>
        <create-card-tag v-if="isCreateCardTagOpen"/>
        <edit-card-tag v-if="isEditCardTagOpen"/>
    </div>
</template>
<script>
    import AskHelp from '../components/team/AskHelp.vue'
    import CardsEditor from "./card/CardsEditor";

    import {mapGetters} from 'vuex'
    import CreateCardTag from "./card/CreateCardTag";
    import EditCardTag from "./card/EditCardTag";

    export default {
        data: () => {
            return {}
        },
        computed: {
            ...mapGetters({
                isAskHelpOpen: 'modals/isAskHelpOpen',
                isCardsEditorOpen: 'modals/isCardsEditorOpen',
                isCreateCardTagOpen: 'modals/isCreateCardTagOpen',
                isEditCardTagOpen: 'modals/isEditCardTagOpen'
            })
        },
        components: {EditCardTag, CreateCardTag, AskHelp, CardsEditor}
    }
</script>