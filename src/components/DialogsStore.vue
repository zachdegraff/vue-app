<template>
    <div>
        <ask-help v-if="isAskHelpOpen"/>
        <cards-editor v-if="isCardsEditorOpen"/>
        <create-card-tag v-if="isCreateCardTagOpen"/>
        <edit-card-tag v-if="isEditCardTagOpen"/>
        <edit-question v-if="isEditQuestionOpen"/>
        <edit-comment v-if="isEditCommentOpen"/>
    </div>
</template>
<script>
    import CardsEditor from './card/CardsEditor'
    import EditCardTag from './card/EditCardTag'
    import CreateCardTag from './card/CreateCardTag'
    import EditComment from './question/EditComment'
    import EditQuestion from './question/EditQuestion'
    import AskHelp from '../components/team/AskHelp.vue'
    import {mapGetters} from 'vuex'

    export default {
        data: () => {
            return {}
        },
        computed: {
            ...mapGetters({
                isAskHelpOpen: 'modals/isAskHelpOpen',
                isCardsEditorOpen: 'modals/isCardsEditorOpen',
                isCreateCardTagOpen: 'modals/isCreateCardTagOpen',
                isEditCardTagOpen: 'modals/isEditCardTagOpen',
                isEditCommentOpen: 'modals/isEditCommentOpen',
                isEditQuestionOpen: 'modals/isEditQuestionOpen'
            })
        },
        components: {EditComment, EditQuestion, EditCardTag, CreateCardTag, AskHelp, CardsEditor}
    }
</script>