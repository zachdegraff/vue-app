import Resource from '../Resource'

export default class UserResource {

    static get(id) {
        return Resource.get(`/users/${id}`)
    }

    static all(params = {}) {
        return Resource.get('/users', {params})
    }

    static create(attr) {
        return Resource.post('/users', attr);
    }

    static update(id, attr) {
        return Resource.post(`/users/${id}`, attr);
    }

    static delete(id) {
        return Resource.delete(`/users/${id}`);
    }
}