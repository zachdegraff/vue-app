import request from '../request'

export const user = () => {
    return request.get('/auth/user')
};

export const login = (data) => {
    return request.post('/auth/login', data)
};

export const register = (data) => {
    return request.post('/auth/register', data)
};

export const logout = () => {
    return request.post('/auth/logout')
};

export const forgot = (email) => {
    return request.post('/auth/forgot', {email})
};

export const reset = (data) => {
    return request.post('/auth/reset', data)
};

export const openidAuthorize = (data) => {
    return request.post('/openid/authorize', data)
}
