import {replace, remove} from "../../helpers";

export const update = (state, card) => {
    state.cards = replace(state.cards, card);
    if (state.active !== null) {
        if (state.active.id === card.id) {
            state.active.lastChange = card.lastChange
        }
    }
};

export const setCards = (state, cards) => state.cards = cards;

export const addCard = (state, card) => state.cards.push(card);

export const hideCard = (state, card) => {
    const isActive = state.active ? state.active.id === card.id : false;
    state.cards = remove(state.cards, card);
    if (isActive && state.cards.length) {
        setActiveCard(state, state.cards[0])
    }
};

export const setActiveCard = (state, card) => state.active = card;
