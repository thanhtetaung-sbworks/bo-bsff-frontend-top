export default {
  /**
   * redisに保存（session更新処理）
   */
  postSession() {
    const data = {
      data: {
        sessionKey: "dummy"
      }
    };
    return new Promise((resolve) => {
      return resolve(data);
    });
  },
  /**
   * 初回ログイン完了
   */
  putComplete() {
    const data = {};
    return new Promise((resolve) => {
      return resolve(data);
    });
  }
};
