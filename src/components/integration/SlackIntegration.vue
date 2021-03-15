<template>
    <div class="row gutter-md full-width">
        <div class="col-xs-12 col-sm-10">
            <img src="statics/integrations/slack-icon.png" class="float-left" width="50"/>
            <div style="margin-left: 70px">
                <div class="q-headline">Slack</div>
                <div class="q-mt-sm">Make your team glossary available and collect team questions directly within &nbsp;Slack</div>
                <div class="q-mt-sm" v-if="slackTeamName">Connected to: <strong>{{slackTeamName}}</strong></div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-2 text-right">
            <q-btn label="connect" color="primary" class="full-width q-mt-md" @click="enable" v-if="canEnableSlack"/>
            <q-btn label="remove" color="faded" class="full-width q-mt-md" @click="disable" v-if="canDisableSlack"/>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;

    export default {
        computed: {
            ...mapGetters({
                team: 'teams/current'
            }),
            isOwner() {
                if (!this.team) {
                    return false;
                }
                return this.team.isOwner
            },
            integration() {
                if (!this.team) {
                    return null;
                }
                return this.team.integrations.find(i => i.service === 'slack')
            },
            slackTeamName() {
                if (!this.integration) {
                    return null
                }
                return this.integration.teamName
            },
            canEnableSlack() {
                if (!this.isOwner) {
                    return false;
                }

                return this.integration === undefined;
            },
            canDisableSlack() {
                if (!this.isOwner) {
                    return false;
                }

                return this.integration !== undefined;
            }
        },
        watch: {
            team: function (val) {
                this.checkUserRights()
            }
        },
        created() {
            this.checkUserRights()
        },
        methods: {
            ...mapActions({
                disableSlackIntegration: 'teams/disableSlack',
                reloadCurrentTeam: 'teams/reloadCurrentTeam'
            }),
            enable() {
                window.location = `https://slack.com/oauth/v2/authorize?client_id=${SLACK_CLIENT_ID}&scope=app_mentions:read,commands,channels:history,chat:write,im:history,im:write,team:read,users:read,users:read.email&state=${this.team.id}`;
            },
            disable() {
                this.confirm().then(() => {
                    this.disableSlackIntegration(this.team.id).then(this.reloadCurrentTeam)
                }).catch(() => {
                })
            },
            confirm() {
                return this.$q.dialog({title: 'Confirm', message: 'Are you sure?', ok: 'Yes', cancel: 'No'})
            },
            checkUserRights() {
                if (!this.team) return;

                if (!this.isOwner) {
                    this.$router.push({name: 'home'})
                }
            }
        }
    }
</script>
