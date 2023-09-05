import Repository from "../repository";
import mockDataCategories from "./mockdata/shopCategories.json";

export default {
  /**
   * カテゴリ一覧を取得する
   * @param {*} params 
   * @returns 
   */
  getLargeCategories(params) {
    return new Promise(resolve => {
      resolve({
        status: 200,
        data: mockDataCategories
      })
    })
  },

};
