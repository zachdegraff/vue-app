<template>
    <q-modal v-model="isOpen" @hide="$emit('closed')" class="app-modal" :content-classes="['app-modal-invite']">
        <app-modal-layout>
            <q-toolbar slot="header">
                <q-toolbar-title>Change member role</q-toolbar-title>
                <q-btn flat icon="close" @click="isOpen=false" class="float-right"/>
            </q-toolbar>
            <div class="row text-center q-py-xl" v-if="isMemberLoading">
                <div class="col">
                    <q-spinner :size="50" color="red"></q-spinner>
                </div>
            </div>
            <div class="row q-py-xl flex-center" v-show="!isMemberLoading">
                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
                    <q-field class="q-py-sm">
                        <q-select v-model="role" :options="options" radio/>
                    </q-field>
                    <div class="q-pt-lg text-center">
                        <q-btn color="primary" label="change" @click="submit" :disabled="isProcessing"/>
                    </div>
                </div>
            </div>
        </app-modal-layout>
    </q-modal>
</template>
<script>
    import AppModalLayout from '../../components/context/modal/AppModalLayout'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: {
            id: {
                required: true
            },
            memberId: {
                required: true
            },
        },
        data: () => {
            return {
                role: 2,
                options: [
                    {
                        label: 'Viewer',
                        value: 'Viewer'
                    },
                    {
                        label: 'Contributor',
                        value: 'Contributor'
                    },
                ],
                isOpen: true
            }
        },
        computed: {
            ...mapGetters({
                isProcessing: 'members/isChangingRole',
                isMemberLoading: 'members/isMemberLoading'
            })
        },
        components: {
            AppModalLayout
        },
        created() {
            document.title = 'Change member role - Wonderus';
            this.loadMember(this.memberId).then(member => this.role = member.role)
        },
        methods: {
            ...mapActions({
                loadMember: 'members/loadMember',
                changeRole: 'members/changeMemberRole'
            }),
            submit() {
                this.changeRole({id: this.memberId, role: this.role}).then(() => this.$emit('closed'))
            }
        }
    }
</script>
<style lang="scss">
    .app-modal {
        .app-modal-invite {
            top: 100px;
            left: 50%;
            max-width: 600px;
            margin: 0 0 100px -300px;
            overflow: visible;
            max-height: none;
        }
    }

    @media (max-width: 767px) {
        .app-modal {
            .app-modal-invite {
                top: 0;
                left: 0;
                margin: 0;
                overflow: auto;
            }
        }
    }
</style>