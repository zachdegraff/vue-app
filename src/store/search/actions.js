import api from "../../api";

export const changeQuery = ({commit}, query) => {
    commit('setQuery', query)
};

export const changeCardInResults = ({commit}, card) => {
    commit('updateCardInResults', card)
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

export const index = ({commit, rootGetters}, id) => {
    return new Promise((resolve, reject) => {
        commit('indexStatusRequest');
        api.cards.index({teamId: id}).then(res => {
            commit('indexStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('indexStatusFailure', err);
            reject(err)
        })
    })
};

export const search = ({commit, rootGetters}, params = {}) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }

        commit('searchStatusRequest');

        params['teamId'] = team.id;
        params['query'] = rootGetters['search/getQuery'];
        api.cards.search(params).then(res => {
            commit('searchStatusSuccess', res);
            resolve(res.data.data || [])
        }).catch(err => {
            commit('searchStatusFailure', err);
            reject(err)
        })
    })
};