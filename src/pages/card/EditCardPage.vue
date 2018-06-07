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
            isCardEditing: function (val) {
                if (!val) {
                    this.$router.push({name: 'view_card', params: {id: this.id}})
                }
            }
        },
        computed: {
            ...mapGetters({
                isCardEditing: 'cards/getEditingStatus'
            })
        },
        created() {
            this.edit(this.id)
        },
        methods: {
            ...mapActions({
                edit: 'cards/edit'
            })
        }
    }
</script>