import Repository from './repository';
const resource_session = '/v1/top/session';
const resource_complete = '/v1/top/complete_first_login';
const resource_logout = '/v1/top/logout';

export default {
  /**
   * redisに保存（session更新処理）
   */
  postSession(params) {
    return Repository.post(`${resource_session}`, params);
  },
  /**
   * 初回ログイン完了
   */
  putComplete(params) {
    return Repository.put(`${resource_complete}`, params);
  },
  /**
   * ログアウト
   */
   getLogout() {
    return Repository.get(`${resource_logout}`);
  }
};
