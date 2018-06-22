export const getById = state => {
    return id => {
        if (state.items.length === 0) {
            return undefined;
        }
        return state.items.find(item => item.id === id);
    }
};

export const getItems = state => state.items;

export const getCardsAmount = state => state.amount;

export const getFilteredItems = state => {
    return filter => {
        const result = [],
            name = filter.name.toLowerCase(),
            shorthand = filter.shorthand.toLowerCase(),
            description = filter.description.toLowerCase();

        state.items.forEach(item => {
            if (name !== '') {
                if (item.name.toLowerCase().indexOf(name) === -1) {
                    return;
                }
            }
            if (shorthand !== '') {
                if (!item.shorthand || !item.shorthand.length) {
                    return;
                }
                let isInList = false;
                for (let i in item.shorthand) {
                    if (item.shorthand[i].toLowerCase().indexOf(shorthand) !== -1) {
                        isInList = true;
                    }
                }
                if (!isInList) {
                    return;
                }
            }
            if (description !== '') {
                if (item.description.toLowerCase().indexOf(description) === -1) {
                    return;
                }
            }
            if (filter.collection !== '') {
                if (!item.collections || !item.collections.length) {
                    return;
                }
                let isInCollection = false;
                for (let i in item.collections) {
                    if (item.collections[i].id === filter.collection) {
                        isInCollection = true;
                    }
                }
                if (!isInCollection) {
                    return;
                }
            }
            result.push(item)
        });
        return result;
    }
};


export const getViewingCard = state => {
    if (state.viewStack.length > 0) {
        return state.viewStack[state.viewStack.length - 1]
    }
    return null
};
export const getEditingCard = state => state.editing;

export const getRecentlyAdded = state => state.recentlyAdded;
export const getRecentlyUpdated = state => state.recentlyUpdated;

export const isCreating = state => state.actionCreateStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';
export const isCardLoading = state => state.actionGetStatus === 'Request';
export const isCardsLoading = state => state.actionAllStatus === 'Request';
