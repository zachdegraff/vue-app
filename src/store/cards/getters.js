export const getById = state => {
    return id => {
        if (state.items.length === 0) {
            return undefined;
        }
        return state.items.find(item => item.id === id);
    }
};

export const getItems = state => state.items;
export const getAlphabetItems = state => {
    const result = {}, other = [],
        items = state.items.sort((a, b) => {
            return ('' + a.name.toLowerCase()).localeCompare(b.name.toLowerCase())
        });

    items.forEach(item => {
        let letter = item.name.charAt(0).toLocaleLowerCase();
        if (!letter.match(/[a-z]/)) {
            return other.push(item);
        }
        if (result[letter] === undefined) {
            result[letter] = []
        }
        result[letter].push(item)
    });
    if (other.length > 0) {
        result['#'] = other
    }
    return result
};
export const getCharArray = state =>  {
    var a = [], i = 'a'.charCodeAt(0), j = 'z'.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    a.push("#");
    return a;
};
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
            if (filter.tag !== '') {
                if (!item.tags || !item.tags.length) {
                    return;
                }
                let isInTags = false;
                for (let i in item.tags) {
                    if (item.tags[i].id === filter.tag) {
                        isInTags = true;
                    }
                }
                if (!isInTags) {
                    return;
                }
            }
            result.push(item)
        });
        return result;
    }
};

export const getRecentlyUpdated = state => state.recently;

export const isCreating = state => state.actionCreateStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';
export const isCardLoading = state => state.actionGetStatus === 'Request';
export const isCardsLoading = state => state.actionAllStatus === '' || state.actionAllStatus === 'Request';
export const isCardsAmountLoading = state => state.actionCardsAmount === 'Request';
export const isCardsAmountLoaded = state => state.actionCardsAmount === 'Success';
