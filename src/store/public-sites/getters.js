export const getSite = state => state.site;
export const getCards = state => state.cards;
export const getTeamSites = state => state.teamSites;
export const getFeaturedCards = state => state.featuredCards;
export const getSearchResults = state => state.searchResults;


export const isSiteLoading = state => state.loadSiteStatus === 'Request';
export const isCardsLoading = state => state.loadCardsStatus === 'Request';
export const isSearchLoading = state => state.searchCardsStatus === 'Request';