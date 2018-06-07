<template>
    <div>
        <view-card v-if="isCardViewing"/>
        <edit-card v-if="isCardEditing"/>
        <create-card v-if="isCardAdding"/>
    </div>
</template>
<script>
    import ViewCard from '../components/card/ViewCard.vue'
    import EditCard from '../components/card/EditCard.vue'
    import CreateCard from '../components/card/CreateCard.vue'

    import {mapGetters} from 'vuex'

    export default {
        data: () => {
            return {}
        },
        computed: {
            ...mapGetters({
                isCardViewing: 'cards/getViewingStatus',
                isCardEditing: 'cards/getEditingStatus',
                isCardAdding: 'cards/getAddingStatus'
            })
        },
        components: {
            ViewCard,
            EditCard,
            CreateCard
        }
    }
</script>