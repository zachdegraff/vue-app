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

export const unsubscribe = (team, attr) => {
    return request.post(`/contentpack/removecontentpack`, attr)
};

export const subscribe = (team, attr) => {
    return request.post(`/contentpack/addcontentpack`, attr)
};
