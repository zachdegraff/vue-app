export const flushState = state => {
    state.openQuestions = [];
    state.userQuestions = [];
    state.answeredQuestions = [];

    state.openQuestionsPage = 0;
    state.openQuestionsLastPage = null;

    state.userQuestionsPage = 0;
    state.userQuestionsLastPage = null;

    state.answeredQuestionsPage = 0;
    state.answeredQuestionsLastPage = null;
};

export const storeStatusRequest = state => state.actionStoreStatus = 'Request';
export const storeStatusSuccess = state => state.actionStoreStatus = 'Success';
export const storeStatusFailure = state => state.actionStoreStatus = 'Failure';

export const commentStatusRequest = state => state.actionCommentStatus = 'Request';
export const commentStatusSuccess = state => state.actionCommentStatus = 'Success';
export const commentStatusFailure = state => state.actionCommentStatus = 'Failure';

export const loadOpenQuestionsStatusRequest = state => state.actionLoadOpenQuestions = 'Request';
export const loadOpenQuestionsStatusSuccess = (state, res) => {
    state.actionLoadOpenQuestions = 'Success';
    state.openQuestions.push(...res.data.data);
    state.openQuestionsPage += 1;
    state.openQuestionsLastPage = res.data.meta.last_page
};
export const loadOpenQuestionsStatusFailure = state => state.actionLoadOpenQuestions = 'Failure';

export const loadUserQuestionsStatusRequest = state => state.actionLoadUserQuestions = 'Request';
export const loadUserQuestionsStatusSuccess = (state, res) => {
    state.actionLoadUserQuestions = 'Success';
    state.userQuestions.push(...res.data.data);
    state.userQuestionsPage += 1;
    state.userQuestionsLastPage = res.data.meta.last_page
};
export const loadUserQuestionsStatusFailure = state => state.actionLoadUserQuestions = 'Failure';

export const loadAnsweredQuestionsStatusRequest = state => state.actionLoadAnsweredQuestions = 'Request';
export const loadAnsweredQuestionsStatusSuccess = (state, res) => {
    state.actionLoadAnsweredQuestions = 'Success';
    state.answeredQuestions.push(...res.data.data);
    state.answeredQuestionsPage += 1;
    state.answeredQuestionsLastPage = res.data.meta.last_page
};
export const loadAnsweredQuestionsStatusFailure = state => state.actionLoadAnsweredQuestions = 'Failure';
