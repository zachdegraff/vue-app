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

export const getStatusRequest = state => state.actionGetStatus = 'Request';
export const getStatusSuccess = state => state.actionGetStatus = 'Success';
export const getStatusFailure = state => state.actionGetStatus = 'Failure';

export const allStatusRequest = state => state.actionAllStatus = 'Request';
export const allStatusSuccess = state => state.actionAllStatus = 'Success';
export const allStatusFailure = state => state.actionAllStatus = 'Failure';
export const storeStatusFailure = state => state.actionStoreStatus = 'Failure';
export const updateStatusRequest = state => state.actionUpdateStatus = 'Request';
export const updateStatusSuccess = (state, res) => {
    state.actionUpdateStatus = 'Success';
    state.editing = null
};
export const updateStatusFailure = state => state.actionUpdateStatus = 'Failure';

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

export const loadCPsStatusFailure = state => state.actionLoadCPsStatusFailure = 'Failure';

export const loadUserContentPacksStatusSuccess = (state, contentPacks) => {
    state.contentPackSubscriptions.push(...contentPacks);
};

export const loadContentPackItemsSuccess = (state, res) => {
    state.itemsPage += 1;
    state.actionLoadItemsStatus = 'Success';
    state.contentPackItems.push(...res.data.data);
    state.itemsPageLastPage = res.data.meta.last_page;
};

export const setActiveContentPack = (state, contentPack) => {
    state.activeContentPack = contentPack
};

export const subscribeToContentPackSuccess = (state, contentPack) => {
    state.contentPackSubscriptions.push(contentPack);
}

export const unsubscribeToContentPackSuccess = (state, id) => {
    state.contentPackSubscriptions = state.contentPackSubscriptions.filter(function(item) {
        return item.id !== id
    });
}

export const loadSubscribedCPsStatusRequest = state => state.actionLoadAnsweredQuestionsStatus = 'Request';
export const loadCPsStatusSuccess = (state, res) => {
    state.contentPacksPage += 1;
    state.contentPacksLastPage = res.data.meta.last_page;
    state.actionLoadAnsweredQuestionsStatus = 'Success';
    state.contentpacks.push(...res.data.data);
};
