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
                    <q-btn flat round dense icon="more_vert">
                        <q-popover>
                            <q-list link>
                                <q-item>
                                    <q-item-main label="Resent Invite"/>
                                </q-item>
                                <q-item>
                                    <q-item-main label="Change Role"/>
                                </q-item>
                                <q-item>
                                    <q-item-main label="Delete From Team"/>
                                </q-item>
                            </q-list>
                        </q-popover>
                    </q-btn>
                </q-td>
            </q-table>
            <div class="q-mt-xl">
                <q-btn size="lg" label="Invite new member" color="secondary"/>
            </div>
        </div>
    </q-page>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

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
                {name: 'fullName', required: true, label: 'Name', align: 'left', field: 'fullName', sortable: true},
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
            this.load(this.id).then(team => this.team = team);
            this.loadMembers(this.id).then(members => this.members = members)
        },
        computed: {
            ...mapGetters({
                isLoading: 'teams/isMembersLoading'
            })
        },
        methods: {
            ...mapActions({
                load: 'teams/get',
                loadMembers: 'teams/members'
            }),
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return path
            },
        }
    }
</script>