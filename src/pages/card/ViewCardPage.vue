<template>
    <q-page></q-page>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: {
            id: {
                required: true
            }
        },
        watch: {
            isCardViewing: function (val) {
                if (!val) {
                    this.$router.push({name: 'cards_list'})
                }
            }
        },
        computed: {
            ...mapGetters({
                isCardViewing: 'modals/isViewCardOpen'
            })
        },
        created() {
            this.showCard(this.id)
        },
        methods: {
            ...mapActions({
                showCard: 'modals/openViewCard'
            })
        }
    }
</script>