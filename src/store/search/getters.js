
export const getQuery = state => state.query;
export const getSuggestQuery = state => {
    if (state.query.indexOf('#') !== -1) {
        return state.query.replace(/#(.*?)($|\s+)/g, '').trim()
    }
    return state.query;
};
export const getQueryTags = state => {
    if (state.query === '' || state.query.indexOf('#') === -1) return [];

    const matches = state.query.match(/#(.*?)($|\s+)/g), result = [];
    if (matches !== null) {
        matches.forEach(item => {
            result.push(item.substring(1));
        })
    }
    return result
};
export const getResults = state => state.results;

export const isHinting = state => state.actionHintsStatus === 'Request';
export const isSearching = state => state.actionSearchStatus === 'Request';
