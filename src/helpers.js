import {Notify} from 'quasar'

export const notify = (message) => {
    Notify.create({
        message,
        timeout: 1000,
        type: 'positive',
        color: 'positive',
        position: 'top-left'
    })
};

export const prop = (obj, prop) => {
    if (obj === null) {
        return ''
    }
    return obj[prop]
};

export const error = (message) => {
    Notify.create({
        message,
        timeout: 1000,
        type: 'negative',
        color: 'negative',
        position: 'top-left'
    })
};

export const handleServerMessage = (response) => {
    let data = response.data;
    if (data.message !== undefined) {
        notify(data.message)
    }

    return response;
};

export const handleServerException = (result) => {
    let status = result.response.status, data = result.response.data;
    if (status === 422) {
        for (let i in data.errors) {
            data.errors[i].forEach(err => error(err))
        }
    } else {
        let message = data.message || data.error;
        if (message !== undefined) {
            error(message)
        }
        if (status === 401) {
            if (window.location.href.indexOf('/auth/login') === -1) {
                window.location.href = '/auth/login'
            }
        }
    }

    return Promise.reject(result);
};