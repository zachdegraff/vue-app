export const loadSiteStatusRequest = state => state.loadSiteStatus = 'Request';
export const loadSiteStatusSuccess = (state, res) => {
    state.loadSiteStatus = 'Success';
    state.site = res.data.data
};
export const loadSiteStatusFailure = state => state.loadSiteStatus = 'Failure';


export const loadCardsStatusRequest = state => state.loadCardsStatus = 'Request';
export const loadCardsStatusSuccess = (state, res) => {
    state.loadCardsStatus = 'Success';
    state.cards = res.data.data
};
export const loadCardsStatusFailure = state => state.loadCardsStatus = 'Failure';

export const loadTeamSitesStatusRequest = state => state.loadTeamSitesStatus = 'Request';
export const loadTeamSitesStatusSuccess = (state, res) => {
    state.loadTeamSitesStatus = 'Success';
    state.teamSites = res.data.data
};
export const loadTeamSitesStatusFailure = state => state.loadTeamSitesStatus = 'Failure';

export const loadSiteConfigStatusRequest = state => state.loadSiteConfigStatus = 'Request';
export const loadSiteConfigStatusSuccess = state => state.loadSiteConfigStatus = 'Success';
export const loadSiteConfigStatusFailure = state => state.loadSiteConfigStatus = 'Failure';

export const storeStatusRequest = state => state.storeStatus = 'Request';
export const storeStatusSuccess = state => state.storeStatus = 'Success';
export const storeStatusFailure = state => state.storeStatus = 'Failure';

 
