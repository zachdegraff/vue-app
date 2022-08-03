import api from '../../api'

export const all = ({commit, rootGetters}, params) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['contentpacks'];
        if (team === null) {
            resolve([])
        }
        commit('allStatusRequest');
        api.contentpacks.all(team.id, params).then(res => {
            commit('allStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('allStatusFailure');
            reject(err)
        })
    })
};

export const subscribe = ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
        api.contentpacks.subscribe(id).then(res => {
            commit('subscribe', res);
            resolve(res.data)
        }).catch(err => {
            commit('subscibefailure');
            reject(err)
        })
    })
};

export const unsubscribe = ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
        api.contentpacks.unsubscribe(id).then(res => {
            commit('unsubscribe', res);
            resolve(res.data)
        }).catch(err => {
            commit('unsubscibefailure');
            reject(err)
        })
    })
};

export const edit = ({commit, dispatch}, question) => {
    commit('changeEditingQuestion', question);
    dispatch('modals/openEditQuestion', null, {root: true})
};

export const store = ({commit, dispatch}, {id, ...params}) => {
    return new Promise((resolve, reject) => {
        commit('storeStatusRequest');
        api.contentpacks.store(id, params).then(res => {
            dispatch('feed/fresh', null, {root: true});
            commit('storeStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('storeStatusFailure');
            reject(err)
        })
    })
};


export const remove = ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
        commit('removeStatusRequest');
        api.contentpacks.remove(id).then(res => {
            commit('removeStatusSuccess', res);
            dispatch('feed/fresh', null, {root: true});
            resolve(res.data)
        }).catch(err => {
            commit('removeStatusFailure', err);
            reject(err)
        })
    })
};

export const update = ({commit, dispatch}, {id, ...params}) => {
    return new Promise((resolve, reject) => {
        commit('updateStatusRequest');
        api.contentpacks.update(id, params).then(res => {
            commit('updateStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('updateStatusFailure');
            reject(err)
        })
    })
};

export const flushToDefaults = ({commit}) => {
    commit('flushState')
};

export const removeQuestionComment = ({commit}, comment) => {
    commit('removeQuestionComment', comment)
};

export const loadCardcontentpacks = ({commit, state, rootGetters}, card) => {
    const team = rootGetters['teams/current'];
    if (team === null) {
        return []
    }

    return new Promise((resolve, reject) => {
        commit('loadCardcontentpacksStatusRequest');
        api.contentpacks.all(team.id, {card: card.id}).then(res => {
            commit('loadCardcontentpacksStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadCardcontentpacksStatusFailure', err);
            reject(err)
        })
    })
};

export const loadOpencontentpacks = ({commit, state, rootGetters}) => {
    if (state.opencontentpacksPage === state.opencontentpacksLastPage) {
        return []
    }
    const team = rootGetters['teams/current'];
    if (team === null) {
        return []
    }

    return new Promise((resolve, reject) => {
        const page = state.opencontentpacksPage + 1;
        commit('loadOpencontentpacksStatusRequest');
        api.contentpacks.all(team.id, {page, status: 0}).then(res => {
            commit('loadOpencontentpacksStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadOpencontentpacksStatusFailure', err);
            reject(err)
        })
    })
};

export const loadSubscribedContentPacks = ({commit, state, rootGetters}) => {

    const team = rootGetters['teams/current'], user = rootGetters['auth/user'];
    if (team === null || user === null) {
        return []
    }

    return new Promise((resolve, reject) => {
        const page = state.usercontentpacksPage + 1;
        commit('loadUsercontentpacksStatusRequest');
          api.contentpacks.subscriptions({teamId: team.id}).then(res => {
            var result = res.data.reduce(function (r, a) {
              r[a.contentpack_id] = r[a.contentpack_id] || [];
              r[a.contentpack_id].push(a);
              return r;
              }, Object.create(null));

            commit('loadUsercontentpacksStatusSuccess', result);
            resolve(result)
        }).catch(err => {
            commit('loadUsercontentpacksStatusFailure', err);
            reject(err)
        })
    })
};

export const loadContentPacks = ({commit, state, rootGetters}) => {
    const team = rootGetters['teams/current'];
    if (team === null) {
        return []
    }
    return new Promise((resolve, reject) => {
        const page = state.subscribedCPs + 1;
        commit('loadSubscribedCPsStatusRequest');
        api.contentpacks.all(team.id, {page, status: 1}).then(res => {
            var result = res.data.reduce(function (r, a) {
              r[a.tags] = r[a.tags] || [];
              r[a.tags].push(a);
              return r;
              }, Object.create(null));

            commit('loadCPsStatusSuccess', result);
            resolve(result)
        }).catch(err => {
            commit('loadCPsStatusFailure', err);
            reject(err)
        })
    })
};
