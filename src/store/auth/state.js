export default {
    user: null,
    token: localStorage.getItem('access-token') || '',
    actionUserStatus: '',
    actionLoginStatus: '',
    actionRegisterStatus: '',
    actionLogoutStatus: '',
    actionForgotStatus: '',
    actionResetStatus: '',
}
