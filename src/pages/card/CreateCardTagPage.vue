<template>
    <q-page></q-page>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        watch: {
            isCardTagAdding: function (val) {
                if (!val) {
                    this.$router.push({name: 'cards_tags'})
                }
            }
        },
        computed: {
            ...mapGetters({
                isCardTagAdding: 'modals/isCreateCardTagOpen'
            })
        },
        created() {
            this.create()
        },
        methods: {
            ...mapActions({
                create: 'modals/openCreateCardTag'
            })
        }
    }
</script>