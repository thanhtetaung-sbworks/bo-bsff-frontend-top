import Repository from './repository';
const resource = '/v1/users';
const resource_update = '/v1/users/member-info';
const contract_info = '/v1/users/contract-info';
// const user_session = '/v1/users/user-session';


export default {
  /**
   * ユーザー個人情報を取得する
   */
   postUser() {
    return Repository.post(`${resource}/my`);
  },
  /**
   * ユーザー情報更新
   */
  updateUser(params) {
    return Repository.put(`${resource_update}`, params);
  },

  contractInfo() {
    return Repository.post(`${contract_info}`);
  },
  // userSession() {
  //   return Repository.post(`${user_session}`);
  // },
}
