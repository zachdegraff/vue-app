<template>
    <q-layout>
        <app-header></app-header>
        <q-page-container>
            <q-page>
                <div class="row gutter-md q-pa-md">
                    <div class="col-xs-4">
                        <q-list highlight inset-separator link class="q-mt-md" v-if="items.length > 0">
                            <q-item v-for="item in items" :key="item.id" :active="isActive(item)" :to="{name: 'view_team', params: {id: item.id}}">
                                <q-item-side>
                                    <img :src="photo(item.photo)" class="round-borders" width="50px"/>
                                </q-item-side>
                                <q-item-main :label="item.name"/>
                                <q-item-side right>
                                    <q-btn flat round dense icon="more_vert">
                                        <q-popover>
                                            <q-list link>
                                                <q-item :to="{name: 'edit_team', params: {id: item.id}}">
                                                    <q-item-main label="Edit"/>
                                                </q-item>
                                                <q-item @click.native="flush(item.id)">
                                                    <q-item-main label="Delete"/>
                                                </q-item>
                                            </q-list>
                                        </q-popover>
                                    </q-btn>
                                </q-item-side>
                            </q-item>
                        </q-list>
                    </div>
                    <div class="col-xs-8">
                        <div v-if="model">
                            <div class="row q-mt-md">
                                <div class="col-xs-3">
                                    <img :src="photo(model.photo)" class="round-borders" width="200px"/>
                                </div>
                                <div class="col-xs-9">
                                    <h4>{{model.name}}</h4>
                                    <h5>{{model.organization}}</h5>
                                </div>
                            </div>
                            <q-table title="Team Members" class="q-mt-xl" :data="tableData" :columns="columns" row-key="name">
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
                    </div>
                </div>
            </q-page>
            <router-view></router-view>
        </q-page-container>
        <app-footer></app-footer>
    </q-layout>
</template>

<script>
    import AppHeader from '../components/context/AppHeader.vue'
    import AppFooter from '../components/context/AppFooter.vue'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data: () => ({
            columns: [
                {name: 'fullName', required: true, label: 'Name', align: 'left', field: 'fullName', sortable: true},
                {name: 'email', required: true, label: 'Email Address', field: 'email', sortable: true},
                {name: 'role', required: true, label: 'Team Role', field: 'role', sortable: true},
                {name: 'actions', align: 'right', label: ''},
            ],
            tableData: [
                {
                    fullName: 'Michael Nazaruk',
                    email: 'michaelnazaruk@gmail.com',
                    role: 'Admin'
                }
            ]
        }),
        computed: {
            ...mapGetters({
                'items': 'teams/items',
                'model': 'teams/recently'
            })
        },
        components: {AppHeader, AppFooter},
        methods: {
            ...mapActions({
                load: 'teams/get',
                remove: 'teams/remove'
            }),
            photo(path) {
                if (!path) {
                    return 'statics/team.png'
                }
                return process.env.API_HOST + path
            },
            flush(id) {
                this.confirm().then(() => {
                    this.remove(id).then(() => {
                        if (this.items.length === 0) {
                            return this.$router.push({name: 'home'})
                        }
                        return this.$router.push({name: 'view_team', params: {id: this.items[0].id}})
                    })
                }).catch(() => {
                })
            },
            isActive(item) {
                return item.id === parseInt(this.$route.params.id)
            },
            confirm() {
                return this.$q.dialog({
                    title: 'Prompt',
                    message: 'Are you sure?',
                    cancel: true,
                    color: 'secondary'
                });
            }
        }
    }
</script>
<style lang="scss">

</style>