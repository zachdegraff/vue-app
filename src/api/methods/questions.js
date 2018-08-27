import request from '../request'

export const get = (id) => {
    return request.get(`/questions/${id}`);
};

export const all = (team, params = {}) => {
    return request.get(`/teams/${team}/questions`, {params})
};

export const count = (team) => {
    return request.get(`/teams/${team}/questions/count`)
};

export const store = (team, attr) => {
    return request.post(`/teams/${team}/help`, attr)
};

export const update = (id, attr) => {
    attr['_method'] = 'PUT';
    return request.post(`/questions/${id}`, attr);
};

export const remove = (id) => {
    return request.delete(`/questions/${id}`);
};