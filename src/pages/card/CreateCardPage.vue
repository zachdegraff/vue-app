<template>
    <q-page></q-page>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        watch: {
            isCardAdding: function (val) {
                if (!val) {
                    this.$router.push({name: 'cards_list'})
                }
            }
        },
        computed: {
            ...mapGetters({
                isCardAdding: 'modals/isCreateCardOpen'
            })
        },
        created() {
            this.add()
        },
        methods: {
            ...mapActions({
                add: 'modals/openCreateCard'
            })
        }
    }
</script>