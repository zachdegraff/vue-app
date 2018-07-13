export const open = ({commit, dispatch, getters}, id) => {
    const card = getters['getById'](id);
    if (card !== undefined) {
        return commit('setActiveCard', card);
    }
    dispatch('cards/get', id, {root: true}).then(card => {
        commit('addCard', card);
        commit('setActiveCard', card);
    })
};

export const close = ({commit}) => {
    commit('setCards', []);
    commit('setActiveCard', null)
};

export const hide = ({commit, dispatch, getters}, id) => {
    const card = getters['getById'](id);
    if (card !== undefined) {
        commit('hideCard', card);
    }
    if (getters['getEditorCards'].length === 0) {
        dispatch('modals/closeCardsEditor', null, {root: true})
    }
};

export const changeEditorCard = ({commit}, card) => commit('update', card);

