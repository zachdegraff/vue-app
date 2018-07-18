import {remove} from "../../helpers";

export const update = (state, card) => {
    const target = state.cards.find(item => item.id === card.id);
    if (target !== undefined) {
        target.lastChange = card.lastChange
    }
};

export const addCard = (state, card) => {
    const item = {
        id: '',
        name: '',
        teamId: '',
        shorthand: '',
        collections: [],
        description: '',
        lastChange: null,
        isActive: false
    };

    Object.keys(item).forEach(key => {
        if (key === 'shorthand') {
            return item.shorthand = card.shorthand.join(', ');
        }
        if (key === 'collections') {
            return item.collections = card.collections.map(collection => collection.name);
        }
        item[key] = card[key]
    });

    state.cards.push(item)
};

export const hideCard = (state, card) => {
    state.cards = remove(state.cards, card);
    if (card.isActive && state.cards.length) {
        setActiveCard(state, state.cards[0])
    }
};

export const setActiveCard = (state, card) => {
    if (card === null) {
        return state.cards = []
    }
    state.cards.forEach(item => item.isActive = item.id === card.id)
};
