import TeamResource from "../../resources/team/TeamResource";
import TeamMemberResource from "../../resources/team/TeamMemberResource";


export const loadMember = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('loadMemberStatusRequest');
        TeamMemberResource.get(id).then(req => {
            commit('loadMemberStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('loadMemberStatusFailure', err);
            reject(err)
        })
    });
};

export const loadTeamMembers = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('loadTeamMembersStatusRequest');
        TeamResource.members(id).then(req => {
            commit('loadTeamMembersStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('loadTeamMembersStatusFailure', err);
            reject(err)
        })
    });
};


export const inviteNewMemberToTeam = ({commit, dispatch}, {id, params}) => {
    return new Promise((resolve, reject) => {
        commit('inviteMemberToTeamStatusRequest');
        TeamMemberResource.invite(id, params).then(req => {
            commit('inviteMemberToTeamStatusSuccess', req);
            resolve(req.data)
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
        TeamMemberResource.join(hash).then(req => {
            commit('joinMemberToTeamStatusSuccess', req);
            dispatch('all');
            resolve(req.data)
        }).catch(err => {
            commit('joinMemberToTeamStatusFailure', err);
            reject(err)
        })
    })
};

export const changeMemberRole = ({commit}, {id, role}) => {
    return new Promise((resolve, reject) => {
        commit('changeMemberRoleStatusRequest');
        TeamMemberResource.changeRole(id, role).then(req => {
            commit('changeMemberRoleStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('changeMemberRoleStatusFailure', err);
            reject(err)
        })
    })
};

export const retryMemberInvitation = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('retryMemberInvitationStatusRequest');
        TeamMemberResource.retry(id).then(req => {
            commit('retryMemberInvitationStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('retryMemberInvitationStatusFailure', err);
            reject(err)
        })
    })
};

export const excludeMemberFromTeam = ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
        commit('excludeMemberFromTeamStatusRequest');
        TeamMemberResource.exclude(id).then(req => {
            commit('excludeMemberFromTeamStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('excludeMemberFromTeamStatusFailure', err);
            reject(err)
        })
    })
};