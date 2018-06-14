<template>
    <div>
        <view-card v-if="isCardViewing"/>
        <edit-card v-if="isCardEditing"/>
        <create-card v-if="isCardAdding"/>
        <ask-help v-if="isAskHelpOpen"/>
    </div>
</template>
<script>
    import ViewCard from '../components/card/ViewCard.vue'
    import EditCard from '../components/card/EditCard.vue'
    import CreateCard from '../components/card/CreateCard.vue'
    import AskHelp from '../components/team/AskHelp.vue'

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
                isAskHelpOpen: 'modals/isAskHelpOpen'
            })
        },
        components: {
            AskHelp,
            ViewCard,
            EditCard,
            CreateCard
        }
    }
</script>