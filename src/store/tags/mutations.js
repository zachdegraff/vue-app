export const flushTagsState = state => {
    state.items = []
};

export const allStatusRequest = state => state.actionAllStatus = 'Request';
export const allStatusSuccess = (state, res) => {
    state.actionAllStatus = 'Success';
    state.items = res.data.data
};
export const allStatusFailure = state => state.actionAllStatus = 'Failure';