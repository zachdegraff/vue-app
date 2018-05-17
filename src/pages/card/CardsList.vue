<template>
    <div class="row flex-center q-mt-lg">
        <q-spinner :size="36" style="color: #027be3ff" v-show="isLoading"></q-spinner>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current',
                isLoading: 'cards/isCardsLoading'
            })
        },
        watch: {
            team: function (val) {
                this.load(this.params())
            }
        },
        created() {
            this.load(this.params())
        },
        methods: {
            ...mapActions({
                load: 'cards/all'
            }),
            params() {
                if (this.team !== null) {
                    return {team_id: this.team.id}
                }
                return {}
            }
        }
    }
</script>