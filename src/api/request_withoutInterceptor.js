import axios from 'axios';

const API_HOST = process.env.API_HOST;

const axios2 = axios.create()

axios2.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios2.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';

const token = localStorage.getItem('access-token');
if (token) {
    axios2.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default class Resource {
    static get(url, config) {
        return axios2.get(API_HOST + url, config || {});
    }

    static put(url, data, config) {
        return axios2.put(API_HOST + url, data || {}, config || {});
    }

    static post(url, data, config) {
        return axios2.post(API_HOST + url, data || {}, config || {});
    }

    static delete(url, config) {
        return axios2.delete(API_HOST + url, config || {});
    }
}
