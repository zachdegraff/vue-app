import api from "../../api";


export const get = ({commit, dispatch}, {question, id}) => {
    return new Promise((resolve, reject) => {
        commit('getStatusRequest');
        api.comments.get(question, id).then(res => {
            commit('getStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('getStatusFailure');
            reject(err)
        })
    })
};

export const edit = ({commit, dispatch}, comment) => {
    commit('changeEditingComment', comment);
    dispatch('modals/openEditComment', null, {root: true})
};

export const store = ({commit, dispatch}, {id, ...params}) => {
    return new Promise((resolve, reject) => {
        commit('storeStatusRequest');
        api.comments.store(id, params).then(res => {
            commit('storeStatusSuccess');
            resolve(res.data)
        }).catch(err => {
            commit('storeStatusFailure');
            reject(err)
        })
    })
};

export const remove = ({commit, dispatch}, {question, id}) => {
    return new Promise((resolve, reject) => {
        commit('removeStatusRequest');
        api.comments.remove(question, id).then(res => {
            dispatch('questions/removeQuestionComment', res.data.comment, {root: true});
            commit('removeStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('removeStatusFailure', err);
            reject(err)
        })
    })
};

export const update = ({commit, dispatch}, {question, id, ...params}) => {
    return new Promise((resolve, reject) => {
        commit('updateStatusRequest');
        api.comments.update(question, id, params).then(res => {
            commit('updateStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('updateStatusFailure');
            reject(err)
        })
    })
};