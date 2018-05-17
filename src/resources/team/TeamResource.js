import Resource from '../Resource'

export default class TeamResource {

    static get(id) {
        return Resource.get(`/teams/${id}`)
    }

    static all(params = {}) {
        return Resource.get('/teams', {params})
    }

    static create(attr) {
        return Resource.post('/teams', attr);
    }

    static update(id, attr) {
        return Resource.post(`/teams/${id}`, attr);
    }

    static delete(id) {
        return Resource.delete(`/teams/${id}`);
    }

    static members(id) {
        return Resource.get(`/teams/${id}/members`);
    }
}