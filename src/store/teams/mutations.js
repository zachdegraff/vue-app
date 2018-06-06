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

export const changeCurrentTeam = (state, item) => state.current = item;

export const changeViewingTeam = (state, team) => state.viewing = team;

export const getStatusRequest = state => state.actionGetStatus = 'Request';
export const getStatusSuccess = (state, req) => {
    state.actionGetStatus = 'Success';
    replace(state.items, req.data);
};
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
    replace(state.items, req.data.team);
    state.current = req.data.team
};
export const updateStatusFailure = state => state.actionUpdateStatus = 'Failure';

export const removeStatusRequest = state => state.actionRemoveStatus = 'Request';
export const removeStatusSuccess = (state, req) => {
    state.actionRemoveStatus = 'Success';
    remove(state, req.data.id);
};
export const removeStatusFailure = state => state.actionRemoveStatus = 'Failure';



