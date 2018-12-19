import request from '../request'

export const get = (id) => {
    return request.get(`/paid-plans/${id}`);
};

export const all = (params = {}) => {
    return request.get(`/paid-plans`, {params})
};

export const store = (attr) => {
    return request.post(`/paid-plans`, attr)
};

export const update = (id, attr) => {
    attr['_method'] = 'PUT';
    return request.post(`/paid-plans/${id}`, attr);
};

export const remove = (id) => {
    return request.delete(`/paid-plans/${id}`);
};