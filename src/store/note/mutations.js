export const getStatusRequest = state => state.actionGetStatus = 'Request';
export const getStatusSuccess = state => state.actionGetStatus = 'Success';
export const getStatusFailure = state => state.actionGetStatus = 'Failure';

export const storeStatusRequest = state => state.actionStoreStatus = 'Request';
export const storeStatusSuccess = state => state.actionStoreStatus = 'Success';
export const storeStatusFailure = state => state.actionStoreStatus = 'Failure';