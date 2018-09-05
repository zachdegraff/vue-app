<template>
    <q-card inline v-if="noIntegration">
        <q-card-title>
            Add Wonderus to Slack
        </q-card-title>
        <q-card-main>
            <img src="statics/slackapp.png" class="full-width q-mb-sm"/>
            Your entire team can search the knowledge base and ask questions directly from Slack.
            <br/>
            <q-btn color="primary" outline label="Add To Slack" @click="slack" class="q-mt-lg"/>
        </q-card-main>
    </q-card>

</template>
<script>
    import {mapGetters} from 'vuex'

    const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current'
            }),
            noIntegration() {
                if (!this.team || !this.team.integrations) {
                    return false;
                }
                return this.team.integrations.length === 0
            }
        },
        methods: {
            slack() {
                window.location = `https://slack.com/oauth/authorize?client_id=${SLACK_CLIENT_ID}&scope=commands,bot,users:read,users:read.email&state=${this.team.id}`;
            }
        }
    }
</script>