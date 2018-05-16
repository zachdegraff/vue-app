import Resource from '../Resource'

export default class AuthResource {

    static user() {
        return Resource.get('/auth/user')
    }

    static login(data) {
        return Resource.post('/auth/login', data)
    }

    static register(data) {
        return Resource.post('/auth/register', data)
    }

    static logout() {
        return Resource.post('/auth/logout')
    }

    static forgot(email) {
        return Resource.post('/auth/forgot', {email})
    }

    static reset(data) {
        return Resource.post('/auth/reset', data)
    }

}