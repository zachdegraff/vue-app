export const getStatusRequest = state => state.actionGetStatus = 'Request';
export const getStatusSuccess = state => state.actionGetStatus = 'Success';
export const getStatusFailure = state => state.actionGetStatus = 'Failure';

export const storeStatusRequest = state => state.actionStoreStatus = 'Request';
export const storeStatusSuccess = state => state.actionStoreStatus = 'Success';
export const storeStatusFailure = state => state.actionStoreStatus = 'Failure';

export const updateStatusRequest = state => state.actionUpdateStatus = 'Request';
export const updateStatusSuccess = (state, res) => {
    state.actionUpdateStatus = 'Success';
    state.editing = null
};
export const updateStatusFailure = state => state.actionUpdateStatus = 'Failure';

export const changeEditingComment = (state, comment) => state.editing = comment;

export const removeStatusRequest = state => state.actionRemoveStatus = 'Request';
export const removeStatusSuccess = (state, res) => {
    state.actionRemoveStatus = 'Success';
};
export const removeStatusFailure = state => state.actionRemoveStatus = 'Failure';
