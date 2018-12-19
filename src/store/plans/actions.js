import api from "../../api";

export const get = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('getStatusRequest');
        api.plans.get(id).then(res => {
            commit('getStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('getStatusFailure', err);
            reject(err)
        })
    });
};

export const all = ({commit}, params = {}) => {
    return new Promise((resolve, reject) => {
        commit('allStatusRequest');
        api.plans.all(params).then(res => {
            commit('allStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('allStatusFailure', err);
            reject(err)
        })
    })
};

export const create = ({commit, dispatch}, params) => {
    return new Promise((resolve, reject) => {
        commit('createStatusRequest');
        api.plans.store(params).then(res => {
            commit('createStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('createStatusFailure', err);
            reject(err)
        })
    })
};

export const update = ({commit, dispatch, rootGetters}, {id, params}) => {
    return new Promise((resolve, reject) => {
        commit('updateStatusRequest');
        api.plans.update(id, params).then(res => {
            commit('updateStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('updateStatusFailure', err);
            reject(err)
        })
    })
};

export const remove = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('removeStatusRequest');
        api.plans.remove(id).then(res => {
            commit('removeStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('removeStatusFailure', err);
            reject(err)
        })
    })
};