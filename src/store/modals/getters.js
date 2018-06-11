

export const isAskHelpOpen = state => state.askHelp.status;


export const getViewingCard = state => state.viewCard.card;
export const getEditingCard = state => state.editCard.card;

export const isCreateCardOpen = state => state.createCard.status;
export const isViewCardOpen = state => state.viewCard.status;
export const isEditCardOpen = state => state.editCard.status;


export const getEditingTeam = state => state.editTeam.team;

export const isEditTeamOpen = state => state.editTeam.status;
export const isCreateTeamOpen = state => state.createTeam.status;


export const isInviteMemberOpen = state => state.inviteMember.status;
export const isChangeMemberRoleOpen = state => state.changeMemberRole.status;

export const getInvitingTeam = state => state.inviteMember.team;
export const getChangingMember = state => state.changeMemberRole.member;