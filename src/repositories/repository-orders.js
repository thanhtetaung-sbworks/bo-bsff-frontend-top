import Repository from "./repository";
const resource_point = "/v1/life/member/point";

export default {
  /**
   * 保有しているベネポの取得
   */
  getPoint() {
    return Repository.get(`${resource_point}`);
  }
};
