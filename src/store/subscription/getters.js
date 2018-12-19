export const isSubscriptionLoading = state => state.actionLoadStatus === 'Request';
export const isSubscriptionCreating = state => state.actionCreateStatus === 'Request';

export const isInvoiceEmailChanging = state => state.actionChangeInvoiceEmailStatus === 'Request';
export const isPaymentMethodChanging = state => state.actionChangePaymentMethodStatus === 'Request';