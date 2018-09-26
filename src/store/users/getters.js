export const isFavorite = state => {
    return id => {
        const card = state.favorite.find(card => card.id === id);

        return card !== undefined
    }
};

export const isCounting = state => state.actionCountStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';

export const getRoles = state => state.roles;

export const getFavoriteCards = (state, getters, rootState, rootGetters) => {
    const team = rootGetters['teams/current'];
    if (team === null) {
        return []
    }
        const result = {}, other = [],
            items = state.favorite.sort((a, b) => {
                return ('' + a.name.toLowerCase()).localeCompare(b.name.toLowerCase())
            });
        items.forEach(item => {
            let letter = item.name.charAt(0).toLocaleLowerCase();
            if (!letter.match(/[a-z]/)) {
                return other.push(item);
            }
            if (result[letter] === undefined) {
                result[letter] = []
            }
            result[letter].push(item)
        });
        if (other.length > 0) {
            result['#'] = other
        }
        return result
};
export const getFavoriteCardsCount = (state, getters) => {
    return getters['getFavoriteCards'].length
};