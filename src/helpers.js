import {Notify} from 'quasar'
import Router from './router'

export const route = (name, params = {}) => {
    const url = Router.resolve({name, params});

    return url.href
};

export const notify = (message) => {
    Notify.create({
        message,
        timeout: 3000,
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

export const replace = (arr, item) => {
    const idx = arr.findIndex(el => el.id === item.id);

    idx === -1 ? arr.push(item) : arr[idx] = item;
    return arr.slice(0)
};

export const remove = (arr, item) => {
    const idx = arr.findIndex(el => el.id === item.id);
    if (idx !== -1) {
        arr.splice(idx, 1)
    }
    return arr;
};

export const decode = (string, quoteStyle) => {
    let optTemp = 0, i = 0, noquotes = false;
    if (typeof quoteStyle === 'undefined') {
        quoteStyle = 2
    }
    string = string.toString()
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

    const OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE': 1,
        'ENT_HTML_QUOTE_DOUBLE': 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE': 4
    };
    if (quoteStyle === 0) {
        noquotes = true
    }
    if (typeof quoteStyle !== 'number') {
        quoteStyle = [].concat(quoteStyle);
        for (i = 0; i < quoteStyle.length; i++) {
            if (OPTS[quoteStyle[i]] === 0) {
                noquotes = true
            } else if (OPTS[quoteStyle[i]]) {
                optTemp = optTemp | OPTS[quoteStyle[i]]
            }
        }
        quoteStyle = optTemp
    }
    if (quoteStyle & OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/&#0*39;/g, "'")
    }
    if (!noquotes) {
        string = string.replace(/&quot;/g, '"')
    }
    string = string.replace(/&amp;/g, '&');

    return string
};

export const strip_tags = (str, allowed_tags = '') => {
    let allowed_array = [];

    const replacer = function (search, replace, str) {
        return str.split(search).join(replace);
    };
    if (allowed_tags) {
        allowed_array = allowed_tags.match(/([a-zA-Z]+)/gi);
    }
    str += '';
    const matches = str.match(/(<\/?[\S][^>]*>)/gi);
    for (let key in matches) {
        if (isNaN(key)) {
            continue;
        }
        const html = matches[key].toString();
        let allowed = false;
        for (let k in allowed_array) {
            const allowed_tag = allowed_array[k];
            let i = -1;

            if (i !== 0) {
                i = html.toLowerCase().indexOf('<' + allowed_tag + '>');
            }
            if (i !== 0) {
                i = html.toLowerCase().indexOf('<' + allowed_tag + ' ');
            }
            if (i !== 0) {
                i = html.toLowerCase().indexOf('</' + allowed_tag);
            }
            if (i === 0) {
                allowed = true;
                break;
            }
        }
        if (!allowed) {
            str = replacer(html, ' ', str);
        }
    }
    return str;
}


export const error = (message) => {
    Notify.create({
        message,
        timeout: 3000,
        type: 'negative',
        color: 'negative',
        position: 'top-left'
    })
};

export const selectNode = (node) => {
    const range = document.createRange(),
        sel = window.getSelection(),
        text = node.firstChild;

    range.setStart(text, 0);
    range.setEnd(text, text.length);

    sel.removeAllRanges();
    sel.addRange(range);
};

export const setCaretPosition = (node, pos = null) => {
    const range = document.createRange(),
        sel = window.getSelection(),
        text = node.firstChild || node,
        position = pos || text.length;

    range.setStart(text, position);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
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

export const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};