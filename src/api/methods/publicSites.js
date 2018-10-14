import request from '../request'

export const getByLink = (siteLink) => {
    return request.get(`/one-public-site/${siteLink}`)
};
export const getByCard = (cardId) => {
    return request.get(`/public-site-card/${cardId}`)
};