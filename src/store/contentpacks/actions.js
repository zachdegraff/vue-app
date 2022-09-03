import api from '../../api'

export const subscribe = ({commit, dispatch}, params) => {

    return new Promise((resolve, reject) => {
        api.contentpacks.subscribe(params.contentPack.id, params.team).then(res => {
            commit('subscribeToContentPackSuccess', params.contentPack);
            resolve(res.data)
        }).catch(err => {
            commit('subscibefailure');
            reject(err)
        })
    })
};

export const unsubscribe = ({commit, dispatch}, params) => {
    return new Promise((resolve, reject) => {
        api.contentpacks.unsubscribe(params.id, params.team).then(res => {
            commit('unsubscribeToContentPackSuccess', params.id);
            resolve(res.data)
        }).catch(err => {
            commit('unsubscibefailure');
            reject(err)
        })
    })
};

export const flushToDefaults = ({commit}) => {
    commit('flushState')
};

export const loadItems = ({commit, state}, params) => {
    return new Promise((resolve, reject) => {
        api.contentpacks.items(params.id, params.page).then(res => {
            commit('loadContentPackItemsSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            reject(err)
        })
    })
};

export const loadContentPacks = ({commit, state, rootGetters}) => {
    const team = rootGetters['teams/current'];
    if (team === null) {
        return []
    }


    if (state.contentPacksLastPage != null && state.contentPacksPage > state.contentPacksLastPage) {
        return []
    }

    return new Promise((resolve, reject) => {
        const page = state.contentPacksPage + 1;
        commit('loadSubscribedCPsStatusRequest');
        api.contentpacks.all({teamId: team.id, page: page}).then(res => {
            commit('loadCPsStatusSuccess', res);
            let subscribed = [];
            res.data.data.forEach((element) => {
                if (element.subscribed) {
                    subscribed.push(element)
                }
            })

            subscribed.length > 0 ? commit('loadUserContentPacksStatusSuccess', subscribed) : null;

            resolve(res.data.data)
        }).catch(err => {
            commit('loadCPsStatusFailure', err);
            reject(err)
        })
    })
};

export const setActiveContentPack = ({commit, state, getters}, params) => {
    let contentPacks = getters.getContentPacks;
}
