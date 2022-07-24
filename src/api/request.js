import axios from 'axios';

const API_HOST = process.env.API_HOST;

export default class Resource {
    static get(url, config) {
        console.log("GET", API_HOST + url, config)
        return axios.get(API_HOST + url, config || {});
    }

    static put(url, data, config) {
        return axios.put(API_HOST + url, data || {}, config || {});
    }

    static post(url, data, config) {
        return axios.post(API_HOST + url, data || {}, config || {});
    }

    static delete(url, config) {
        return axios.delete(API_HOST + url, config || {});
    }
}
