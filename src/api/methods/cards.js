import request from '../request'

export const get = (id) => {
    return request.get(`/cards/${id}`)
};

export const all = (params = {}) => {
    return request.get('/cards', {params})
};

export const teams = () => {
    return request.get('/cards/teams')
};

export const create = (attr) => {
    return request.post('/cards', attr);
};

export const update = (id, attr) => {
    return request.post(`/cards/${id}`, attr);
};

export const fastSave = (id, attr) => {
    return request.post(`/cards/${id}/fast-save`, attr);
};

export const count = (params) => {
    return request.get(`/cards/count`, {params});
};

export const remove = (id) => {
    return request.delete(`/cards/${id}`);
};

export const hints = (params) => {
    return request.get('/cards/hints', {params})
};

export const search = (params) => {
    return request.get('/cards/search', {params})
};

export const index = (params) => {
    return request.post('/cards/index', {params})
};

export const cardsHints = (params) => {
    return request.get('/cards/cards-hints', {params})
};

export const recently = (id) => {
    return request.get(`/cards/${id}/recently`)
};