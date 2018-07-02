import request from '../request'

export const all = (team, params = {}) => {
    return request.get(`/teams/${team}/questions`, {params})
};

export const store = (team, attr) => {
    return request.post(`/teams/${team}/help`, attr)
};

export const comment = (id, attr) => {
    return request.post(`/questions/${id}/comment`, attr)
};