export const getById = state => {
    return id => {
        if (state.cards.length === 0) {
            return undefined;
        }
        return state.cards.find(item => item.id === id);
    }
};

export const getCardContent = state => {
    return id => {
        return state.contents[id]
    }
};

export const getEditorCards = state => state.cards;

export const getActiveCard = state => state.cards.find(card => card.isActive);