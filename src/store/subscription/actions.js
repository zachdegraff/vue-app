import api from "../../api";

export const load = ({commit, rootGetters}, id) => {
    return new Promise((resolve, reject) => {
        const team = rootGetters['teams/current'] || {};
        id = id || team.id;
        if (!id) {
            return resolve({})
        }
        commit('loadStatusRequest');
        api.subscription.get(id).then(res => {
            commit('loadStatusSuccess', res);
            if (team && id === team.id) {
                commit('setTeamSubscription', res.data.data);
            }
            resolve(res.data.data)
        }).catch(err => {
            commit('loadStatusFailure', err);
            reject(err)
        })
    })
};

export const create = ({commit, dispatch}, {id, ...params}) => {
    return new Promise((resolve, reject) => {
        commit('createStatusRequest');
        api.subscription.create(id, params).then(res => {
            commit('createStatusSuccess', res);
            dispatch('teams/get', id, {root: true});
            resolve(res.data.subscription)
        }).catch(err => {
            commit('createStatusFailure', err);
            reject(err)
        })
    })
};

export const loadCoupons = ({commit}) => {
    return new Promise((resolve, reject) => {
        commit('loadCouponsStatusRequest');
        api.coupons.all().then(res => {
            commit('loadCouponsStatusSuccess', res);
            resolve(res.data.data)
        }).catch(err => {
            commit('loadCouponsStatusFailure', err);
            reject(err)
        })
    })
};

export const changeInvoiceEmail = ({commit, dispatch}, {id, ...params}) => {
    return new Promise((resolve, reject) => {
        commit('changeInvoiceEmailStatusRequest');
        api.subscription.changeInvoiceEmail(id, params).then(res => {
            commit('changeInvoiceEmailStatusSuccess', res);
            dispatch('teams/get', id, {root: true});
            resolve(res.data.team)
        }).catch(err => {
            commit('changeInvoiceEmailStatusFailure', err);
            reject(err)
        })
    })
};

export const changePaymentMethod = ({commit, dispatch}, {id, ...params}) => {
    return new Promise((resolve, reject) => {
        commit('changePaymentMethodStatusRequest');
        api.subscription.changePaymentMethod(id, params).then(res => {
            commit('changePaymentMethodStatusSuccess', res);
            dispatch('teams/get', id, {root: true});
            resolve(res.data.team)
        }).catch(err => {
            commit('changePaymentMethodStatusFailure', err);
            reject(err)
        })
    })
};