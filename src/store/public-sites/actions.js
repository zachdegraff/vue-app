import api from "../../api";


export const getSiteDataByLink = ({dispatch, commit, rootGetters}, options = {}) => {
    const siteLink = rootGetters['publicSites/getSiteLink'];

    return new Promise((resolve, reject) => {
        api.publicSites.getByLink(siteLink).then(res => {
            commit('setSiteData', res.data);
        }).catch(err => {
            reject(err)
        })
    })
};
export const getCardByCardId = ({dispatch, commit, rootGetters}, options = {}) => {
    const cardId = rootGetters['publicSites/getCardId'];

    return new Promise((resolve, reject) => {
        api.publicSites.getByCard(cardId).then(res => {
            commit('setCardData', res.data);
        }).catch(err => {
            reject(err)
        })
    })
};

