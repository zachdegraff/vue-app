import request from '../request'

export const all = (team, params = {}) => {
    return request.get(`/teams/${team}/questions`, {params})
};

export const count = (team) => {
    return request.get(`/teams/${team}/questions/count`)
};

export const store = (team, attr) => {
    return request.post(`/teams/${team}/help`, attr)
};

export const comment = (id, attr) => {
    return request.post(`/questions/${id}/comment`, attr)
};

export const show = (id) => {
    return request.get(`/questions/${id}/show`);
};

export const showComment = (id) => {
    return request.get(`/questions/${id}/show-comment`);
};

export const update = (id, attr) => {
    return request.post(`/questions/${id}`, attr);
};

export const remove = (id) => {
    return request.delete(`/questions/${id}`);
};