<template>
    <div>
        <view-card v-if="isCardViewing"/>
        <edit-card v-if="isCardEditing"/>
        <create-card v-if="isCardAdding"/>
        <ask-help v-if="isAskHelpOpen"/>
        <cards-editor v-if="isCardsEditorOpen"></cards-editor>
    </div>
</template>
<script>
    import ViewCard from '../components/card/ViewCard.vue'
    import EditCard from '../components/card/EditCard.vue'
    import CreateCard from '../components/card/CreateCard.vue'
    import AskHelp from '../components/team/AskHelp.vue'
    import CardsEditor from "./card/CardsEditor";

    import {mapGetters} from 'vuex'

    export default {
        data: () => {
            return {}
        },
        computed: {
            ...mapGetters({
                isCardViewing: 'modals/isViewCardOpen',
                isCardEditing: 'modals/isEditCardOpen',
                isCardAdding: 'modals/isCreateCardOpen',
                isAskHelpOpen: 'modals/isAskHelpOpen',
                isCardsEditorOpen: 'modals/isCardsEditorOpen'
            })
        },
        components: {
            CardsEditor,
            AskHelp,
            ViewCard,
            EditCard,
            CreateCard
        }
    }
</script>