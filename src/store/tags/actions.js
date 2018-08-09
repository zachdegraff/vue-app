import api from "../../api";

export const get = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('getStatusRequest');
        api.tags.get(id).then(res => {
            commit('getStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('getStatusFailure', err);
            reject(err)
        })
    });
};

export const all = ({commit, rootGetters}) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }
        commit('allStatusRequest');
        api.tags.forTeam(team.id).then(res => {
            commit('allStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('allStatusFailure', err);
            reject(err)
        })
    })
};

export const edit = ({commit, dispatch}, tag) => {
    commit('changeEditingTag', tag);
    dispatch('modals/openEditCardTag', tag.name, {root: true})
};

export const create = ({commit, dispatch, rootGetters}, data) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (!team) {
            return alert('Active team is missing')
        }
        commit('createStatusRequest');
        api.tags.create(team.id, data).then(res => {
            commit('createStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('createStatusFailure', err);
            reject(err)
        })
    })
};

export const update = ({commit, dispatch, rootGetters}, {id, form}) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (!team) {
            return alert('Active team is missing')
        }
        commit('updateStatusRequest');
        api.tags.update(team.id, id, form).then(res => {
            commit('updateStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('updateStatusFailure', err);
            reject(err)
        })
    })
};

export const remove = ({commit, dispatch, rootGetters}, id) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (!team) {
            return alert('Active team is missing')
        }
        commit('removeStatusRequest');
        api.tags.remove(team.id, id).then(res => {
            commit('removeStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('removeStatusFailure', err);
            reject(err)
        })
    })
};

export const flush = ({commit}) => commit('flushTagsState');

export const changeEditingTeam = ({commit, dispatch}, id) => {
    commit('changeEditingTag', null);
    dispatch('get', id).then(tag => commit('changeEditingTag', tag))
};