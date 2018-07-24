import {remove} from "../../helpers";

export const update = (state, card) => {
    const target = state.cards.find(item => item.id === card.id);
    if (target !== undefined) {
        target.lastChange = card.lastChange
    }
};

export const addCard = (state, card) => {
    const item = {};

    Object.keys(card).forEach(key => {
        if (key === 'shorthand') {
            return item.shorthand = card.shorthand.join(', ');
        }
        if (key === 'tags') {
            return item.tags = card.tags.map(tag => tag.name);
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
    state.cards = state.cards.map(item => {
        item.isActive = item.id === card.id;
        return item
    })
};
