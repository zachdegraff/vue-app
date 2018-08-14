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

export const allStatusRequest = state => state.actionAllStatus = 'Request';
export const allStatusSuccess = state => state.actionAllStatus = 'Success';
export const allStatusFailure = state => state.actionAllStatus = 'Failure';

export const storeStatusRequest = state => state.actionStoreStatus = 'Request';
export const storeStatusSuccess = (state, res) => {
    state.actionStoreStatus = 'Success';
    state.openQuestions.unshift(res.data.question);
};
export const storeStatusFailure = state => state.actionStoreStatus = 'Failure';

export const commentStatusRequest = state => state.actionCommentStatus = 'Request';
export const commentStatusSuccess = state => state.actionCommentStatus = 'Success';
export const commentStatusFailure = state => state.actionCommentStatus = 'Failure';

export const loadQuestionsCountRequest = state => state.actionLoadQuestionsCountStatus = 'Request';
export const loadQuestionsCountSuccess = (state, res) => {
    state.actionLoadQuestionsCountStatus = 'Success';
    state.count = res.data
};
export const loadQuestionsCountFailure = state => state.actionLoadQuestionsCountStatus = 'Failure';

export const loadOpenQuestionsStatusRequest = state => state.actionLoadOpenQuestionsStatus = 'Request';
export const loadOpenQuestionsStatusSuccess = (state, res) => {
    state.actionLoadOpenQuestionsStatus = 'Success';
    state.openQuestions.push(...res.data.data);
    state.openQuestionsPage += 1;
    state.openQuestionsLastPage = res.data.meta.last_page
};
export const loadOpenQuestionsStatusFailure = state => state.actionLoadOpenQuestionsStatus = 'Failure';

export const loadUserQuestionsStatusRequest = state => state.actionLoadUserQuestionsStatus = 'Request';
export const loadUserQuestionsStatusSuccess = (state, res) => {
    state.actionLoadUserQuestionsStatus = 'Success';
    state.userQuestions.push(...res.data.data);
    state.userQuestionsPage += 1;
    state.userQuestionsLastPage = res.data.meta.last_page
};
export const loadUserQuestionsStatusFailure = state => state.actionLoadUserQuestionsStatus = 'Failure';

export const loadAnsweredQuestionsStatusRequest = state => state.actionLoadAnsweredQuestionsStatus = 'Request';
export const loadAnsweredQuestionsStatusSuccess = (state, res) => {
    state.actionLoadAnsweredQuestionsStatus = 'Success';
    state.answeredQuestions.push(...res.data.data);
    state.answeredQuestionsPage += 1;
    state.answeredQuestionsLastPage = res.data.meta.last_page
};
export const loadAnsweredQuestionsStatusFailure = state => state.actionLoadAnsweredQuestionsStatus = 'Failure';
