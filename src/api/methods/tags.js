import request from '../request'

export const forTeam = (id) => {
    return request.get(`/teams/${id}/card-tags`)
};