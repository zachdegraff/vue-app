import api from '../../api'

function loadDefaults(dispatch) {
    dispatch('cards/recentlyAdded', {}, {root: true});
    dispatch('cards/recentlyUpdated', {}, {root: true});
    dispatch('collections/all', {}, {root: true});
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

export const get = ({getters, commit}, id) => {
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

export const add = ({dispatch, commit, getters}) => {
    dispatch('route/next', {name: 'create_team'}, {root: true});
    commit('changeAddingStatus', true);
};


export const closeAdding = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeAddingStatus', false);
};

export const edit = ({commit, dispatch}, id) => {
    dispatch('route/next', {name: 'edit_team', id}, {root: true});
    return new Promise((resolve, reject) => {
        commit('changeEditingStatus', true);
        dispatch('get', id).then(team => {
            commit('changeEditingTeam', team);
            resolve(team)
        }).catch(reject);
    })
};

export const closeEditing = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeEditingStatus', false);
    commit('changeEditingTeam', null);
};

export const view = ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
        commit('changeViewingStatus', true);
        dispatch('get', id).then(team => {
            commit('changeViewingTeam', team);
            resolve(team)
        }).catch(reject);
        dispatch('members/loadTeamMembers', id, {root: true})
    })
};

export const create = ({commit}, data) => {
    return new Promise((resolve, reject) => {
        commit('createStatusRequest');
        api.teams.create(data).then(res => {
            commit('createStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('createStatusFailure', err);
            reject(err)
        })
    })
};

export const update = ({commit}, {id, model}) => {
    return new Promise((resolve, reject) => {
        commit('updateStatusRequest');
        api.teams.update(id, model).then(res => {
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

export const changeCurrentTeam = ({dispatch, commit, getters}, id) => {
    const current = getters['current'];
    if (current === null || current.id === id) return;

    localStorage.setItem('current-team', id);

    dispatch('get', id).then(team => {
        commit('changeCurrentTeam', team);
        loadDefaults(dispatch)
    });
};

export const askHelp = ({commit}, {id, ...params}) => {
    return new Promise((resolve, reject) => {
        commit('askHelpStatusRequest');
        api.teams.askHelp(id, params).then(res => {
            commit('askHelpStatusSuccess');
            resolve(res.data)
        }).catch(err => {
            commit('askHelpStatusFailure');
            reject(err)
        })
    })
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