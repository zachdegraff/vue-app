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
    return new Promise((resolve, reject) => {
        commit('changeEditCardStatus', true);
        dispatch('cards/get', id, {root: true}).then(card => {
            commit('changeEditCardCard', card);
            resolve(card)
        }).catch(reject);
    })
};

export const closeEditCard = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeEditCardStatus', false);
    commit('changeEditCardCard', null);
};


export const openViewCard = ({commit, dispatch}, id) => {
    dispatch('route/next', {name: 'view_card', id}, {root: true});
    return new Promise((resolve, reject) => {
        commit('changeViewCardStatus', true);
        dispatch('cards/get', id, {root: true}).then(card => {
            commit('changeViewCardCard', card);
            resolve(card)
        }).catch(reject);
    })
};

export const closeViewCard = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeViewCardStatus', false);
    commit('changeViewCardCard', null);
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
    return new Promise((resolve, reject) => {
        commit('changeEditTeamStatus', true);
        dispatch('teams/get', id, {root: true}).then(team => {
            commit('changeEditTeamTeam', team);
            resolve(team)
        }).catch(reject);
    })
};

export const closeEditTeam = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeEditTeamStatus', false);
    commit('changeEditTeamTeam', null);
};

export const openInviteMember = ({commit, dispatch, rootGetters}, id) => {
    dispatch('route/next', {name: 'invite_member', id}, {root: true});
    commit('changeInviteMemberStatus', true);
    commit('changeInviteMemberTeam', rootGetters['teams/getViewingTeam'])
};


export const closeInviteMember = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeInviteMemberStatus', false);
    commit('changeInviteMemberTeam', null);
};


export const openChangeMemberRole = ({commit, dispatch, rootGetters}, id) => {
    const team = rootGetters['teams/getViewingTeam'];
    dispatch('route/next', {name: 'change_role', ...{id: team.id, memberId: id}}, {root: true});
    return new Promise((resolve, reject) => {
        commit('changeChangeMemberRoleStatus', true);
        dispatch('members/loadMember', id, {root: true}).then(member => {
            commit('changeChangeMemberRoleMember', member);
            resolve(member)
        }).catch(reject);
    })
};

export const closeChangeMemberRole = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeChangeMemberRoleStatus', false);
    commit('changeChangeMemberRoleMember', null);
};