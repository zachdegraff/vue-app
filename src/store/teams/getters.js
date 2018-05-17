export const getById = state => {
    return id => {
        if (state.items.length === 0) {
            return undefined;
        }
        return state.items.find(item => item.id === id);
    }
};

export const teamMembers = state => {
    return id => {
        return state.members[id]
    }
};

export const items = state => state.items;

export const current = state => {
    if (state.current !== null) {
        return state.current
    }
    if (state.items.length > 0) {
        return state.items[0]
    }
    return null;
};

export const isCreating = state => state.actionCreateStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';
export const isTeamLoading = state => state.actionGetStatus === 'Request';
export const isTeamsLoading = state => state.actionAllStatus === 'Request';
export const isMembersLoading = state => state.actionMembersStatus === 'Request';
