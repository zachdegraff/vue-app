import Resource from '../Resource'

export default class CardItemResource {

    static remove(id) {
        return Resource.delete(`/card-items/${id}`)
    }

}