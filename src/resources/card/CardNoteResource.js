import Resource from '../Resource'

export default class CardNoteResource {

    static get(id) {
        return Resource.get(`/cards/${id}/note`)
    }

    static store(id, attr) {
        return Resource.post(`/cards/${id}/note`, attr);
    }
}