export const getById = state => {
    return id => {
        if (state.items.length === 0) {
            return undefined;
        }
        return state.items.find(item => item.id === id);
    }
};

export const getItems = state => state.items;
export const getSearchResults = state => state.searchResults;
export const getRecentlyAdded = state => state.recentlyAdded;
export const getRecentlyUpdated = state => state.recentlyUpdated;

export const isCreating = state => state.actionCreateStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';
export const isCardLoading = state => state.actionGetStatus === 'Request';
export const isCardsLoading = state => state.actionAllStatus === 'Request';
export const isSearching = state => state.actionSearchStatus === 'Request';
