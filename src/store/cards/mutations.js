export const set = (state, items) => state.items = items;

export const replace = (state, item) => {
    const idx = state.items.findIndex(el => el.id === item.id);
    if (idx === -1) {
        return state.items.unshift(item)
    }
    state.items[idx] = item
};

export const allStatusRequest = state => state.actionAllStatus = 'Request';
export const allStatusSuccess = (state, req) => {
    state.actionAllStatus = 'Success';
    state.items = req.data.data
};
export const allStatusFailure = state => state.actionAllStatus = 'Failure';

export const getStatusRequest = state => state.actionGetStatus = 'Request';
export const getStatusSuccess = state => state.actionGetStatus = 'Success';
export const getStatusFailure = state => state.actionGetStatus = 'Failure';

export const updateStatusRequest = state => state.actionUpdateStatus = 'Request';
export const updateStatusSuccess = (state, req) => {
    state.actionUpdateStatus = 'Success';
    replace(state, req.data.card)
};
export const updateStatusFailure = state => state.actionUpdateStatus = 'Failure';

export const createStatusRequest = state => state.actionCreateStatus = 'Request';
export const createStatusSuccess = state => state.actionCreateStatus = 'Success';
export const createStatusFailure = state => state.actionCreateStatus = 'Failure';

export const searchStatusRequest = state => state.actionSearchStatus = 'Request';
export const searchStatusSuccess = (state, req) => {
    state.actionSearchStatus = 'Success';
    set(state, req.data.data)
};
export const searchStatusFailure = state => state.actionSearchStatus = 'Failure';

export const hintsStatusRequest = state => state.actionHintsStatus = 'Request';
export const hintsStatusSuccess = state => state.actionHintsStatus = 'Success';
export const hintsStatusFailure = state => state.actionHintsStatus = 'Failure';
