import api from "../../api";

export const all = ({commit, rootGetters}) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }
        commit('forTeamStatusRequest');
        api.collections.forTeam(team.id).then(res => {
            commit('forTeamStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('forTeamStatusFailure', err);
            reject(err)
        })
    })
};