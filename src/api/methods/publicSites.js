import request from '../request'

export const getByLink = (siteLink) => {
    return request.get(`/one-public-site/${siteLink}`)
};