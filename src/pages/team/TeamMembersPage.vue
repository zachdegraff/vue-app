<template>
    <div>
        <div>
            <q-table title="Team Members" class="bg-white" :data="members" :columns="columns" :pagination="{rowsPerPage: 20}" row-key="name" :loading="isMembersLoading">
                <q-td slot="body-cell-actions" slot-scope="props" class="text-right">
                    <q-btn flat round dense icon="more_vert" v-if="props.row.isEditable">
                        <q-popover>
                            <q-list link>
                                <q-item v-if="props.row.user === null" @click.native="reSendInvite(props.row.id)" v-close-overlay>
                                    <q-item-main label="Resend invite email"/>
                                </q-item>
                                <q-item @click.native="changeRole({teamId: team.id, memberId: props.row.id})" v-close-overlay>
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
            <div class="q-mt-lg text-right" v-if="isOwner">
                <q-btn label="Invite new member" no-caps color="primary" @click="invite(id)"/>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: ['id'],
        data: () => ({
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
            team: function (val) {
                if (!val) return;

                this.init(val)
            }
        },
        computed: {
            ...mapGetters({
                getTeam: 'teams/getById',
                members: 'members/getTeamMembers',
                isMembersLoading: 'members/isMembersLoading'
            }),
            team() {
                return this.getTeam(this.id)
            },
            isOwner() {
                if (!this.team) {
                    return false;
                }
                return this.team.isOwner
            }
        },
        created() {
            if (!this.team) return;

            this.init(this.team)
        },
        methods: {
            ...mapActions({
                invite: 'modals/openInviteMember',
                changeRole: 'modals/openChangeMemberRole',
                loadTeamMembers: 'members/loadTeamMembers',
                excludeMember: 'members/excludeMemberFromTeam',
                reSendInvite: 'members/retryMemberInvitation'
            }),
            init(team) {
                document.title = `Manage ${team.name} team - Wonderus`;

                this.loadTeamMembers(team.id)
            },
            confirm() {
                return this.$q.dialog({title: 'Confirm', message: 'Are you sure?', ok: 'Yes', cancel: 'No'})
            },
            excludeFromTeam(id) {
                this.confirm().then(() => this.excludeMember(id)).catch(() => {
                })
            },
        }
    }
</script>