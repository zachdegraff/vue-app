<template>
    <div class="row gutter-md">
        <div class="col-xs-3 col-sm-1">
            <img src="statics/integrations/slack-icon.png" width="50"/>
        </div>
        <div class="col-xs-9 col-sm-9">
            <div class="q-headline">Slack</div>
            <div class="q-mt-sm">Make your team glossary available and collect team questions directly within Slack</div>
        </div>
        <div class="col-xs-12 col-sm-2">
            <q-btn label="connect" color="primary" class="q-mt-md" @click="enable" v-if="canEnableSlack"/>
            <q-btn label="remove" color="faded" class="q-mt-md" @click="disable" v-if="canDisableSlack"/>
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
            canEnableSlack() {
                if (!this.isOwner) {
                    return false;
                }

                return this.team.integrations.find(i => i.service === 'slack') === undefined;
            },
            canDisableSlack() {
                if (!this.isOwner) {
                    return false;
                }

                return this.team.integrations.find(i => i.service === 'slack') !== undefined;
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
                window.location = `https://slack.com/oauth/authorize?client_id=${SLACK_CLIENT_ID}&scope=commands,bot,users:read,users:read.email&state=${this.team.id}`;
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