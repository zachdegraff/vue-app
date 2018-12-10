<template>
    <div>
        <div class="q-headline">Plans</div>
        <div class="q-mt-lg" v-if="isStatsLoading">
            <q-spinner :size="50" color="red"></q-spinner>
        </div>
        <div v-if="!isStatsLoading">
            <div class="q-mt-lg">
                <strong>Subscription:</strong> Free Plan
            </div>
            <div class="q-mt-lg">
                <strong>Total Team Members:</strong> {{stats.members}}<br/>
                <em>Admins & Contributors: </em> {{(stats.admins + stats.contributors)}}<br/>
                <em>Viewers:</em> {{stats.viewers}}
            </div>
            <div class="q-mt-lg">
                <strong>Total Knowledge Cards:</strong> {{stats.cards}}
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        props: ['id'],
        data: () => {
            return {
                stats: {}
            }
        },
        computed: {
            ...mapGetters({
                isStatsLoading: 'teams/isStatsLoading'
            })
        },
        created() {
            this.loadStats(this.id).then(stats => this.stats = stats)
        },
        methods: {
            ...mapActions({
                loadStats: 'teams/stats'
            })
        }
    }
</script>