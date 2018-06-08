<template>
    <div></div>
</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        props: {
            id: {
                required: true
            }
        },
        created() {
            this.view(this.id)
        },
        methods: {
            ...mapActions({
                view: 'teams/view'
            })
        }
    }
</script>