import api from '../../api'

export const store = ({commit}, {id, ...params}) => {
    return new Promise((resolve, reject) => {
        commit('storeStatusRequest');
        api.questions.store(id, params).then(res => {
            commit('storeStatusSuccess');
            resolve(res.data)
        }).catch(err => {
            commit('storeStatusFailure');
            reject(err)
        })
    })
};

export const comment = ({commit}, {id, ...params}) => {
    return new Promise((resolve, reject) => {
        commit('commentStatusRequest');
        api.questions.comment(id, params).then(res => {
            commit('commentStatusSuccess');
            resolve(res.data)
        }).catch(err => {
            commit('commentStatusFailure');
            reject(err)
        })
    })
};

export const flushToDefaults = ({commit}) => {
    commit('flushState')
};

export const loadQuestionsCount = ({commit, rootGetters}) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'];
        if (team === null) {
            resolve(0)
        }
        commit('loadQuestionsCountRequest');
        api.questions.count(team.id).then(res => {
            commit('loadQuestionsCountSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('loadQuestionsCountFailure', err);
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