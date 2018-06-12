import {replace, remove} from "../../helpers";

export const allStatusRequest = state => {
    state.actionAllStatus = 'Request';
    state.items = []
};
export const allStatusSuccess = (state, res) => {
    state.actionAllStatus = 'Success';
    state.items = res.data.data
};
export const allStatusFailure = state => state.actionAllStatus = 'Failure';


export const getStatusRequest = state => state.actionGetStatus = 'Request';
export const getStatusSuccess = (state, res) => {
    state.actionGetStatus = 'Success';
    state.items = replace(state.items, res.data.data)
};
export const getStatusFailure = state => state.actionGetStatus = 'Failure';


export const updateStatusRequest = state => state.actionUpdateStatus = 'Request';
export const updateStatusSuccess = (state, res) => {
    state.viewing = res.data.card;
    state.actionUpdateStatus = 'Success';
    state.items = replace(state.items, res.data.card);
};
export const updateStatusFailure = state => state.actionUpdateStatus = 'Failure';


export const removeStatusRequest = state => state.actionRemoveStatus = 'Request';
export const removeStatusSuccess = (state, res) => {
    state.actionRemoveStatus = 'Success';
    state.items = remove(state.items, res.data.card)
};
export const removeStatusFailure = state => state.actionRemoveStatus = 'Failure';

export const createStatusRequest = state => state.actionCreateStatus = 'Request';
export const createStatusSuccess = (state, res) => {
    state.actionCreateStatus = 'Success';
    state.items.push(res.data.card)
};
export const createStatusFailure = state => state.actionCreateStatus = 'Failure';

export const changeViewingCard = (state, card) => state.viewing = card;
export const changeEditingCard = (state, card) => state.editing = card;

export const recentlyAddedStatusRequest = state => state.actionRecentlyAddedStatus = 'Request';
export const recentlyAddedStatusSuccess = (state, res) => {
    state.actionRecentlyAddedStatus = 'Success';
    state.recentlyAdded = res.data.data
};
export const recentlyAddedStatusFailure = state => state.actionRecentlyAddedStatus = 'Failure';


export const recentlyUpdatedStatusRequest = state => state.actionRecentlyUpdatedStatus = 'Request';
export const recentlyUpdatedStatusSuccess = (state, res) => {
    state.actionRecentlyUpdatedStatus = 'Success';
    state.recentlyUpdated = res.data.data
};
export const recentlyUpdatedStatusFailure = state => state.actionRecentlyUpdatedStatus = 'Failure';
