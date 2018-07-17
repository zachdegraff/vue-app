
export const isAskHelpOpen = state => state.askHelp.status;
export const isCardsEditorOpen = state => state.cardsEditor.status;

export const isEditTeamOpen = state => state.editTeam.status;
export const isCreateTeamOpen = state => state.createTeam.status;

export const isInviteMemberOpen = state => state.inviteMember.status;
export const isChangeMemberRoleOpen = state => state.changeMemberRole.status;

export const getCreateCardParams = state => state.createCard.params;