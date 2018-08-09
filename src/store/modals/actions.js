export const openAskHelp = ({dispatch, commit}) => {
    dispatch('route/next', {name: 'ask_help'}, {root: true});
    commit('changeAskHelpStatus', true);
};

export const closeAskHelp = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeAskHelpStatus', false);
};

export const openCardsEditor = ({commit, dispatch}, id) => {
    dispatch('route/next', {name: 'view_card', id}, {root: true});
    dispatch('editor/open', id, {root: true});
    commit('changeCardsEditorStatus', true);
};
export const closeCardsEditor = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    dispatch('editor/close', null, {root: true});
    commit('changeCardsEditorStatus', false);
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

export const openCreateCardTag = ({commit, dispatch}, id) => {
    dispatch('route/next', {name: 'create_card_tag', id}, {root: true});
    commit('changeCreateCardTagStatus', true);
};
export const closeCreateCardTag = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeCreateCardTagStatus', false);
};

export const openEditCardTag = ({commit, dispatch}, slug) => {
    dispatch('route/next', {name: 'edit_card_tag', slug}, {root: true});
    commit('changeEditCardTagStatus', true);
};
export const closeEditCardTag = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeEditCardTagStatus', false);
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