<template>
    <div>
        <div class="row text-center card-item" v-if="!team">
            <div class="col">
                <q-spinner :size="50" color="red"></q-spinner>
            </div>
        </div>
        <div v-if="team">
            <div class="row q-mt-md">
                <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3">
                    <img :src="photo(team.photo)" class="round-borders" width="200px"/>
                </div>
                <div class="col-xs-12 col-sm-6 col-lg-8 col-xl-9">
                    <q-field class="q-mt-md" :error="$v.form.name.$error" :error-label="firstErrorFor($v.form.name)">
                        <q-input v-model="form.name" float-label="Name" @blur="$v.form.name.$touch" :readonly="!isOwner"/>
                    </q-field>
                    <q-field class="q-mt-lg" v-if="isOwner">
                        <image-chooser @change="changeFile"></image-chooser>
                    </q-field>
                    <div v-show="isOwner">
                        <q-btn @click="save" color="primary" class="q-mt-lg" label="save" :disable="isUpdating"/>
                    </div>
                </div>
            </div>
            <q-table title="Team Members" class="bg-white q-mt-xl" :data="members" :columns="columns" :pagination="{rowsPerPage: 20}" row-key="name" :loading="isMembersLoading">
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
            <div class="q-mt-xl">
                <q-btn size="lg" label="Invite new member" color="primary" class="q-mr-md q-mb-md" @click="invite(team.id)"/>

                <q-btn size="lg" label="Connect with Slack" color="white" class="text-black q-mb-md" @click="slack" v-if="canEnableSlack"/>
                <q-btn size="lg" label="Disable Slack" color="red" class="q-mb-md" @click="disableSlack" v-if="canDisableSlack"/>
            </div>
        </div>
        <invite-member v-if="isMemberInviting"></invite-member>
        <change-role v-if="isChangingRole"></change-role>
    </div>
</template>
<script>
    import InviteMember from '../../components/team/InviteMember.vue'
    import ChangeRole from '../../components/team/ChangeRole.vue'
    import ValidatorMessages from '../../mixins/ValidatorMessages'
    import {required} from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'
    import ImageChooser from "../ImageChooser";

    const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;

    export default {
        data: () => ({
            form: {
                name: ''
            },
            file: null,
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
            ],
            isDisableBtnClicked: false
        }),
        mixins: [ValidatorMessages],
        watch: {
            team: function (val) {
                if (val !== null) {
                    this.form = val;
                    document.title = `Manage ${val.name} team - Wonderus`
                }
            }
        },
        validations: {
            form: {
                name: {
                    required
                }
            }
        },
        computed: {
            ...mapGetters({
                team: 'teams/getViewingTeam',
                members: 'members/getTeamMembers',
                isUpdating: 'teams/isUpdating',
                isMembersLoading: 'members/isMembersLoading',
                isMemberInviting: 'modals/isInviteMemberOpen',
                isChangingRole: 'modals/isChangeMemberRoleOpen'
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
        components: {
            ImageChooser,
            InviteMember, ChangeRole
        },
        methods: {
            ...mapActions({
                view: 'teams/view',
                update: 'teams/update',
                invite: 'modals/openInviteMember',
                changeRole: 'modals/openChangeMemberRole',
                excludeMember: 'members/excludeMemberFromTeam',
                reSendInvite: 'members/retryMemberInvitation',
                disableSlackIntegration: 'teams/disableSlack'
            }),
            slack() {
                window.location = `https://slack.com/oauth/authorize?client_id=${SLACK_CLIENT_ID}&scope=commands,bot,users:read,users:read.email,im:history&state=${this.team.id}`;
            },
            save() {
                this.$v.form.$touch();
                if (this.$v.form.$error) {
                    return
                }

                this.update({id: this.team.id, form: this.prepare()});
            },
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return path
            },
            confirm() {
                return this.$q.dialog({title: 'Confirm', message: 'Are you sure?', ok: 'Yes', cancel: 'No'})
            },
            prepare() {
                const data = new FormData();
                for (let i in this.team) {
                    data.append(i, this.team[i])
                }
                data.append('_method', 'PUT');
                if (this.file !== null) {
                    data.append('file', this.file);
                }
                return data
            },
            changeFile(file) {
                this.file = file
            },
            disableSlack() {
                this.confirm().then(() => {
                    this.disableSlackIntegration(this.team.id).then(() => this.view(this.team.id))
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