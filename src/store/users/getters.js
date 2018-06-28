export const isFavorite = state => {
    return id => {
        const card = state.favorite.find(card => card.id === id);

        return card !== undefined
    }
};

export const isCounting = state => state.actionCountStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';

export const getFavoriteCards = (state, getters, rootState, rootGetters) => {
    const team = rootGetters['teams/current'];
    if (team === null) {
        return []
    }
    return state.favorite.filter(card => card.teamId === team.id);
};
export const getFavoriteCardsCount = (state, getters) => {
    return getters['getFavoriteCards'].length
};