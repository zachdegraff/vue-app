import api from '../../api'

export const all = ({commit, rootGetters}, params) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve([])
        }
        commit('allStatusRequest');
        api.questions.all(team.id, params).then(res => {
            commit('allStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('allStatusFailure');
            reject(err)
        })
    })
};

export const get = ({commit, dispatch}, id) => {
    return new Promise((resolve, reject) => {
        commit('getStatusRequest');
        api.questions.get(id).then(res => {
            commit('getStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('getStatusFailure');
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
        api.questions.store(id, params).then(res => {
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
        api.questions.remove(id).then(res => {
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
        api.questions.update(id, params).then(res => {
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

export const loadCardQuestions = ({commit, state, rootGetters}, card) => {
    const team = rootGetters['teams/current'];
    if (team === null) {
        return []
    }

    return new Promise((resolve, reject) => {
        commit('loadCardQuestionsStatusRequest');
        api.questions.all(team.id, {card: card.id}).then(res => {
            commit('loadCardQuestionsStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadCardQuestionsStatusFailure', err);
            reject(err)
        })
    })
};

export const loadOpenQuestions = ({commit, state, rootGetters}) => {
    if (state.openQuestionsPage === state.openQuestionsLastPage) {
        return []
    }
    const team = rootGetters['teams/current'];
    if (team === null) {
        return []
    }

    return new Promise((resolve, reject) => {
        const page = state.openQuestionsPage + 1;
        commit('loadOpenQuestionsStatusRequest');
        api.questions.all(team.id, {page, status: 0}).then(res => {
            commit('loadOpenQuestionsStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadOpenQuestionsStatusFailure', err);
            reject(err)
        })
    })
};

export const loadUserQuestions = ({commit, state, rootGetters}) => {
    if (state.userQuestionsPage === state.userQuestionsLastPage) {
        return []
    }
    const team = rootGetters['teams/current'], user = rootGetters['auth/user'];
    if (team === null || user === null) {
        return []
    }

    return new Promise((resolve, reject) => {
        const page = state.userQuestionsPage + 1;
        commit('loadUserQuestionsStatusRequest');
        api.questions.all(team.id, {page, user: user.id}).then(res => {
            commit('loadUserQuestionsStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadUserQuestionsStatusFailure', err);
            reject(err)
        })
    })
};

export const loadAnsweredQuestions = ({commit, state, rootGetters}) => {
    if (state.answeredQuestionsPage === state.answeredQuestionsLastPage) {
        return []
    }
    const team = rootGetters['teams/current'];
    if (team === null) {
        return []
    }

    return new Promise((resolve, reject) => {
        const page = state.answeredQuestionsPage + 1;
        commit('loadAnsweredQuestionsStatusRequest');
        api.questions.all(team.id, {page, status: 1}).then(res => {
            commit('loadAnsweredQuestionsStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadAnsweredQuestionsStatusFailure', err);
            reject(err)
        })
    })
};