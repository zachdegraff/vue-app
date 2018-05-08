import axios from 'axios'

export default ({Vue}) => {
    axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';
    axios.defaults.headers.common['Authorization'] = 'Bearer kXvdOdNealt0bzxxVKOUJJ6DzOiq7BPN';

    Vue.prototype.$axios = axios
}
