<template>
    <q-page></q-page>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        watch: {
            isCardTagEditing: function (val) {
                if (!val) {
                    this.$router.push({name: 'cards_tags'})
                }
            }
        },
        computed: {
            ...mapGetters({
                isCardTagEditing: 'modals/isEditCardTagOpen'
            })
        },
        created() {
            this.edit()
        },
        methods: {
            ...mapActions({
                edit: 'modals/openEditCardTag'
            })
        }
    }
</script>