import request from '../request'

export const get = (id) => {
    return request.get(`/teams/${id}`)
};

export const all = (params = {}) => {
    return request.get('/teams', {params})
};

export const allTeams = (params = {}) => {
    return request.get('/teams/all', {params})
};

export const create = (attr) => {
    return request.post('/teams', attr);
};

export const update = (id, attr) => {
    return request.post(`/teams/${id}`, attr);
};

export const remove = (id) => {
    return request.delete(`/teams/${id}`);
};

export const members = (id) => {
    return request.get(`/teams/${id}/members`);
};

export const stats = (id) => {
    return request.get(`/teams/${id}/stats`);
};

export const slack = (id, code) => {
    return request.post(`/teams/${id}/slack`, {code});
};

export const disableSlack = (id) => {
    return request.delete(`/teams/${id}/slack`);
};