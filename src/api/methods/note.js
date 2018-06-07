import request from '../request'

export const get = (id) => {
    return request.get(`/cards/${id}/note`)
};

export const store = (id, attr) => {
    return request.post(`/cards/${id}/note`, attr);
};