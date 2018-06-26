export const isFavorite = state => {
    return id => {
        const card = state.favorite.find(card => card.id === id);

        return card !== undefined
    }
};

export const isCounting = state => state.actionCountStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';

export const getFavoriteCards = state => state.favorite;
export const getFavoriteCardsCount = state => state.favorite.length;