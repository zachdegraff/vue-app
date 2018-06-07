import api from '../../api'

const loadHomeItems = (dispatch) => {
    dispatch('recentlyAdded');
    dispatch('recentlyUpdated');
    dispatch('collections/all', null, {root: true});
};

export const all = ({commit, rootGetters}, params = {}) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }
        params['teamId'] = team.id;
        commit('allStatusRequest');
        api.cards.all(params).then(res => {
            commit('allStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('allStatusFailure', err);
            reject(err)
        })
    });
};

export const get = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('getStatusRequest');
        api.cards.get(id).then(res => {
            commit('getStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('getStatusFailure', err);
            reject(err)
        })
    });
};

export const add = ({dispatch, commit}) => {
    dispatch('route/next', {name: 'create_card'}, {root: true});
    commit('changeAddingStatus', true);
}


export const closeAdding = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeAddingStatus', false);
};

export const edit = ({commit, dispatch}, id) => {
    dispatch('route/next', {name: 'edit_card', id}, {root: true});
    return new Promise((resolve, reject) => {
        commit('changeEditingStatus', true);
        dispatch('get', id).then(card => {
            commit('changeEditingCard', card);
            resolve(card)
        }).catch(reject);
    })
};

export const closeEditing = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeEditingStatus', false);
    commit('changeEditingCard', null);
};

export const view = ({commit, dispatch}, id) => {
    dispatch('route/next', {name: 'view_card', id}, {root: true});
    return new Promise((resolve, reject) => {
        commit('changeViewingStatus', true);
        dispatch('get', id).then(card => {
            commit('changeViewingCard', card);
            resolve(card)
        }).catch(reject);
    })
};

export const closeViewing = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeViewingStatus', false);
    commit('changeViewingCard', null);
};

export const create = ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
        commit('createStatusRequest');
        api.cards.create(data).then(res => {
            commit('createStatusSuccess', res);
            loadHomeItems(dispatch);
            resolve(res.data.data)
        }).catch(err => {
            commit('createStatusFailure', err);
            reject(err)
        })
    })
};

export const update = ({commit, dispatch}, {id, form}) => {
    return new Promise((resolve, reject) => {
        commit('updateStatusRequest');
        api.cards.update(id, form).then(res => {
            commit('updateStatusSuccess', res);
            loadHomeItems(dispatch);
            resolve(res.data.data)
        }).catch(err => {
            commit('updateStatusFailure', err);
            reject(err)
        })
    })
};

export const remove = ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
        commit('removeStatusRequest');
        api.cards.remove(id).then(res => {
            commit('removeStatusSuccess', res);
            loadHomeItems(dispatch);
            resolve(res.data)
        }).catch(err => {
            commit('removeStatusFailure', err);
            reject(err)
        })
    })
};

export const hints = ({commit, rootGetters}, params) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }
        params['teamId'] = team.id;
        commit('hintsStatusRequest');
        api.cards.hints(params).then(res => {
            commit('hintsStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('hintsStatusFailure', err);
            reject(err)
        })
    })
};

export const cardsHints = ({commit, rootGetters}, params) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }
        params['teamId'] = team.id;
        commit('hintsStatusRequest');
        api.cards.cardsHints(params).then(res => {
            commit('hintsStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('hintsStatusFailure', err);
            reject(err)
        })
    })
};

export const search = ({commit, rootGetters}, params) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }
        params['teamId'] = team.id;
        commit('searchStatusRequest');
        api.cards.search(params).then(res => {
            commit('searchStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('searchStatusFailure', err);
            reject(err)
        })
    })
};

export const recentlyAdded = ({commit, rootGetters}) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }
        commit('recentlyAddedStatusRequest');
        api.cards.recentlyAdded(team.id).then(res => {
            commit('recentlyAddedStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('recentlyAddedStatusFailure', err);
            reject(err)
        })
    })
};

export const recentlyUpdated = ({commit, rootGetters}) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }
        commit('recentlyUpdatedStatusRequest');
        api.cards.recentlyUpdated(team.id).then(res => {
            commit('recentlyUpdatedStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('recentlyUpdatedStatusFailure', err);
            reject(err)
        })
    })
};