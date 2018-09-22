import api from "../../api";


export const getSiteDataByLink = ({dispatch, commit, rootGetters}, options = {}) => {
    const siteLink = rootGetters['publicSites/getSiteLink'];
    console.log(siteLink);

    return new Promise((resolve, reject) => {
        api.publicSites.getByLink(siteLink).then(res => {
            commit('setSiteData', res.data);
        }).catch(err => {
            reject(err)
        })
    })
};

