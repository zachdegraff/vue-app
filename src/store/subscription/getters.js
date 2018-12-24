export const isValid = state => {
    const sub = state.subscription;
    if (sub === null) return false;

    return sub.isValid
};

export const getCoupons = state => state.coupons;
export const getSubscription = state => state.subscription;


export const isSubscriptionLoading = state => state.actionLoadStatus === 'Request';
export const isSubscriptionCreating = state => state.actionCreateStatus === 'Request';

export const isInvoiceEmailChanging = state => state.actionChangeInvoiceEmailStatus === 'Request';
export const isPaymentMethodChanging = state => state.actionChangePaymentMethodStatus === 'Request';