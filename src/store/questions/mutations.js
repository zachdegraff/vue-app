import {remove, replace} from "../../helpers";

export const flushState = state => {
    state.openUpdateQuestions = [];

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

    const question = res.data.question;
    state.openQuestions.unshift(question);
    if (question.card) {
        state.cardQuestions.push(question)
    }
};
export const storeUpdateStatusRequest = state => state.actionStoreUpdateStatus = 'Request';

export const storeUpdateStatusSuccess = (state, res) => {
    state.actionStoreUpdateStatus = 'Success';
    state.cardUpdateQuestions = [];
    const question = res.data.question;
    state.openUpdateQuestions.unshift(question);
    if (question.card) {
        state.cardUpdateQuestions.push(question)
    }
};
export const storeUpdateStatusFailure = state => state.storeUpdateStatusSuccess = 'Failure'

export const storeStatusFailure = state => state.actionStoreStatus = 'Failure';

export const removeStatusRequest = state => state.actionRemoveStatus = 'Request';
export const removeStatusSuccess = (state, res) => {
    state.actionRemoveStatus = 'Success';

    const question = res.data.question;
    state.openQuestions = remove(state.openQuestions, question);
    state.userQuestions = remove(state.userQuestions, question);
    state.cardQuestions = remove(state.cardQuestions, question);
    state.answeredQuestions = remove(state.answeredQuestions, question)
};
export const removeStatusFailure = state => state.actionRemoveStatus = 'Failure';

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

export const loadCardQuestionsStatusRequest = state => {
    state.actionLoadCardQuestionsStatus = 'Request';
    state.cardQuestions = []
};
export const loadCardQuestionsStatusSuccess = (state, res) => {
    state.actionLoadCardQuestionsStatus = 'Success';
    state.cardQuestions = res.data.data
};
export const loadCardQuestionsStatusFailure = state => state.actionLoadCardQuestionsStatus = 'Failure';

export const loadAnsweredQuestionsStatusRequest = state => state.actionLoadAnsweredQuestionsStatus = 'Request';
export const loadAnsweredQuestionsStatusSuccess = (state, res) => {
    state.actionLoadAnsweredQuestionsStatus = 'Success';
    state.answeredQuestions.push(...res.data.data);
    state.answeredQuestionsPage += 1;
    state.answeredQuestionsLastPage = res.data.meta.last_page
};
export const loadAnsweredQuestionsStatusFailure = state => state.actionLoadAnsweredQuestionsStatus = 'Failure';
