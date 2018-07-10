export const openCard = ({commit, dispatch}, id) => {
    dispatch('cards/get', id, {root: true}).then(card => {
        commit('setCards', [card]);
        commit('setActiveCard', card);
    })
};

export const closeCard = ({commit}) => {
    commit('setCards', []);
    commit('setActiveCard', null)
};

export const addCardToList = ({commit, dispatch, getters}, id) => {
    const card = getters['getById'](id);
    if (card !== undefined) return;

    dispatch('cards/get', id, {root: true}).then(card => commit('addCard', card))
};

export const changeActiveCard = ({commit, dispatch, getters}, id) => {
    const card = getters['getById'](id);
    if (card !== undefined) {
        return commit('setActiveCard', card);
    }
    dispatch('cards/get', id, {root: true}).then(card => {
        commit('addCard', card);
        commit('setActiveCard', card)
    })
};

export const changeEditorCard = ({commit}, card) => {
    commit('update', card);
};

export const retrieveCardsFromContent = ({commit, dispatch, getters}, content) => {
    const matches = content.match(/\/cards\/([0-9]+)/g);
    if (matches === null) return;

    matches.forEach(item => {
        const id = parseInt(item.replace(/[^0-9]+/, '')),
            card = getters['getById'](id);

        if (card !== undefined) {
            return;
        }
        dispatch('cards/get', id, {root: true}).then(card => commit('addCard', card))
    });
};

