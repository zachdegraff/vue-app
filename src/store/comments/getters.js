export const getEditingComment = state => state.editing;

export const isStoring = state => state.actionStoreStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';