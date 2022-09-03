import request from '../request'

export const get = (id) => {
    return request.get(`/content-packs/${id}`);
};

export const all = (params = {}) => {
    return request.get(`/content-packs`, {'params': params})
};

export const subscriptions = (params = {}) => {
    return request.get(`/content-packs/subscriptions`, {'params': params})
};

export const unsubscribe = (id, team) => {
    return request.post(`/content-packs/${id}/unsubscribe`, {teamId: team.id})
};

export const subscribe = (id, team) => {
    return request.post(`/content-packs/${id}/subscribe`,  {teamId: team.id})
};

export const items = (id, page) => {
    return request.get(`/content-packs/${id}/items`, {params: {page: page}})
};