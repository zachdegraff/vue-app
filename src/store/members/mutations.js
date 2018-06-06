import {replace} from "../../helpers";

export const loadMemberStatusRequest = state => state.loadMemberStatus = 'Request';
export const loadMemberStatusSuccess = state => state.loadMemberStatus = 'Success';
export const loadMemberStatusFailure = state => state.loadMemberStatus = 'Failure';

export const loadTeamMembersStatusRequest = state => {
    state.loadTeamMembersStatus = 'Request';
    state.items = []
};
export const loadTeamMembersStatusSuccess = (state, req) => {
    state.loadTeamMembersStatus = 'Success';
    state.items = req.data.data
};

export const loadTeamMembersStatusFailure = state => state.loadTeamMembersStatus = 'Failure';

export const inviteMemberToTeamStatusRequest = state => state.inviteMemberToTeamStatus = 'Request';
export const inviteMemberToTeamStatusSuccess = (state, req) => {
    state.inviteMemberToTeamStatus = 'Success';
    state.items.push(req.data.member);
};
export const inviteMemberToTeamStatusFailure = state => state.inviteMemberToTeamStatus = 'Failure';

export const joinMemberToTeamStatusRequest = state => state.joinMemberToTeamStatus = 'Request';
export const joinMemberToTeamStatusSuccess = state => state.joinMemberToTeamStatus = 'Success';
export const joinMemberToTeamStatusFailure = state => state.joinMemberToTeamStatus = 'Failure';

export const changeMemberRoleStatusRequest = state => state.changeMemberRoleStatus = 'Request';
export const changeMemberRoleStatusSuccess = (state, req) => {
    state.changeMemberRoleStatus = 'Success';
    replace(state.items, req.data.member)
};
export const changeMemberRoleStatusFailure = state => state.changeMemberRoleStatus = 'Failure';

export const retryMemberInvitationStatusRequest = state => state.retryMemberInvitationStatus = 'Request';
export const retryMemberInvitationStatusSuccess = state => state.retryMemberInvitationStatus = 'Success';
export const retryMemberInvitationStatusFailure = state => state.retryMemberInvitationStatus = 'Failure';

export const excludeMemberFromTeamStatusRequest = state => state.excludeMemberFromTeamStatus = 'Request';
export const excludeMemberFromTeamStatusSuccess = (state, req) => {
    state.excludeMemberFromTeamStatus = 'Success';
    const idx = state.items.findIndex(item => item.id === req.data.member.id);
    if (idx !== -1) {
        state.items.splice(idx, 1)
    }
};
export const excludeMemberFromTeamStatusFailure = state => state.excludeMemberFromTeamStatus = 'Failure';