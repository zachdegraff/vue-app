export const authStatus = state => state.status;
export const isAuthenticated = state => !!state.token;

export const isLogging = state => state.actionLoginStatus === 'Request';
export const isRegistering = state => state.actionRegisterStatus === 'Request';
