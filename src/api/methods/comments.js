import request from "../request";

export const get = (question, id) => {
    return request.get(`/questions/${question}/comments/${id}`);
};

export const store = (id, attr) => {
    return request.post(`/questions/${id}/comments`, attr)
};

export const update = (question, id, attr) => {
    attr['_method'] = 'PUT';
    return request.post(`/questions/${question}/comments/${id}`, attr);
};

export const remove = (question, id) => {
    return request.delete(`/questions/${question}/comments/${id}`);
};