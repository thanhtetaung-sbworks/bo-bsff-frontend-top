// モックデータ
import Repository from "./../repository";
import pointHistory from "./mockdata/point-history.json";
const resource = "/v1/top";

export default {
  async getPointHistory(params) {
    return new Promise((resolve, reject) => {
      Repository.get(
        `${resource}/member/point/history`,
        { params }
      ).then(
        (response) => {
          resolve({ data: pointHistory });
        },
        (error) => {
          resolve({ data: pointHistory });
        }
      );
    });
  }
};
