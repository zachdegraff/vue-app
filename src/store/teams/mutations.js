import {replace} from '../../helpers'

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

export const flushState = state => {
    state.items = []
};

export const changeCurrentTeam = (state, team) => state.current = team;
export const changeViewingTeam = (state, team) => state.viewing = team;
export const changeEditingTeam = (state, team) => state.editing = team;


export const getStatusRequest = state => state.actionGetStatus = 'Request';
export const getStatusSuccess = (state, res) => {
    state.actionGetStatus = 'Success';
    state.items = replace(state.items, res.data.data);
};
export const getStatusFailure = state => state.actionGetStatus = 'Failure';

export const allStatusRequest = state => state.actionAllStatus = 'Request';
export const allStatusSuccess = (state, res) => {
    state.actionAllStatus = 'Success';
    state.items = res.data.data
};
export const allStatusFailure = state => state.actionAllStatus = 'Failure';

export const createStatusRequest = state => state.actionCreateStatus = 'Request';
export const createStatusSuccess = (state, res) => {
    state.actionCreateStatus = 'Success';
    state.items.push(res.data.team)
};
export const createStatusFailure = state => state.actionCreateStatus = 'Failure';

export const updateStatusRequest = state => state.actionUpdateStatus = 'Request';
export const updateStatusSuccess = (state, res) => {
    state.viewing = res.data.team;
    state.actionUpdateStatus = 'Success';
    state.items = replace(state.items, res.data.team);

    if (state.current !== null) {
        if (state.current.id === res.data.team.id) {
            state.current = res.data.team
        }
    }
};
export const updateStatusFailure = state => state.actionUpdateStatus = 'Failure';

export const removeStatusRequest = state => state.actionRemoveStatus = 'Request';
export const removeStatusSuccess = (state, res) => {
    state.actionRemoveStatus = 'Success';
    remove(state, res.data.id);
};
export const removeStatusFailure = state => state.actionRemoveStatus = 'Failure';

export const addSlackStatusRequest = state => state.actionAddSlackStatus = 'Request';
export const addSlackStatusSuccess = state => state.actionAddSlackStatus = 'Success';
export const addSlackStatusFailure = state => state.actionAddSlackStatus = 'Failure';

export const disableSlackStatusRequest = state => state.actionDisableSlackStatus = 'Request';
export const disableSlackStatusSuccess = state => state.actionDisableSlackStatus = 'Success';
export const disableSlackStatusFailure = state => state.actionDisableSlackStatus = 'Failure';



