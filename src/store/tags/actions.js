import api from "../../api";

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

export const flush = ({commit}) => {
    commit('flushTagsState')
};