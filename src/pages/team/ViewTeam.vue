<template>
    <div></div>
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
            id: function (val) {
                this.recently(val)
            }
        },
        created() {
            this.recently(this.id)
        },
        methods: {
            ...mapActions({
                recently: 'teams/recently'
            })
        }
    }
</script>