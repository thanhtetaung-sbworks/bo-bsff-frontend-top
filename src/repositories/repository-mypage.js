import Repository from "./repository";
const resource = "/v1/top";

export default {
  async getPointHistory(params) {
    return Repository.get(
      `${resource}/member/point/history`,
      { params }
    );
  }
};
