import {strip_tags} from '../../helpers'

const flushEmptyCard = (dispatch, card) => {
    if (!card) return;
    if (card.name !== 'Untitled card') return;

    const content = strip_tags(card.description).trim();
    if (content !== '') return;

    dispatch('cards/remove', card.id, {root: true})
};

export const open = ({commit, dispatch, getters}, id) => {
    const card = getters['getById'](id);
    if (card !== undefined) {
        dispatch('route/replace', {name: 'view_card', id}, {root: true});
        return commit('setActiveCard', card);
    }

    dispatch('cards/get', id, {root: true}).then(card => {
        commit('addCard', card);
        commit('setActiveCard', card);

        dispatch('route/replace', {name: 'view_card', id}, {root: true})
    })
};

export const batch = ({commit, getters}, cards) => {
    if (!cards || cards.length === 0) return;
    cards.forEach(card => {
        const item = getters['getById'](card.id);
        if (item === undefined) {
            commit('addCard', card)
        }
    })
};

export const close = ({dispatch, commit, getters}) => {
    const card = getters['getActiveCard'];
    if (card !== undefined) {
        flushEmptyCard(dispatch, card)
    }
    commit('setActiveCard', null)
};

export const create = ({dispatch, commit, rootGetters}, options = {}) => {
    const team = rootGetters['teams/current'],
        query = rootGetters['search/getSuggestQuery'];
    if (!team) {
        return alert('Please choose the team')
    }

    const params = Object.assign({
        teamId: team.id,
        name: query !== '' ? query : 'Untitled card',
        description: '<p><br></p>',
        tags: rootGetters['search/getQueryTags']
    }, options);

    dispatch('cards/create', params, {root: true}).then(res => {
        commit('addCard', res.card);
        commit('setActiveCard', res.card);

        if (rootGetters['modals/isCardsEditorOpen'] === false) {
            dispatch('modals/openCardsEditor', res.card.id, {root: true})
        }
    })
};

export const save = ({dispatch, getters}) => {
    const data = {...getters['getActiveCard']},
        form = new FormData();
    for (let i in data) {
        form.append(i, data[i])
    }
    form.append('_method', 'PUT');
    return dispatch('cards/update', {id: data.id, form}, {root: true})
};

export const hide = ({commit, dispatch, getters}, payload) => {
    const card = getters['getById'](payload.id);
    if (card !== undefined) {
        commit('hideCard', card);
        if (!payload.removed) {
            flushEmptyCard(dispatch, card);
        }
        const active = getters['getActiveCard'];
        if (active !== undefined) {
            dispatch('route/replace', {name: 'view_card', id: active.id}, {root: true})
        }
    }
    if (getters['getEditorCards'].length === 0) {
        dispatch('modals/closeCardsEditor', null, {root: true})
    }
};

export const changeEditorCard = ({commit}, card) => commit('update', card);

