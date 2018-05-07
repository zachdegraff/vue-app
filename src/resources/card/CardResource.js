import Resource from '../Resource'

export default class CardResource {

    static all(params = {}) {
        return Resource.get('/cards', {params})
    }

    static hints(term) {
        return Resource.get(`/cards/hints/${term}`)
    }
}