import api from '../../api'

const loadHomeItems = (dispatch) => {
    dispatch('cardsAmount');
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

export const create = ({commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
        commit('createStatusRequest');
        api.cards.create(data).then(res => {
            commit('createStatusSuccess', res);
            loadHomeItems(dispatch);
            resolve(res.data)
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
            dispatch('search/changeCardInResults', {card: res.data.card}, {root: true});
            commit('updateStatusSuccess', res);
            loadHomeItems(dispatch);
            resolve(res.data)
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

export const flush = ({commit}) => {
    commit('flushCardsState')
};

export const cardsAmount = ({commit, rootGetters}) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve(0)
        }
        commit('cardsAmountStatusRequest');
        api.cards.count({teamId: team.id}).then(res => {
            commit('cardsAmountStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('cardsAmountStatusFailure', err);
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

export const changeViewingCard = ({commit, dispatch, getters}, id) => {
    if (id === null) {
        commit('changeViewingCard', null);
        const card = getters['getViewingCard'];
        if (card !== null) {
            dispatch('modals/openPrevCard', null, {root: true});
        }
        return;
    }
    dispatch('get', id).then(card => commit('changeViewingCard', card))
};

export const changeEditingCard = ({commit, dispatch}, id) => {
    if (id === null) {
        return commit('changeEditingCard', null);
    }
    dispatch('get', id).then(card => commit('changeEditingCard', card))
};