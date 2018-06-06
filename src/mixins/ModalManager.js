const routes = {
    'create_card': () => `/cards/create`,
    'view_card': ({id}) => `/cards/${id}`,
    'edit_card': ({id}) => `/cards/${id}/edit`,
    'create_team': () => `teams/create`,
    'view_team': ({id}) => `teams/${id}`,
    'edit_team': ({id}) => `teams/${id}/edit`,
    'invite_member': ({id}) => `teams/${id}/invite`,
    'change_role': ({id, memberId}) => `teams/${id}/change-role/${memberId}`,
};

const ModalManager = {
    data: () => {
        return {
            stateStack: []
        }
    },
    methods: {
        openModalWindow(name, params = {}) {
            if (routes[name] === undefined) return;

            const state = {
                title: document.title,
                url: window.location.href,
                state: params
            };

            if (window.history !== undefined) {
                window.history.pushState(state, '', routes[name](params))
            }
            this.stateStack.push(state)
        },
        closeModalWindow() {
            if (this.stateStack.length === 0) return this.$router.go(-1);

            const state = this.stateStack.pop();
            if (window.history !== undefined) {
                window.history.pushState(state.state, '', state.url)
            }
            document.title = state.title;
        }
    }
};

export default ModalManager;