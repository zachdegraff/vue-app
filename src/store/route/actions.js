const routes = {
    'create_card': () => `/cards/create`,
    'create_card_name': ({param}) => `/cards/create?name=${param}`,
    'view_card': ({id}) => `/cards/${id}`,
    'edit_card': ({id}) => `/cards/${id}/edit`,
    'create_team': () => `teams/create`,
    'view_team': ({id}) => `teams/${id}`,
    'edit_team': ({id}) => `teams/${id}/edit`,
    'invite_member': ({id}) => `teams/${id}/invite`,
    'change_role': ({id, memberId}) => `teams/${id}/change-role/${memberId}`,
};

export const next = ({commit}, {name, ...params}) => {
    if (routes[name] === undefined) return;

    const item = {
        name: name,
        title: document.title,
        url: window.location.href.toString(),
    };

    if (window.history !== undefined) {
        window.history.pushState(item, '', routes[name](params))
    }
    commit('push', item)
};

export const pop = ({state}) => {
    const item = state.stack.length > 0 ? state.stack.pop() : null;
    if (item === null) return this.$router.go(-1);

    if (window.history !== undefined) {
        window.history.pushState(item, '', item.url)
    }
    document.title = item.title
};