export const isAskHelpOpen = state => state.askHelp.status;
export const isCardsEditorOpen = state => state.cardsEditor.status;

export const isCreateTeamOpen = state => state.createTeam.status;

export const isEditCardTagOpen = state => state.editCardTag.status;
export const isCreateCardTagOpen = state => state.createCardTag.status;

export const isEditQuestionOpen = state => state.editQuestion.status;
export const isEditCommentOpen = state => state.editComment.status;

export const isInviteMemberOpen = state => state.inviteMember.status;
export const getInviteMemberTeamId = state => state.inviteMember.teamId;

export const isChangeMemberRoleOpen = state => state.changeMemberRole.status;
export const getChangeRoleMemberId = state => state.changeMemberRole.memberId;
