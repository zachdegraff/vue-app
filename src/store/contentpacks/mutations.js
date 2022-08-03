import {remove, replace} from "../../helpers";

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

export const removeQuestionComment = (state, comment) => {
    ['openQuestions', 'userQuestions', 'answeredQuestions'].forEach(stack => {
        state[stack].forEach(q => q.comments = remove(q.comments, comment))
    })
};

export const getStatusRequest = state => state.actionGetStatus = 'Request';
export const getStatusSuccess = state => state.actionGetStatus = 'Success';
export const getStatusFailure = state => state.actionGetStatus = 'Failure';

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
export const storeStatusFailure = state => state.actionStoreStatus = 'Failure';


export const updateStatusRequest = state => state.actionUpdateStatus = 'Request';
export const updateStatusSuccess = (state, res) => {
    state.actionUpdateStatus = 'Success';
    state.editing = null
};
export const updateStatusFailure = state => state.actionUpdateStatus = 'Failure';

export const changeEditingQuestion = (state, question) => state.editing = question;

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
export const loadCPsStatusFailure = state => state.actionLoadCPsStatusFailure = 'Failure';

export const loadCardQuestionsStatusRequest = state => {
    state.actionLoadCardQuestionsStatus = 'Request';
    state.cardQuestions = []
};
export const loadUsercontentpacksStatusSuccess = (state, res) => {
    state.contentPackSubscriptions = res;
};

export const subscribe = (state, res) => {}
export const subscribefailure = (state, res) => {}

export const unsubscribe = (state, res) => {}
export const unsubscribefailure = (state, res) => {}

export const loadCardQuestionsStatusFailure = state => state.actionLoadCardQuestionsStatus = 'Failure';

export const loadSubscribedCPsStatusRequest = state => state.actionLoadAnsweredQuestionsStatus = 'Request';
export const loadCPsStatusSuccess = (state, res) => {
    state.actionLoadAnsweredQuestionsStatus = 'Success';
    state.contentpacks = res;
};
export const loadAnsweredQuestionsStatusFailure = state => state.actionLoadAnsweredQuestionsStatus = 'Failure';
