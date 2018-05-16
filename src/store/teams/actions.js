import TeamResource from '../../resources/team/TeamResource'

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

export const members = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('membersStatusRequest');
        TeamResource.members(id).then(req => {
            commit('membersStatusSuccess');
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

export const recently = ({getters, commit}, id) => {
    const item = getters.getById(id);
    if (item !== undefined) {
        commit('changeRecentlyTeam', item)
    }
};