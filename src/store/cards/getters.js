/*
export const someGetter = (state) => {}
 */

export const getItemById = (state) => {
    return id => {
        if (state.items.length === 0) {
            return null;
        }
        return state.items.find(item => item.id === id);
    }
};