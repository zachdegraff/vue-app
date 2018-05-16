export const authUser = state => state.user;

export const authStatus = state => state.status;
export const isAuthenticated = state => !!state.token;

export const isLogging = state => state.actionLoginStatus === 'Request';
export const isRegistering = state => state.actionRegisterStatus === 'Request';
export const isRestoring = state => state.actionForgotStatus === 'Request';
export const isResetting = state => state.actionResetStatus === 'Request';
