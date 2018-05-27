import Resource from '../Resource'

export default class TeamMemberResource {

    static get(id) {
        return Resource.get(`/members/${id}`)
    }

    static invite(teamId, params = {}) {
        return Resource.post(`/teams/${teamId}/invite`, params)
    }

    static retry(id) {
        return Resource.post(`/members/${id}/retry`)
    }

    static join(hash) {
        return Resource.post(`/teams/join/${hash}`)
    }

    static exclude(id) {
        return Resource.delete(`/members/${id}`);
    }

    static changeRole(id, role) {
        return Resource.post(`/members/${id}/role`, {role});
    }
}