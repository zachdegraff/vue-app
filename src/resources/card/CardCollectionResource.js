import Resource from '../Resource'

export default class CardCollectionResource {

    static teamCollections(id) {
        return Resource.get(`/teams/${id}/card-collections`)
    }
}