import request from '../request'

export const get = (team) => {
    return request.get(`/subscriptions/${team}`)
};

export const create = (team, attr) => {
    return request.post(`/subscriptions/${team}`, attr);
};

export const changeInvoiceEmail = (team, attr) => {
    return request.post(`/subscriptions/${team}/change-invoice-email`, attr);
};

export const changePaymentMethod = (team, attr) => {
    return request.post(`/subscriptions/${team}/change-payment-method`, attr);
};