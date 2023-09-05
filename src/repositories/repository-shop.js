import Repository from "./repository";

const resourceSearchCategory = "/v1/search/largeCategories";

export default {
  /**
   * カテゴリ一覧を取得する
   * @param {*} params
   * @returns
   */
  getLargeCategories(params) {
    return Repository.get(`${resourceSearchCategory}`, { params: params });
  },

};
