export const countStatusRequest = state => state.actionCountStatus = 'Request';
export const countStatusSuccess = state => state.actionCountStatus = 'Success';
export const countStatusFailure = state => state.actionCountStatus = 'Failure';

export const updateStatusRequest = state => state.actionUpdateStatus = 'Request';
export const updateStatusSuccess = state => state.actionUpdateStatus = 'Success';
export const updateStatusFailure = state => state.actionUpdateStatus = 'Failure';

export const favoriteStatusRequest = state => state.actionFavoriteStatus = 'Request';
export const favoriteStatusSuccess = (state, res) => {
    state.actionFavoriteStatus = 'Success';

    const items = state.favorite,
        idx = items.findIndex(el => el.id === res.data.data.id);

    idx === -1 ? items.push(res.data.data) : items.splice(idx, 1);

    state.favorite = items
};
export const favoriteStatusFailure = state => state.actionFavoriteStatus = 'Failure';

export const loadFavoriteStatusRequest = state => state.actionLoadFavoriteStatus = 'Request';
export const loadFavoriteStatusSuccess = (state, res) => {
    state.actionLoadFavoriteStatus = 'Success';
    state.favorite = res.data.data
};
export const loadFavoriteStatusFailure = state => state.actionLoadFavoriteStatus = 'Failure';

export const loadRolesStatusRequest = state => state.actionLoadRolesStatus = 'Request';
export const loadRolesStatusSuccess = (state, res) => {
    state.actionLoadRolesStatus = 'Success';
    state.roles = res.data
};
export const loadRolesStatusFailure = state => state.actionLoadRolesStatus = 'Failure';