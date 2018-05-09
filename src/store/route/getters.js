export const current = (state) => {
    if (state.stack.length === 0) {
        return null;
    }
    return state.stack[state.stack.length - 1]
};

export const previous = (state) => {
    if (state.stack.length < 2) {
        return null;
    }
    return state.stack[state.stack.length - 2]
};