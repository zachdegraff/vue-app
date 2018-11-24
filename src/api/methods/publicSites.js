import request from '../request'

export const get = (link) => {
    return request.get(`/public-sites/${link}`)
};

export const all = (params = {}) => {
    return request.get(`/public-sites`, {params})
};

export const store = (attr) => {
    return request.post('/public-sites', attr);
};

export const getSiteConfig = (id) => {
    return request.get(`/public-sites/${id}/config`)
};

export const getSiteCards = (link) => {
    return request.get(`/public-sites/${link}/cards`)
};

export const searchSiteCards = (link, query) => {
    return request.get(`/public-sites/${link}/search`, {params: {query}})
};