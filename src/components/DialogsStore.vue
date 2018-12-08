<template>
    <div>
        <ask-help v-if="isAskHelpOpen"/>
        <cards-editor v-if="isCardsEditorOpen"/>
        <create-card-tag v-if="isCreateCardTagOpen"/>
        <edit-card-tag v-if="isEditCardTagOpen"/>
        <edit-question v-if="isEditQuestionOpen"/>
        <edit-comment v-if="isEditCommentOpen"/>
        <invite-member v-if="isMemberInviting"/>
        <change-role v-if="isChangingRole"/>
        <create-team v-if="isTeamAdding"/>
    </div>
</template>
<script>
    import CardsEditor from './card/CardsEditor'
    import EditCardTag from './card/EditCardTag'
    import InviteMember from './team/InviteMember'
    import CreateCardTag from './card/CreateCardTag'
    import EditComment from './question/EditComment'
    import EditQuestion from './question/EditQuestion'
    import AskHelp from '../components/team/AskHelp.vue'
    import ChangeRole from '../components/team/ChangeRole.vue'
    import CreateTeam from '../components/team/CreateTeam.vue'
    import {mapGetters} from 'vuex'

    export default {
        data: () => {
            return {}
        },
        computed: {
            ...mapGetters({
                isAskHelpOpen: 'modals/isAskHelpOpen',
                isCardsEditorOpen: 'modals/isCardsEditorOpen',
                isChangingRole: 'modals/isChangeMemberRoleOpen',
                isCreateCardTagOpen: 'modals/isCreateCardTagOpen',
                isEditCardTagOpen: 'modals/isEditCardTagOpen',
                isEditCommentOpen: 'modals/isEditCommentOpen',
                isEditQuestionOpen: 'modals/isEditQuestionOpen',
                isMemberInviting: 'modals/isInviteMemberOpen',
                isTeamAdding: 'modals/isCreateTeamOpen'
            })
        },
        components: {
            EditComment,
            EditQuestion,
            EditCardTag,
            CreateCardTag,
            AskHelp,
            CardsEditor,
            InviteMember,
            ChangeRole,
            CreateTeam
        }
    }
</script>