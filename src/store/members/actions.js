import api from "../../api";

export const invite = ({commit, dispatch, rootGetters}, id) => {
    dispatch('route/next', {name: 'invite_member', id}, {root: true});
    commit('changeInvitingStatus', true);
    commit('changeInvitingTeam', rootGetters['teams/getViewingTeam'])
};


export const closeInviting = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeInvitingStatus', false);
    commit('changeInvitingTeam', null);
};


export const changeRole = ({commit, dispatch, rootGetters}, id) => {
    const team = rootGetters['teams/getViewingTeam'];
    dispatch('route/next', {name: 'change_role', ...{id: team.id, memberId: id}}, {root: true});
    return new Promise((resolve, reject) => {
        commit('changeChangingStatus', true);
        dispatch('loadMember', id).then(member => {
            commit('changeChangingMember', member);
            resolve(member)
        }).catch(reject);
    })
};

export const closeChangingRole = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeChangingStatus', false);
    commit('changeChangingMember', null);
};

export const loadMember = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('loadMemberStatusRequest');
        api.members.get(id).then(res => {
            commit('loadMemberStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadMemberStatusFailure', err);
            reject(err)
        })
    });
};

export const loadTeamMembers = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('loadTeamMembersStatusRequest');
        api.teams.members(id).then(res => {
            commit('loadTeamMembersStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadTeamMembersStatusFailure', err);
            reject(err)
        })
    });
};


export const inviteMemberToTeam = ({commit, dispatch}, {id, params}) => {
    return new Promise((resolve, reject) => {
        commit('inviteMemberToTeamStatusRequest');
        api.members.invite(id, params).then(res => {
            commit('inviteMemberToTeamStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('inviteMemberToTeamStatusFailure', err);
            reject(err)
        })
    })
};

export const joinMemberToTeam = ({commit, dispatch}, hash) => {
    localStorage.removeItem('join-token');
    return new Promise((resolve, reject) => {
        commit('joinMemberToTeamStatusRequest');
        api.members.join(hash).then(res => {
            commit('joinMemberToTeamStatusSuccess', res);
            dispatch('all');
            resolve(res.data)
        }).catch(err => {
            commit('joinMemberToTeamStatusFailure', err);
            reject(err)
        })
    })
};

export const changeMemberRole = ({commit}, {id, role}) => {
    return new Promise((resolve, reject) => {
        commit('changeMemberRoleStatusRequest');
        api.members.changeRole(id, role).then(res => {
            commit('changeMemberRoleStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('changeMemberRoleStatusFailure', err);
            reject(err)
        })
    })
};

export const retryMemberInvitation = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('retryMemberInvitationStatusRequest');
        api.members.retry(id).then(res => {
            commit('retryMemberInvitationStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('retryMemberInvitationStatusFailure', err);
            reject(err)
        })
    })
};

export const excludeMemberFromTeam = ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
        commit('excludeMemberFromTeamStatusRequest');
        api.members.exclude(id).then(res => {
            commit('excludeMemberFromTeamStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('excludeMemberFromTeamStatusFailure', err);
            reject(err)
        })
    })
};