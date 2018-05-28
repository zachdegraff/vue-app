export const getById = state => {
    return id => {
        if (state.items.length === 0) {
            return undefined;
        }
        return state.items.find(item => item.id === id);
    }
};

export const items = state => state.items;

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

export const isCreating = state => state.actionCreateStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';
export const isInviting = state => state.actionInviteStatus === 'Request';
export const isTeamLoading = state => state.actionGetStatus === 'Request';
export const isTeamsLoading = state => state.actionAllStatus === 'Request';
export const isChangingRole = state => state.actionChangeRoleStatus === 'Request';
export const isMembersLoading = state => state.actionMembersStatus === 'Request';
