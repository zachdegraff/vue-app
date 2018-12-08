export const getEditingQuestion = state => state.editing;

export const getOpenQuestions = state => state.openQuestions;
export const getUserQuestions = state => state.userQuestions;
export const getAnsweredQuestions = state => state.answeredQuestions;

export const getCardQuestions = state => state.cardQuestions;

export const isLoadOpenQuestions = state => state.actionLoadOpenQuestionsStatus === 'Request';
export const isLoadUserQuestions = state => state.actionLoadUserQuestionsStatus === 'Request';
export const isLoadAnsweredQuestions = state => state.actionLoadAnsweredQuestionsStatus === 'Request';
export const isHelpAsking = state => state.actionStoreStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';
