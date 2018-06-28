
export const getOpenQuestions = state => state.openQuestions;
export const getUserQuestions = state => state.userQuestions;
export const getAnsweredQuestions = state => state.answeredQuestions;



export const isHelpAsking = state => state.actionStoreStatus === 'Request';