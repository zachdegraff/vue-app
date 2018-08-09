import request from '../request'

export const forTeam = (id) => {
    return request.get(`/teams/${id}/card-tags`)
};

export const create = (team, attr) => {
    return request.post(`/teams/${team}/card-tags`, attr);
};

export const update = (team, id, attr) => {
    return request.put(`/teams/${team}/card-tags/${id}`, attr);
};

export const remove = (team, id) => {
    return request.delete(`/teams/${team}/card-tags/${id}`);
};