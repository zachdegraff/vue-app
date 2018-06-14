export const openAskHelp = ({dispatch, commit}) => {
    dispatch('route/next', {name: 'ask_help'}, {root: true});
    commit('changeAskHelpStatus', true);
};

export const closeAskHelp = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeAskHelpStatus', false);
};


export const openCreateCard = ({dispatch, commit}) => {
    dispatch('route/next', {name: 'create_card'}, {root: true});
    commit('changeCreateCardStatus', true);
};
export const openCreateCardWithName = ({dispatch, commit}, param) => {
    dispatch('route/next', {name: 'create_card_name', ...param}, {root: true});
    commit('changeCreateCardStatus', true);
};
export const closeCreateCard = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeCreateCardStatus', false);
};


export const openEditCard = ({commit, dispatch}, id) => {
    dispatch('route/next', {name: 'edit_card', id}, {root: true});
    dispatch('cards/changeEditingCard', id, {root: true});
    commit('changeEditCardStatus', true);
};
export const closeEditCard = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    dispatch('cards/changeEditingCard', null, {root: true});
    commit('changeEditCardStatus', false);
};


export const openViewCard = ({commit, dispatch}, id) => {
    dispatch('route/next', {name: 'view_card', id}, {root: true});
    dispatch('cards/changeViewingCard', id, {root: true});
    commit('changeViewCardStatus', true);
};
export const closeViewCard = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    dispatch('cards/changeViewingCard', null, {root: true});
    commit('changeViewCardStatus', false);
};


export const openCreateTeam = ({dispatch, commit}) => {
    dispatch('route/next', {name: 'create_team'}, {root: true});
    commit('changeCreateTeamStatus', true);
};
export const closeCreateTeam = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeCreateTeamStatus', false);
};


export const openEditTeam = ({commit, dispatch}, id) => {
    dispatch('route/next', {name: 'edit_team', id}, {root: true});
    dispatch('teams/changeEditingTeam', id, {root: true});
    commit('changeEditTeamStatus', true);
};
export const closeEditTeam = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeEditTeamStatus', false);
};


export const openInviteMember = ({commit, dispatch, rootGetters}, id) => {
    dispatch('route/next', {name: 'invite_member', id}, {root: true});
    commit('changeInviteMemberStatus', true);
};
export const closeInviteMember = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeInviteMemberStatus', false);
};


export const openChangeMemberRole = ({commit, dispatch, rootGetters}, {teamId, memberId}) => {
    dispatch('route/next', {name: 'change_role', ...{id: teamId, memberId: memberId}}, {root: true});
    dispatch('members/changeEditingMember', memberId, {root: true});
    commit('changeChangeMemberRoleStatus', true);
};
export const closeChangeMemberRole = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeChangeMemberRoleStatus', false);
};