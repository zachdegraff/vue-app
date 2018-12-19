import api from '../../api'

function loadDefaults(dispatch) {
    dispatch('tags/all', null, {root: true});
    dispatch('feed/fresh', null, {root: true});
    dispatch('cards/recently', null, {root: true});
    dispatch('subscription/load', null, {root: true});
}

export const all = ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
        commit('allStatusRequest');
        api.teams.all().then(res => {
            commit('allStatusSuccess', res);
            loadDefaults(dispatch);
            resolve(res.data.data)
        }).catch(err => {
            commit('allStatusFailure', err);
            reject(err)
        })
    });
};

export const flush = ({commit}) => {
    commit('flushState')
};

export const allTeams = ({commit}) => {
    return new Promise((resolve, reject) => {
        api.teams.allTeams().then(res => {
            commit('allStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            reject(err)
        })
    });
};

export const get = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('getStatusRequest');
        api.teams.get(id).then(res => {
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
        api.teams.create(data).then(res => {
            dispatch('changeCurrentTeam', res.data.team.id);
            commit('createStatusSuccess', res);
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
        api.teams.update(id, form).then(res => {
            dispatch('changeCurrentTeam', res.data.team.id);
            commit('updateStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('updateStatusFailure', err);
            reject(err)
        })
    })
};

export const remove = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('removeStatusRequest');
        api.teams.remove(id).then(res => {
            commit('removeStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('removeStatusFailure', err);
            reject(err)
        })
    })
};

export const reloadCurrentTeam = ({dispatch, commit, getters}) => {
    const current = getters['current'];
    if (current === null) return;

    dispatch('get', current.id).then(team => commit('changeCurrentTeam', team));
};

export const changeCurrentTeam = ({dispatch, commit, getters}, id) => {
    const current = getters['current'];
    if (current === null || current.id === id) return;

    localStorage.setItem('current-team', id);

    const team = getters['getById'](id);
    if (team) {
        commit('changeCurrentTeam', team);
        loadDefaults(dispatch)
    }
};

export const addSlackIntegration = ({commit}, {id, code}) => {
    return new Promise((resolve, reject) => {
        commit('addSlackStatusRequest');
        api.teams.slack(id, code).then(res => {
            commit('addSlackStatusSuccess');
            resolve(res.data)
        }).catch(err => {
            commit('addSlackStatusFailure');
            reject(err)
        })
    })
};

export const disableSlack = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('disableSlackStatusRequest');
        api.teams.disableSlack(id).then(res => {
            commit('disableSlackStatusSuccess');
            resolve(res.data)
        }).catch(err => {
            commit('disableSlackStatusFailure');
            reject(err)
        })
    })
};