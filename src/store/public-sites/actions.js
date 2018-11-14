import api from "../../api";

export const store = ({commit, dispatch, rootGetters}, data) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }
        data.append('teamId', team.id);
        commit('storeStatusRequest');
        api.publicSites.store(data).then(res => {
            commit('storeStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('storeStatusFailure', err);
            reject(err)
        })
    })
};

export const loadSite = ({commit}, link) => {
    return new Promise((resolve, reject) => {
        commit('loadSiteStatusRequest');
        api.publicSites.get(link).then(res => {
            commit('loadSiteStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadSiteStatusFailure', err);
            reject(err)
        })
    });
};

export const loadCards = ({commit}, link) => {
    return new Promise((resolve, reject) => {
        commit('loadCardsStatusRequest');
        api.publicSites.getSiteCards(link).then(res => {
            commit('loadCardsStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadCardsStatusFailure', err);
            reject(err)
        })
    });
};

export const loadSiteConfig = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('loadSiteConfigStatusRequest');
        api.publicSites.getSiteConfig(id).then(res => {
            commit('loadSiteConfigStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadSiteConfigStatusFailure', err);
            reject(err)
        })
    });
};

export const loadTeamSites = ({commit, rootGetters}, params = {}) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }
        params['teamId'] = team.id;
        commit('loadTeamSitesStatusRequest');
        api.publicSites.all(params).then(res => {
            commit('loadTeamSitesStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadTeamSitesStatusFailure', err);
            reject(err)
        })
    });
};