import api from "../../api";

export const get = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('getStatusRequest');
        api.note.get(id).then(res => {
            commit('getStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('getStatusFailure', err);
            reject(err)
        })
    })
};

export const store = ({commit}, {id, note}) => {
    return new Promise((resolve, reject) => {
        commit('storeStatusRequest');
        api.note.store(id, {note}).then(res => {
            commit('storeStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('storeStatusFailure', err);
            reject(err)
        })
    })
};