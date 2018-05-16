import axios from 'axios'
import {handleServerMessage, handleServerException} from '../helpers'

export default ({Vue}) => {
    axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';

    const token = localStorage.getItem('access-token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    axios.interceptors.response.use(handleServerMessage, handleServerException);

    Vue.prototype.$axios = axios
}
