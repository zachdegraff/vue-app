export const getEditingQuestion = state => state.editing;

export const getOpenCPs = state => state.openCPs;
export const getUserCPs = state => state.userCPs;
export const getContentPacks = state => state.contentpacks;
export const getContentPackSubscriptions = state => state.contentPackSubscriptions;

export const getCardCPs = state => state.cardCPs;

export const isLoadOpenCPs = state => state.actionLoadOpenCPsStatus === 'Request';
export const isLoadUserCPs = state => state.actionLoadUserCPsStatus === 'Request';
export const isLoadSubscribedCPs = state => state.actionLoadSubscribedCPsStatus === 'Request';
export const isHelpAsking = state => state.actionStoreStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';
