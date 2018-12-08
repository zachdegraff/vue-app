export const changeAskHelpStatus = (state, status) => state.askHelp.status = status;

export const changeCardsEditorStatus = (state, status) => state.cardsEditor.status = status;

export const changeCreateTeamStatus = (state, status) => state.createTeam.status = status;

export const changeCreateCardTagStatus = (state, status) => state.createCardTag.status = status;
export const changeEditCardTagStatus = (state, status) => state.editCardTag.status = status;

export const changeEditQuestionStatus = (state, status) => state.editQuestion.status = status;
export const changeEditCommentStatus = (state, status) => state.editComment.status = status;

export const changeInviteMemberTeamId = (state, id) => state.inviteMember.teamId = id;
export const changeInviteMemberStatus = (state, status) => state.inviteMember.status = status;

export const changeChangeMemberRoleMemberId = (state, id) => state.changeMemberRole.memberId = id;
export const changeChangeMemberRoleStatus = (state, status) => state.changeMemberRole.status = status;

