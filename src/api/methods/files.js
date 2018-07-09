import request from '../request'

export const uploadEditorFile = (id, form, config = {}) => {
    return request.post(`/cards/${id}/files`, form, config);
};
