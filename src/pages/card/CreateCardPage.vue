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
                isCardAdding: 'cards/getAddingStatus'
            })
        },
        created() {
            this.add()
        },
        methods: {
            ...mapActions({
                add: 'cards/add'
            })
        }
    }
</script>