import CardResource from '../../resources/card/CardResource'

export const all = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('allStatusRequest');
        CardResource.all().then(req => {
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
        CardResource.get(id).then(req => {
            commit('getStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('getStatusFailure', err);
            reject(err)
        })
    });
};

export const create = ({commit}, data) => {
    return new Promise((resolve, reject) => {
        commit('createStatusRequest');
        CardResource.create(data).then(req => {
            commit('createStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('createStatusFailure', err);
            reject(err)
        })
    })
};

export const update = ({commit}, id, data) => {
    return new Promise((resolve, reject) => {
        commit('updateStatusRequest');
        CardResource.update(id, data).then(req => {
            commit('updateStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('updateStatusFailure', err);
            reject(err)
        })
    })
};