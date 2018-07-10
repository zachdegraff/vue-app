import {replace} from "../../helpers";

export const update = (state, card) => state.cards = replace(state.cards, card);

export const setCards = (state, cards) => state.cards = cards;

export const addCard = (state, card) => state.cards.push(card);

export const setActiveCard = (state, card) => state.active = card;
