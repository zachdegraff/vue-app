export const getContentPacks = state => state.contentpacks;
export const getContentPackSubscriptions = state => state.contentPackSubscriptions;
export const getContentPackItems = state => state.contentPackItems;
export const isUpdating = state => state.actionUpdateStatus === 'Request';
export const activeContentPack = state => state.activeContentPack;
