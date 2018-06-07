import api from '../../api'

export const update = ({commit, dispatch}, {id, model}) => {
    return new Promise((resolve, reject) => {
        commit('updateStatusRequest');
        api.users.update(id, model).then(res => {
            commit('updateStatusSuccess', res);
            dispatch('auth/user', null, {root: true});
            resolve(res.data)
        }).catch(err => {
            commit('updateStatusFailure', err);
            reject(err)
        })
    })
};