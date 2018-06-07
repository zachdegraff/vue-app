export const forTeamStatusRequest = state => state.actionForTeamStatus = 'Request';
export const forTeamStatusSuccess = (state, res) => {
    state.actionForTeamStatus = 'Success';
    state.items = res.data.data
};
export const forTeamStatusFailure = state => state.actionForTeamStatus = 'Failure';