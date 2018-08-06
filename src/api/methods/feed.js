import request from '../request'

export const load = (teamId, params = {}) => {
    return request.get(`/teams/${teamId}/feed`, {params})
};