export const openAskHelp = ({dispatch, commit}) => {
    dispatch('route/next', {name: 'ask_help'}, {root: true});
    commit('changeAskHelpStatus', true);
};

export const closeAskHelp = ({dispatch, commit}) => {
    dispatch('route/pop', null, {root: true});
    commit('changeAskHelpStatus', false);
};