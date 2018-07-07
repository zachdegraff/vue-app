import request from '../request'

export const uploadEditorFile = (form) => {
    return request.post('/files/editor', form);
};
