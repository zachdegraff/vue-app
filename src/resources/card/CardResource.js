import Resource from '../Resource'

export default class CardResource {

    static get(id) {
        return Resource.get(`/cards/${id}`)
    }

    static all(params = {}) {
        return Resource.get('/cards', {params})
    }

    static create(attr) {
        return Resource.post('/cards', attr);
    }

    static update(id, attr) {
        return Resource.put(`/cards/${id}`, attr);
    }

    static hints(term) {
        return Resource.get('/cards/hints', {params: {term}})
    }

    static search(query) {
        return Resource.get('/cards/search', {params: {query}})
    }
}