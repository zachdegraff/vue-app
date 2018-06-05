import CardResource from '../../resources/card/CardResource'
import CardNoteResource from '../../resources/card/CardNoteResource'
import CardCollectionResource from '../../resources/card/CardCollectionResource'

export const all = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        commit('set', []);
        commit('allStatusRequest');
        CardResource.all(params).then(req => {
            commit('allStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('allStatusFailure', err);
            reject(err)
        })
    });
};

export const get = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        commit('getStatusRequest');
        CardResource.get(id).then(req => {
            commit('getStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('getStatusFailure', err);
            reject(err)
        })
    });
};

export const create = ({commit}, data) => {
    return new Promise((resolve, reject) => {
        commit('createStatusRequest');
        CardResource.create(data).then(req => {
            commit('createStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('createStatusFailure', err);
            reject(err)
        })
    })
};

export const update = ({commit}, {id, form}) => {
    return new Promise((resolve, reject) => {
        commit('updateStatusRequest');
        CardResource.update(id, form).then(req => {
            commit('updateStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('updateStatusFailure', err);
            reject(err)
        })
    })
};

export const remove = ({}, id) => {
    return new Promise((resolve, reject) => {
        CardResource.delete(id).then(({data}) => {
            resolve(data)
        }).catch(err => reject(err))
    })
};

export const hints = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        commit('hintsStatusRequest');
        CardResource.hints(params).then(req => {
            commit('hintsStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('hintsStatusFailure', err);
            reject(err)
        })
    })
};

export const cardsHints = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        commit('hintsStatusRequest');
        CardResource.cardsHints(params).then(req => {
            commit('hintsStatusSuccess', req);
            resolve(req.data)
        }).catch(err => {
            commit('hintsStatusFailure', err);
            reject(err)
        })
    })
};

export const search = ({commit}, params) => {
    return new Promise((resolve, reject) => {
        commit('set', []);
        commit('searchStatusRequest');
        CardResource.search(params).then(req => {
            commit('searchStatusSuccess', req);
            resolve(req.data.data)
        }).catch(err => {
            commit('searchStatusFailure', err);
            reject(err)
        })
    })
};

export const collections = ({}, id) => {
    return new Promise((resolve, reject) => {
        CardCollectionResource.teamCollections(id)
            .then(({data}) => resolve(data.data))
            .catch(err => reject(err))
    })
};

export const recentlyAdded = ({}, id) => {
    return new Promise((resolve, reject) => {
        CardResource.recentlyAdded(id)
            .then(({data}) => resolve(data.data))
            .catch(err => reject(err))
    })
};

export const recentlyUpdated = ({}, id) => {
    return new Promise((resolve, reject) => {
        CardResource.recentlyUpdated(id)
            .then(({data}) => resolve(data.data))
            .catch(err => reject(err))
    })
};

export const getNote = ({}, id) => {
    return new Promise((resolve, reject) => {
        CardNoteResource.get(id)
            .then(({data}) => resolve(data.data))
            .catch(err => reject(err))
    })
};

export const storeNote = ({}, {id, note}) => {
    return new Promise((resolve, reject) => {
        CardNoteResource.store(id, {note})
            .then(({data}) => resolve(data))
            .catch(err => reject(err))
    })
};