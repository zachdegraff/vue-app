import api from '../../api'

export const count = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        commit('countStatusRequest');
        api.users.count(params).then(res => {
            commit('countStatusSuccess', res);
            resolve(res.data.count)
        }).catch(err => {
            commit('countStatusFailure', err);
            reject(err)
        })
    })
};

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


export const favorite = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('favoriteStatusRequest');
        api.users.toggleFavoriteCard(id).then(res => {
            commit('favoriteStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('favoriteStatusFailure', err);
            reject(err)
        })
    })
};


export const loadRoles = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('loadRolesStatusRequest');
        api.users.roles().then(res => {
            commit('loadRolesStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('loadRolesStatusFailure', err);
            reject(err)
        })
    })
};

export const loadFavorite = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('loadFavoriteStatusRequest');
        api.users.getFavoriteCards().then(res => {
            commit('loadFavoriteStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadFavoriteStatusFailure', err);
            reject(err)
        })
    })
};