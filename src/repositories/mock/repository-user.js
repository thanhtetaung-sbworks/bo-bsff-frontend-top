export default {
  /**
   * ユーザー個人情報を取得する
   */
  postUser() {
    const data = {

    };
    return new Promise((resolve) => {
      return resolve(data);
    });
  },
  /**
   * ユーザー情報更新
   */
  updateUser() {
    const data = {
      data: {
        userInfo: "dummy",
        isCompleteFirstLogin: false
      }
    };
    return new Promise((resolve) => {
      return resolve(data);
    });
  },

  contractInfo() {
    const data = {
      data: {
        contractInfo: [
          {
            companyCd: "",
            customerNo: "",
            companyName: "",
            subscriptions: [
              {
                boServiceCode: "BS",
                torinoMembrNo: "xxxx"
              },
              {
                boServiceCode: "SD",
                torinoMembrNo: "xxxx"
              }
            ]
          }
        ]
      }
    };
    return new Promise((resolve) => {
      return resolve(data);
    });
  },
  userSession() {
  },
};
