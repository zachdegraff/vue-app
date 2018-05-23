import Resource from '../Resource'

export default class TeamMemberResource {

    static invite(teamId, params = {}) {
        return Resource.post(`/teams/${teamId}/invite`, params)
    }

    static retry(teamId, memberId) {
        return Resource.post(`/teams/${teamId}/invite/${memberId}/retry`)
    }

    static join(hash) {
        return Resource.post(`/teams/join/${hash}`)
    }

    static exclude(teamId, memberId) {
        return Resource.delete(`/teams/${teamId}/members/${memberId}`);
    }

    static changeRole(teamId, memberId, role) {
        return Resource.post(`/teams/${teamId}/members/${memberId}/role`, {role});
    }
}