/**
 * ファイルアップロードAPI
 */
import Repository from "./repository";
const resource = "/v1/life/file/upload";
const resourceDelete = "/v1/life/file/delete";

export default {
  /**
   * ファイルアップロードAPI
   */
  upload(params) {
    return Repository.post(`${resource}`, params);
  },
  /**
   * アップロードしたファイルのデリーと
   * @param {object} params リクエストパラメータ
   * @returns {Promise}
   */
  delete(params) {
    // return Repository.delete(`${resourceDelete}`, params);
    return Repository.request({
      method: 'delete',
      url: `${resourceDelete}`,
      data: params,
    });
  }
};
