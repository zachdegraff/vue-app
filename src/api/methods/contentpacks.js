import request from '../request'

export const get = (id) => {
    return request.get(`/contentpacks/${id}`);
};

export const all = (team, params = {}) => {
    return request.get(`/contentpack`, {'team_id': team})
};

export const subscriptions = (params = {}) => {
    return request.get(`/contentpack/subscriptions`, {'params': params})
};

export const unsubscribe = (data) => {
    return request.post(`/contentpack/removecontentpack`, data)
};

export const subscribe = (data) => {
    return request.post(`/contentpack/addcontentpack`,  data)
};
