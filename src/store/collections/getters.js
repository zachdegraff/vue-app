export const all = state => state.items;

export const allNonEmpty = state => {
    return state.items.filter(item => item.cards > 0)
};