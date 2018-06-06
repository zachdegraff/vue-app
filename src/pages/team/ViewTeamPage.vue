<template>
    <q-page>
        <div v-if="team">
            <div class="row q-mt-md">
                <div class="col-xs-3">
                    <img :src="photo(team.photo)" class="round-borders" width="200px"/>
                </div>
                <div class="col-xs-9">
                    <h4>{{team.name}}</h4>
                    <h5>{{team.organization}}</h5>
                </div>
            </div>
            <q-table title="Team Members" class="q-mt-xl" :data="members" :columns="columns" row-key="name" :loading="isLoading">
                <q-td slot="body-cell-actions" slot-scope="props" class="text-right">
                    <q-btn flat round dense icon="more_vert" v-if="props.row.isEditable">
                        <q-popover>
                            <q-list link>
                                <q-item v-if="props.row.user === null" @click.native="reSendInvite(props.row.id)" v-close-overlay>
                                    <q-item-main label="Resent Invite"/>
                                </q-item>
                                <q-item :to="{name: 'change_role', params: {id, memberId: props.row.id}}">
                                    <q-item-main label="Change Role"/>
                                </q-item>
                                <q-item @click.native="excludeFromTeam(props.row.id)" v-close-overlay>
                                    <q-item-main label="Delete From Team"/>
                                </q-item>
                            </q-list>
                        </q-popover>
                    </q-btn>
                </q-td>
            </q-table>
            <div class="q-mt-xl">
                <q-btn size="lg" label="Invite new member" color="primary" @click="invite"/>

                <q-btn size="lg" label="Connect with Slack" color="white" class="text-black q-ml-md" @click="slack" v-if="!hasSlackIntegration"/>
                <q-btn size="lg" label="Disable Slack" color="red" class="q-ml-md" @click="disableSlack" v-if="hasSlackIntegration"/>
            </div>
        </div>
    </q-page>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;

    export default {
        props: {
            id: {
                required: true
            }
        },
        data: () => ({
            team: null,
            members: [],
            columns: [
                {
                    name: 'fullName',
                    required: true,
                    label: 'Name',
                    align: 'left',
                    field: row => row.user ? row.user.fullName : null,
                    sortable: true
                },
                {name: 'email', required: true, label: 'Email Address', field: 'email', sortable: true},
                {name: 'role', required: true, label: 'Team Role', field: 'role', sortable: true},
                {name: 'actions', align: 'right', label: ''},
            ]
        }),
        watch: {
            id: function (val) {
                this.load(val).then(team => this.team = team);
            }
        },
        created() {
            this.load(this.id).then(team => {
                this.team = team;
                document.title = `Manage ${team.name} team - Wonderus`
            });
            this.loadMembers(this.id).then(members => this.members = members)
        },
        computed: {
            ...mapGetters({
                isLoading: 'teams/isMembersLoading'
            }),
            hasSlackIntegration() {
                if (!this.team) {
                    return false;
                }

                return this.team.integrations.find(i => i.service === 'slack') !== undefined;
            }
        },
        methods: {
            ...mapActions({
                load: 'teams/get',
                loadMembers: 'teams/members',
                excludeMember: 'teams/exclude',
                retryInvitation: 'teams/retryInvitation',
                disableSlackIntegration: 'teams/disableSlack'
            }),
            slack() {
                window.location = `https://slack.com/oauth/authorize?client_id=${SLACK_CLIENT_ID}&scope=commands&state=${this.id}`;
            },
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return path
            },
            invite() {
                this.$router.push({name: 'invite_member', params: {id: this.id}});
            },
            disableSlack() {
                this.$q.dialog({title: 'Confirm', message: 'Are you sure?', ok: 'Yes', cancel: 'No'}).then(() => {
                    this.disableSlackIntegration(this.id).then(() => {
                        this.load(this.id).then(team => this.team = team)
                    })
                }).catch(() => {
                })
            },
            reSendInvite(memberId) {
                this.retryInvitation(memberId)
            },
            excludeFromTeam(memberId) {
                this.$q.dialog({title: 'Confirm', message: 'Are you sure?', ok: 'Yes', cancel: 'No'}).then(() => {
                    this.excludeMember(memberId).then(() => {
                        this.loadMembers(this.id).then(members => this.members = members)
                    })
                }).catch(() => {
                })
            }
        }
    }
</script>