
export const getQuery = state => state.query;
export const getResults = state => state.results;

export const isSearching = state => state.actionSearchStatus === 'Request';
