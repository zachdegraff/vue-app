export const set = (state, items) => {
    state.items = items;
};

export const replace = (state, item) => {
    const idx = state.items.findIndex(el => el.id === item.id);
    if (idx === -1) {
        return state.items.unshift(item)
    }
    state.items[idx] = item
};