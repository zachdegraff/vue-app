export const changeAskHelpStatus = (state, status) => state.askHelp.status = status;

export const changeCreateCardStatus = (state, status) => state.createCard.status = status;

export const changeViewCardStatus = (state, status) => state.viewCard.status = status;
export const changeEditCardStatus = (state, status) => state.editCard.status = status;

export const changeViewCardCard = (state, card) => state.viewCard.card = card;
export const changeEditCardCard = (state, card) => state.editCard.card = card;


export const changeCreateTeamStatus = (state, status) => state.createTeam.status = status;

export const changeEditTeamStatus = (state, status) => state.editTeam.status = status;
export const changeEditTeamTeam = (state, team) => state.editTeam.team = team;


export const changeInviteMemberStatus = (state, status) => state.inviteMember.status = status;
export const changeChangeMemberRoleStatus = (state, status) => state.changeMemberRole.status = status;

export const changeInviteMemberTeam = (state, team) => state.inviteMember.team = team;
export const changeChangeMemberRoleMember = (state, member) => state.changeMemberRole.member = member;

