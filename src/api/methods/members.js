import request from '../request'

export const get = (id) => {
    return request.get(`/members/${id}`)
};

/**
 *
 * @param id Team ID
 * @param params
 * @returns {Promise}
 */
export const invite = (id, params = {}) => {
    return request.post(`/teams/${id}/invite`, params)
};

export const retry = (id) => {
    return request.post(`/members/${id}/retry`)
};

export const join = (hash) => {
    return request.post(`/teams/join/${hash}`)
};

export const exclude = (id) => {
    return request.delete(`/members/${id}`);
};

export const changeRole = (id, role) => {
    return request.post(`/members/${id}/role`, {role});
};

export const invitation = (hash) => {
    return request.get(`/teams/invitation/${hash}`)
};