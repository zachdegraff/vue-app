import {Notify} from 'quasar'

const API_HOST = process.env.API_HOST;

export const notify = (message) => {
    Notify.create({
        message,
        timeout: 1000,
        type: 'positive',
        color: 'positive',
        position: 'top-left'
    })
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

export const formatContent = (content) => {

    let result = content
        .replace(/\*(.*)\*/g, '<strong>$1</strong>')
        .replace(/_(.*)_/g, '<em>$1</em>');


    const matches = result.match(/<([^<]*)\|([^<]*)>/g);
    if (matches === null) {
        return result;
    }
    matches.forEach(i => {
        let tmpl = '<a href="$1" target="_blank">$2</a>';
        if (i.indexOf(API_HOST) !== -1) {
            //tmpl = '<router-link to="$1">$2</router-link>'
            tmpl = '<a href="$1">$2</a>'
        }
        result = result.replace(i, i.replace(/<(.*)\|(.*)>/, tmpl))
    });
    return result.replace(API_HOST, '');
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