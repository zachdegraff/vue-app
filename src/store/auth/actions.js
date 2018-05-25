import AuthResource from '../../resources/auth/AuthResource'
import axios from 'axios'

export const user = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('userStatusRequest');
        AuthResource.user().then(({data}) => {
            commit('userStatusSuccess', data.data);
            resolve(data.data)
        }).catch(err => {
            commit('userStatusFailure');
            reject(err)
        })
    })
};

export const login = ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
        commit('loginStatusRequest');
        AuthResource.login(user).then(({data}) => {
            commit('loginStatusSuccess', data);
            setAuthorizeToken(data.token, dispatch);
            resolve(data)
        }).catch(err => {
            commit('loginStatusFailure');
            reject(err)
        })
    })
};

export const register = ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
        commit('registerStatusRequest');
        AuthResource.register(user).then(({data}) => {
            commit('registerStatusSuccess', data);
            setAuthorizeToken(data.token, dispatch);
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

export const forgot = ({commit}, email) => {
    return new Promise((resolve, reject) => {
        commit('forgotStatusRequest');
        AuthResource.forgot(email).then(({data}) => {
            commit('forgotStatusSuccess');
            resolve(data)
        }).catch(err => {
            commit('forgotStatusFailure');
            reject(err)
        })
    })
};

export const reset = ({commit, dispatch}, form) => {
    return new Promise((resolve, reject) => {
        commit('resetStatusRequest');
        AuthResource.reset(form).then(({data}) => {
            commit('resetStatusSuccess', data);
            setAuthorizeToken(data.token, dispatch);
            resolve(data)
        }).catch(err => {
            commit('resetStatusFailure');
            reject(err)
        })
    })
};

function setAuthorizeToken(token, dispatch) {
    localStorage.setItem('access-token', token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    dispatch('teams/all', {}, {root: true});
}