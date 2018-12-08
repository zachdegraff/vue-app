export const getById = state => {
    return id => {
        if (state.items.length === 0) {
            return undefined;
        }
        return state.items.find(item => item.id === parseInt(id));
    }
};

export const all = state => state.items;

export const current = state => {
    if (state.current !== null) {
        const team = state.items.find(item => item.id === state.current.id);
        if (team !== undefined) {
            return team
        }
    }
    if (state.items.length === 0) {
        return null
    }
    const id = parseInt(localStorage.getItem('current-team')),
        team = state.items.find(item => item.id === id);

    state.current = team !== undefined ? team : state.items[0];

    return state.current;
};

export const isCreating = state => state.actionCreateStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';
export const isTeamLoading = state => state.actionGetStatus === 'Request';
export const isTeamsLoading = state => state.actionAllStatus === 'Request';
export const isTeamsLoaded = state => state.actionAllStatus === 'Success';


