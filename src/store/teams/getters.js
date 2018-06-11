export const getById = state => {
    return id => {
        if (state.items.length === 0) {
            return undefined;
        }
        return state.items.find(item => item.id === id);
    }
};

export const all = state => state.items;

export const current = state => {
    if (state.current !== null) {
        return state.current
    }
    if (state.items.length === 0) {
        return null
    }
    const id = parseInt(localStorage.getItem('current-team')),
        team = state.items.find(item => item.id === id);
    if (team !== undefined) {
        return team
    }
    return state.items[0]
};

export const getViewingTeam = state => state.viewing.team;
export const getEditingTeam = state => state.editing.team;

export const getAddingStatus = state => state.adding.status;
export const getViewingStatus = state => state.viewing.status;
export const getEditingStatus = state => state.editing.status;

export const isCreating = state => state.actionCreateStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';
export const isTeamLoading = state => state.actionGetStatus === 'Request';
export const isHelpAsking = state => state.actionAskHelpStatus === 'Request';
export const isTeamsLoading = state => state.actionAllStatus === 'Request';


