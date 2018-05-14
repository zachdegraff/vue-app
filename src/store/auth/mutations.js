
export const loginStatusRequest = state => state.actionLoginStatus = 'Request';
export const loginStatusSuccess = (state, token) => {
    state.actionLoginStatus = 'Success';
    state.token = token
};
export const loginStatusFailure = state => {
    state.actionLoginStatus = 'Failure';
    state.token = ''
};


export const registerStatusRequest = state => state.actionRegisterStatus = 'Request';
export const registerStatusSuccess = (state, token) => {
    state.actionRegisterStatus = 'Success';
    state.token = token
};
export const registerStatusFailure = state => {
    state.actionRegisterStatus = 'Failure';
    state.token = ''
};


export const logoutStatusRequest = state => state.actionLogoutStatus = 'Request';
export const logoutStatusSuccess = state => {
    state.actionLogoutStatus = 'Success';
    state.token = ''
};
export const logoutStatusFailure = state => state.actionLogoutStatus = 'Failure';