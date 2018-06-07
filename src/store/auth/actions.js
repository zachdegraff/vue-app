import axios from 'axios'
import api from '../../api'

export const user = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('userStatusRequest');
        api.auth.user().then(res => {
            commit('userStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('userStatusFailure');
            reject(err)
        })
    })
};

export const login = ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
        commit('loginStatusRequest');
        api.auth.login(user).then(res => {
            commit('loginStatusSuccess', res);
            setAuthorizeToken(res.data.token, dispatch);
            resolve(res.data)
        }).catch(err => {
            commit('loginStatusFailure');
            reject(err)
        })
    })
};

export const register = ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
        commit('registerStatusRequest');
        api.auth.register(user).then(res => {
            commit('registerStatusSuccess', res);
            setAuthorizeToken(res.data.token, dispatch);
            resolve(res.data)
        }).catch(err => {
            commit('registerStatusFailure');
            reject(err)
        })
    })
};

export const logout = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('logoutStatusRequest');
        api.auth.logout().then(res => {
            localStorage.removeItem('access-token');
            delete axios.defaults.headers.common['Authorization'];
            commit('logoutStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('logoutStatusFailure');
            reject(err)
        })
    })
};

export const forgot = ({commit}, email) => {
    return new Promise((resolve, reject) => {
        commit('forgotStatusRequest');
        api.auth.forgot(email).then(res => {
            commit('forgotStatusSuccess', res);
            resolve(res.data)
        }).catch(err => {
            commit('forgotStatusFailure');
            reject(err)
        })
    })
};

export const reset = ({commit, dispatch}, form) => {
    return new Promise((resolve, reject) => {
        commit('resetStatusRequest');
        api.auth.reset(form).then(res => {
            commit('resetStatusSuccess', res);
            setAuthorizeToken(data.token, dispatch);
            resolve(res.data)
        }).catch(err => {
            commit('resetStatusFailure');
            reject(err)
        })
    })
};

function setAuthorizeToken(token, dispatch) {
    localStorage.setItem('access-token', token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    dispatch('teams/all', null, {root: true});
}