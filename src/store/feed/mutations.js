export const loadStatusRequest = state => state.actionLoadStatus = 'Request';
export const loadStatusSuccess = (state, res) => {
    state.actionLoadStatus = 'Success';
    state.items.push(...res.data.data);
    state.page += 1;
    state.lastPage = res.data.meta.last_page
};
export const loadStatusFailure = state => state.actionLoadStatus = 'Failure';

export const freshStatusRequest = state => state.actionFreshStatus = 'Request';
export const freshStatusSuccess = (state, res) => {
    state.actionFreshStatus = 'Success';
    state.items = res.data.data;
    state.page += 1;
    state.lastPage = res.data.meta.last_page
};
export const freshStatusFailure = state => state.actionFreshStatus = 'Failure';