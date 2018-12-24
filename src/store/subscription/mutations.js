export const loadStatusRequest = state => state.actionLoadStatus = 'Request';
export const loadStatusSuccess = state => state.actionLoadStatus = 'Success';
export const loadStatusFailure = state => state.actionLoadStatus = 'Failure';

export const setTeamSubscription = (state, subscription) => state.subscription = subscription;

export const createStatusRequest = state => state.actionCreateStatus = 'Request';
export const createStatusSuccess = state => state.actionCreateStatus = 'Success';
export const createStatusFailure = state => state.actionCreateStatus = 'Failure';

export const loadCouponsStatusRequest = state => state.actionLoadCouponsStatus = 'Request';
export const loadCouponsStatusSuccess = (state, res) => {
    state.actionLoadCouponsStatus = 'Success';
    state.coupons = res.data.data
};
export const loadCouponsStatusFailure = state => state.actionLoadCouponsStatus = 'Failure';

export const changeInvoiceEmailStatusRequest = state => state.actionChangeInvoiceEmailStatus = 'Request';
export const changeInvoiceEmailStatusSuccess = state => state.actionChangeInvoiceEmailStatus = 'Success';
export const changeInvoiceEmailStatusFailure = state => state.actionChangeInvoiceEmailStatus = 'Failure';

export const changePaymentMethodStatusRequest = state => state.actionChangePaymentMethodStatus = 'Request';
export const changePaymentMethodStatusSuccess = state => state.actionChangePaymentMethodStatus = 'Success';
export const changePaymentMethodStatusFailure = state => state.actionChangePaymentMethodStatus = 'Failure';