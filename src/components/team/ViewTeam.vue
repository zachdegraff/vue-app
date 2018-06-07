<template>
    <div>
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
            <q-table title="Team Members" class="q-mt-xl" :data="members" :columns="columns" :pagination="{rowsPerPage: 20}" row-key="name" :loading="isMembersLoading">
                <q-td slot="body-cell-actions" slot-scope="props" class="text-right">
                    <q-btn flat round dense icon="more_vert" v-if="props.row.isEditable">
                        <q-popover>
                            <q-list link>
                                <q-item v-if="props.row.user === null" @click.native="reSendInvite(props.row.id)" v-close-overlay>
                                    <q-item-main label="Resent Invite"/>
                                </q-item>
                                <q-item @click.native="changeRole(props.row.id)" v-close-overlay>
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
        <invite-member :id="id" v-if="isInviting" @closed="closeInvitation"></invite-member>
        <change-role :id="id" :member-id="idForChange" v-if="idForChange" @closed="closeRoleChanging"></change-role>
    </div>
</template>
<script>
    import InviteMember from '../../components/team/InviteMember.vue'
    import ChangeRole from '../../components/team/ChangeRole.vue'
    import ModalManager from '../../mixins/ModalManager'
    import {mapActions, mapGetters} from 'vuex'

    const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;

    export default {
        props: {
            id: {
                required: true
            }
        },
        data: () => ({
            isInviting: false,
            idForChange: null,
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

        created() {
            this.load(this.id).then(this.setPageTitle);
        },
        mixins: [ModalManager],
        watch: {
            id: function (val) {
                this.load(val).then(this.setPageTitle);
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/getViewingTeam',
                members: 'members/getTeamMembers',
                isMembersLoading: 'members/isMembersLoading'
            }),
            hasSlackIntegration() {
                if (!this.team) {
                    return false;
                }

                return this.team.integrations.find(i => i.service === 'slack') !== undefined;
            }
        },
        components: {
            InviteMember, ChangeRole
        },
        methods: {
            ...mapActions({
                load: 'teams/view',
                excludeMember: 'members/excludeMemberFromTeam',
                reSendInvite: 'members/retryMemberInvitation',
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
                this.openModalWindow('invite_member', {id: this.id});
                this.isInviting = true;
            },
            changeRole(id) {
                this.openModalWindow('change_role', {id: this.id, memberId: id});
                this.idForChange = id;
            },
            confirm() {
                return this.$q.dialog({title: 'Confirm', message: 'Are you sure?', ok: 'Yes', cancel: 'No'})
            },
            closeInvitation() {
                this.closeModalWindow();
                this.isInviting = false;
            },
            closeRoleChanging() {
                this.closeModalWindow();
                this.idForChange = null
            },
            setPageTitle(team) {
                document.title = `Manage ${team.name} team - Wonderus`
            },
            disableSlack() {
                this.confirm().then(() => {
                    this.disableSlackIntegration(this.id).then(() => this.load(this.id))
                }).catch(() => {
                })
            },
            excludeFromTeam(id) {
                this.confirm().then(() => this.excludeMember(id)).catch(() => {
                })
            }
        }
    }
</script>