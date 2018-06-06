import UserResource from '../../resources/user/UserResource'

export const update = ({commit}, {id, model}) => {
    return new Promise((resolve, reject) => {
        commit('updateStatusRequest');
        UserResource.update(id, model).then(req => {
            commit('updateStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('updateStatusFailure', err);
            reject(err)
        })
    })
};