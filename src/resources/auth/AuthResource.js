import Resource from '../Resource'

export default class AuthResource {

    static login(data) {
        return Resource.post('/auth/login', data)
    }

    static register(data) {
        return Resource.post('/auth/register', data)
    }

    static logout() {
        return Resource.post('/auth/logout')
    }

}