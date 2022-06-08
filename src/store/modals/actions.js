export const openAskHelp = ({dispatch, commit}, params) => {
    dispatch('route/next', {name: 'ask_help', params}, {root: true});
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

export const openEditQuestion = ({commit, dispatch}) => {
    commit('changeEditQuestionStatus', true)
};
export const closeEditQuestion = ({dispatch, commit}) => {
    commit('changeEditQuestionStatus', false)
};

export const openEditComment = ({commit, dispatch}) => {
    commit('changeEditCommentStatus', true)
};
export const closeEditComment = ({dispatch, commit}) => {
    commit('changeEditCommentStatus', false)
};

export const openInviteMember = ({commit, dispatch}, id) => {
    dispatch('route/next', {name: 'invite_member', id}, {root: true});
    commit('changeInviteMemberTeamId', id);
    commit('changeInviteMemberStatus', true);
};
export const closeInviteMember = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeInviteMemberStatus', false);
};

export const openChangeMemberRole = ({commit, dispatch, rootGetters}, {teamId, memberId}) => {
    dispatch('route/next', {name: 'change_role', ...{id: teamId, memberId: memberId}}, {root: true});
    commit('changeChangeMemberRoleMemberId', memberId);
    commit('changeChangeMemberRoleStatus', true);
};
export const closeChangeMemberRole = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeChangeMemberRoleStatus', false);
};
