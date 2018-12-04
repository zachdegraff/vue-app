import {replace} from "../../helpers";

export const setQuery = (state, query) => {
    state.query = query
};

export const updateCardInResults = (state, card) => {
    state.results = replace(state.results, card)
};

export const searchStatusRequest = state => {
    state.actionSearchStatus = 'Request';
    state.results = [];
};
export const searchStatusSuccess = (state, res) => {
    state.actionSearchStatus = 'Success';
    state.results = res.data.data || []
};
export const searchStatusFailure = state => state.actionSearchStatus = 'Failure';

export const indexStatusRequest = state => state.actionSearchStatus = 'Request';
export const indexStatusSuccess = state => state.actionSearchStatus = 'Success';
export const indexStatusFailure = state => state.actionSearchStatus = 'Failure';


export const hintsStatusRequest = state => {
    state.actionHintsStatus = 'Request';
    state.hints = []
};
export const hintsStatusSuccess = (state, res) => {
    state.actionHintsStatus = 'Success';
    state.hints = res.data
};
export const hintsStatusFailure = state => state.actionHintsStatus = 'Failure';