import {remove, replace} from "../../helpers";

export const getStatusRequest = state => state.actionGetStatus = 'Request';
export const getStatusSuccess = state => state.actionGetStatus = 'Success';
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
    state.items.push(res.data.plan)
};
export const createStatusFailure = state => state.actionCreateStatus = 'Failure';

export const updateStatusRequest = state => state.actionUpdateStatus = 'Request';
export const updateStatusSuccess = (state, res) => {
    state.actionUpdateStatus = 'Success';
    state.items = replace(state.items, res.data.plan);
};
export const updateStatusFailure = state => state.actionUpdateStatus = 'Failure';

export const removeStatusRequest = state => state.actionRemoveStatus = 'Request';
export const removeStatusSuccess = (state, res) => {
    state.actionRemoveStatus = 'Success';
    state.items = remove(state.items, res.data.plan);
};
export const removeStatusFailure = state => state.actionRemoveStatus = 'Failure';