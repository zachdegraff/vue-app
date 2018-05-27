import TeamResource from '../../resources/team/TeamResource'
import TeamMemberResource from '../../resources/team/TeamMemberResource'

export const all = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('allStatusRequest');
        TeamResource.all().then(req => {
            commit('allStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('allStatusFailure', err);
            reject(err)
        })
    });
};

export const get = ({getters, commit}, id) => {
    return new Promise((resolve, reject) => {
        const card = getters.getById(id);
        if (card !== undefined) {
            return resolve(card)
        }
        commit('getStatusRequest');
        TeamResource.get(id).then(req => {
            commit('getStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('getStatusFailure', err);
            reject(err)
        })
    });
};

export const member = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        TeamMemberResource.get(id).then(req => {
            resolve(req.data.data)
        }).catch(err => reject(err))
    });
};

export const members = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('membersStatusRequest');
        TeamResource.members(id).then(req => {
            commit('membersStatusSuccess', {id, req});
            resolve(req.data.data)
        }).catch(err => {
            commit('membersStatusFailure', err);
            reject(err)
        })
    });
};

export const create = ({commit}, data) => {
    return new Promise((resolve, reject) => {
        commit('createStatusRequest');
        TeamResource.create(data).then(req => {
            commit('createStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('createStatusFailure', err);
            reject(err)
        })
    })
};

export const update = ({commit}, {id, model}) => {
    return new Promise((resolve, reject) => {
        commit('updateStatusRequest');
        TeamResource.update(id, model).then(req => {
            commit('updateStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('updateStatusFailure', err);
            reject(err)
        })
    })
};

export const remove = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('removeStatusRequest');
        TeamResource.delete(id).then(req => {
            commit('removeStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('removeStatusFailure', err);
            reject(err)
        })
    })
};

export const invite = ({commit, dispatch}, {id, params}) => {
    return new Promise((resolve, reject) => {
        commit('inviteStatusRequest');
        TeamMemberResource.invite(id, params).then(req => {
            commit('inviteStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('inviteStatusFailure', err);
            reject(err)
        })
    })
};

export const join = ({commit, dispatch}, hash) => {
    localStorage.removeItem('join-token');
    return new Promise((resolve, reject) => {
        commit('joinStatusRequest');
        TeamMemberResource.join(hash).then(req => {
            commit('joinStatusSuccess', req);
            dispatch('all');
            resolve(req.data)
        }).catch(err => {
            commit('joinStatusFailure', err);
            reject(err)
        })
    })
};

export const changeRole = ({commit}, {id, role}) => {
    return new Promise((resolve, reject) => {
        commit('changeRoleStatusRequest');
        TeamMemberResource.changeRole(id, role).then(req => {
            commit('changeRoleStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('changeRoleStatusFailure', err);
            reject(err)
        })
    })
};

export const retryInvitation = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        TeamMemberResource.retry(id).then(req => {
            resolve(req.data)
        }).catch(err => {
            reject(err)
        })
    })
};

export const exclude = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('excludeStatusRequest');
        TeamMemberResource.exclude(id).then(req => {
            commit('excludeStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('excludeStatusFailure', err);
            reject(err)
        })
    })
};

export const current = ({getters, commit}, id) => {
    const item = getters.getById(id);
    if (item !== undefined) {
        commit('changeCurrentTeam', item)
    }
};