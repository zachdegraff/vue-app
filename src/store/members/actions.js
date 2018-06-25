import api from "../../api";

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

export const loadInvitation = ({commit}) => {
    return new Promise((resolve, reject) => {
        const hash = localStorage.getItem('join-token');
        if (hash === null) {
            return resolve(null)
        }
        commit('loadInvitationStatusRequest');
        api.members.invitation(hash).then(res => {
            commit('loadInvitationStatusSuccess', res);
            resolve(res)
        }).catch(err => {
            commit('loadInvitationStatusFailure', err);
            reject(err)
        })
    })
};

export const changeEditingMember = ({commit, dispatch}, id) => {
    dispatch('loadMember', id).then(member => commit('changeEditingMember', member))
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