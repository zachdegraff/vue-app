export const userStatusRequest = state => state.actionUserStatus = 'Request';
export const userStatusSuccess = (state, user) => {
    state.actionUserStatus = 'Success';
    state.user = user
};
export const userStatusFailure = state => state.actionUserStatus = 'Failure';


export const loginStatusRequest = state => state.actionLoginStatus = 'Request';
export const loginStatusSuccess = (state, res) => {
    state.actionLoginStatus = 'Success';
    state.token = res.token;
    state.user = res.user
};
export const loginStatusFailure = state => {
    state.actionLoginStatus = 'Failure';
    state.token = ''
};


export const registerStatusRequest = state => state.actionRegisterStatus = 'Request';
export const registerStatusSuccess = (state, res) => {
    state.actionRegisterStatus = 'Success';
    state.token = res.token;
    state.user = res.user
};
export const registerStatusFailure = state => {
    state.actionRegisterStatus = 'Failure';
    state.token = ''
};


export const logoutStatusRequest = state => state.actionLogoutStatus = 'Request';
export const logoutStatusSuccess = state => {
    state.actionLogoutStatus = 'Success';
    state.token = '';
    state.user = null
};
export const logoutStatusFailure = state => state.actionLogoutStatus = 'Failure';

export const forgotStatusRequest = state => state.actionForgotStatus = 'Request';
export const forgotStatusSuccess = state => state.actionForgotStatus = 'Success';
export const forgotStatusFailure = state => state.actionForgotStatus = 'Failure';

export const resetStatusRequest = state => state.actionResetStatus = 'Request';
export const resetStatusSuccess = (state, res) => {
    state.actionResetStatus = 'Success';
    state.token = res.token;
    state.user = res.user
};
export const resetStatusFailure = state => state.actionResetStatus = 'Failure';