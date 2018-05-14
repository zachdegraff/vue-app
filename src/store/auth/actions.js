import AuthResource from '../../resources/auth/AuthResource'
import axios from 'axios'

export const login = ({commit}, user) => {
    return new Promise((resolve, reject) => {
        commit('loginStatusRequest');
        AuthResource.login(user).then(({data}) => {
            commit('loginStatusSuccess', data.token);
            setAuthorizeToken(data.token);
            resolve(data)
        }).catch(err => {
            commit('loginStatusFailure');
            reject(err)
        })
    })
};

export const register = ({commit}, user) => {
    return new Promise((resolve, reject) => {
        commit('registerStatusRequest');
        AuthResource.register(user).then(({data}) => {
            commit('registerStatusSuccess', data.token);
            setAuthorizeToken(data.token);
            resolve(data)
        }).catch(err => {
            commit('registerStatusFailure');
            reject(err)
        })
    })
};

export const logout = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('logoutStatusRequest');
        AuthResource.logout().then(({data}) => {
            localStorage.removeItem('access-token');
            delete axios.defaults.headers.common['Authorization'];
            commit('logoutStatusSuccess');
            resolve(data)
        }).catch(err => {
            commit('logoutStatusFailure');
            reject(err)
        })
    })
};

function setAuthorizeToken(token) {
    localStorage.setItem('access-token', token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}