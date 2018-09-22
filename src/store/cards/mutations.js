import {replace, remove} from "../../helpers";

export const flushCardsState = state => {
    state.items = [];
    state.amount = 0;

    state.recently = []
};

export const allStatusRequest = state => {
    state.actionAllStatus = 'Request';
    state.items = []
};
export const allStatusSuccess = (state, res) => {
    state.actionAllStatus = 'Success';
    state.cardItems = res.data;
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
    state.actionUpdateStatus = 'Success';
    state.items = replace(state.items, res.data.card)
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

export const cardsAmountStatusRequest = state => state.actionCardsAmount = 'Request';
export const cardsAmountStatusSuccess = (state, res) => {
    state.actionCardsAmount = 'Success';
    state.amount = res.data
};
export const cardsAmountStatusFailure = state => state.actionCardsAmount = 'Failure';

export const recentlyUpdatedStatusRequest = state => state.actionRecentlyStatus = 'Request';
export const recentlyUpdatedStatusSuccess = (state, res) => {
    state.actionRecentlyStatus = 'Success';
    state.recently = res.data.data
};
export const recentlyUpdatedStatusFailure = state => state.actionRecentlyStatus = 'Failure';
