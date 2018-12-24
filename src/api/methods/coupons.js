import request from "../request";

export const get = (id) => {
    return request.get(`/coupons/${id}`)
};

export const all = (params = {}) => {
    return request.get('/coupons', {params})
};

export const create = (attr) => {
    return request.post('/coupons', attr);
};

export const update = (id, attr) => {
    return request.post(`/coupons/${id}`, attr);
};

export const remove = (id) => {
    return request.delete(`/coupons/${id}`);
};