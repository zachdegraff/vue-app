import api from "../../api";

export const load = ({commit, state, rootGetters}) => {
    if (state.page === state.lastPage) {
        return []
    }
    const team = rootGetters['teams/current'];
    if (team === null) {
        return []
    }

    return new Promise((resolve, reject) => {
        const page = state.page + 1;
        commit('loadStatusRequest');
        api.feed.load(team.id, {page}).then(res => {
            commit('loadStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadStatusFailure', err);
            reject(err)
        })
    })
};

export const fresh = ({commit, state, rootGetters}) => {
    const team = rootGetters['teams/current'];
    if (team === null) {
        return []
    }
    state.page = 0;
    return new Promise((resolve, reject) => {
        const page = state.page + 1;
        commit('freshStatusRequest');
        api.feed.load(team.id, {page}).then(res => {
            commit('freshStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('freshStatusFailure', err);
            reject(err)
        })
    })
};