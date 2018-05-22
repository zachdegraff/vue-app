export const set = (state, items) => state.items = items;

export const remove = (state, id) => {
    const idx = state.items.findIndex(item => item.id === id);
    if (idx !== undefined) {
        state.items.splice(idx, 1);
    }
    if (state.current !== null && state.current.id === id) {
        state.current = null
    }
};

export const replace = (state, item) => {
    const idx = state.items.findIndex(el => el.id === item.id);
    if (idx === -1) {
        return state.items.unshift(item)
    }
    state.items[idx] = item
};

export const members = (state, {id, items}) => state.members[id] = items;

export const changeCurrentTeam = (state, item) => state.current = item;

export const getStatusRequest = state => state.actionGetStatus = 'Request';
export const getStatusSuccess = state => state.actionGetStatus = 'Success';
export const getStatusFailure = state => state.actionGetStatus = 'Failure';

export const allStatusRequest = state => state.actionAllStatus = 'Request';
export const allStatusSuccess = (state, req) => {
    state.actionAllStatus = 'Success';
    state.items = req.data.data
};
export const allStatusFailure = state => state.actionAllStatus = 'Failure';

export const createStatusRequest = state => state.actionCreateStatus = 'Request';
export const createStatusSuccess = (state, req) => {
    state.actionCreateStatus = 'Success';
    state.items.push(req.data.team);
    state.current = req.data.team
};
export const createStatusFailure = state => state.actionCreateStatus = 'Failure';

export const updateStatusRequest = state => state.actionUpdateStatus = 'Request';
export const updateStatusSuccess = (state, req) => {
    state.actionUpdateStatus = 'Success';
    replace(state, req.data.team);
    state.current = req.data.team
};
export const updateStatusFailure = state => state.actionUpdateStatus = 'Failure';

export const removeStatusRequest = state => state.actionRemoveStatus = 'Request';
export const removeStatusSuccess = (state, req) => {
    state.actionRemoveStatus = 'Success';
    remove(state, req.data.id);
};
export const removeStatusFailure = state => state.actionRemoveStatus = 'Failure';

export const membersStatusRequest = state => state.actionMembersStatus = 'Request';
export const membersStatusSuccess = (state, {id, req}) => {
    state.actionMembersStatus = 'Success';
    members(state, {id, items: req.data.data})
};
export const membersStatusFailure = state => state.actionMembersStatus = 'Failure';

export const inviteStatusRequest = state => state.actionInviteStatus = 'Request';
export const inviteStatusSuccess = (state, req) => {
    delete state.members[req.data.member.team_id];
    state.actionInviteStatus = 'Success'
};
export const inviteStatusFailure = state => state.actionInviteStatus = 'Failure';

export const joinStatusRequest = state => state.actionJoinStatus = 'Request';
export const joinStatusSuccess = state => state.actionJoinStatus = 'Success';
export const joinStatusFailure = state => state.actionJoinStatus = 'Failure';

export const excludeStatusRequest = state => state.actionExcludeStatus = 'Request';
export const excludeStatusSuccess = (state, req) => {
    delete state.members[req.data.member.team_id];
    state.actionExcludeStatus = 'Success'
};
export const excludeStatusFailure = state => state.actionExcludeStatus = 'Failure';

export const changeRoleStatusRequest = state => state.actionChangeRoleStatus = 'Request';
export const changeRoleStatusSuccess = (state, req) => {
    delete state.members[req.data.member.team_id];
    state.actionChangeRoleStatus = 'Success'
};
export const changeRoleStatusFailure = state => state.actionChangeRoleStatus = 'Failure';

