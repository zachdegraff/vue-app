import request from '../request'

export const get = (id) => {
    return request.get(`/users/${id}`)
};

export const all = (params = {}) => {
    return request.get('/users', {params})
};

export const count = (params = {}) => {
    return request.get('/users/count', {params})
};

export const create = (attr) => {
    return request.post('/users', attr);
};

export const update = (id, attr) => {
    return request.post(`/users/${id}`, attr);
};

export const remove = (id) => {
    return request.delete(`/users/${id}`);
};