const routes = {
    'create_card': () => `/cards/create`,
    'create_card_name': ({cardName}) => `/cards/create?name=${cardName}`,
    'view_card': ({id}) => `/cards/${id}`,
    'edit_card': ({id}) => `/cards/${id}/edit`,
    'create_team': () => `/teams/create`,
    'view_team': ({id}) => `/teams/${id}`,
    'edit_team': ({id}) => `/teams/${id}/edit`,
    'invite_member': ({id}) => `/teams/${id}/invite`,
    'ask_help': () => `/ask-help`,
    'change_role': ({id, memberId}) => `/teams/${id}/change-role/${memberId}`,
};

export const next = ({commit}, {name, ...params}) => {
    if (routes[name] === undefined) return;

    const item = {
        name: name,
        title: document.title,
        url: window.location.href.toString(),
        next: routes[name](params)
    };

    if (window.history !== undefined) {
        window.history.pushState(item, '', item.next)
    }
    commit('push', item)
};

export const replace = ({commit}, {name, ...params}) => {
    if (routes[name] === undefined) return;

    const item = {
        name: name,
        title: document.title,
        url: window.location.href.toString(),
        next: routes[name](params)
    };

    if (window.history !== undefined) {
        window.history.replaceState(item, '', item.next)
    }
};

export const pop = ({state}) => {
    const item = state.stack.length > 0 ? state.stack.pop() : null;
    if (item === null) return window.history.go(-1);

    if (window.history !== undefined) {
        window.history.pushState(item, '', item.url)
    }
    document.title = item.title
};