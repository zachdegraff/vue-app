function isExcepted(path) {
    const except = ['edit'];

    return except.some(el => path.indexOf(el) !== -1);
}


export const current = ({getters, commit}, path) => {
    const isWrong = isExcepted(path) || path === getters.current;

    if (!isWrong) {
        commit('push', path)
    }
};