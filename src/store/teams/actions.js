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

export const edit = ({commit, dispatch}, id) => {

};

export const view = ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
        dispatch('get', id).then(team => {
            commit('changeViewingTeam', team);
            resolve(team)
        }).catch(err => reject(err));
        dispatch('members/loadTeamMembers', id, {root: true})
    })
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


export const setCurrentTeam = ({dispatch, commit}, id) => {
    localStorage.setItem('current-team', id);

    dispatch('get', id).then(team => commit('changeCurrentTeam', team));
};

export const addSlackIntegration = ({}, {id, code}) => {
    return new Promise((resolve, reject) => {
        TeamResource.slack(id, code)
            .then(req => resolve(req.data))
            .catch(err => reject(err))
    })
};

export const disableSlack = ({}, id) => {
    return new Promise((resolve, reject) => {
        TeamResource.disableSlack(id)
            .then(req => resolve(req.data))
            .catch(err => reject(err))
    })
};