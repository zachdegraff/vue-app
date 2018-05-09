export const getItemById = (state) => {
    return id => {
        if (state.items.length === 0) {
            return undefined;
        }
        return state.items.find(item => item.id === id);
    }
};