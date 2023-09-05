// モックデータ
import mockData from "./mockdata/orders.js";
// import Repository from "../repository";
// const resource_complete = "/v1/life/order/confirm/pay";

export default {
  /**
   * 着信認証番号を取得
   */
  postOstiariesNewTransaction() {
    return mockData.postOstiariesNewTransaction();
  },
  /**
   * 着信認証を開始
   */
  postOstiariesStartAuthentication(params) {
    return mockData.postOstiariesStartAuthentication(params);
  },
  /**
   * デジチケ・デジポンの申込確認
   */
  getOrderConfirm() {
    return mockData.getOrderConfirm2();
  },
  /**
   * モーダル補助クーポン申請
   */
  getSubsidy() {
    return mockData.getSubsidy();
  },
  /**
   * モーダル補助クーポン適用
   */
  putSubsidy(params) {
    return mockData.putSubsidy(params);
  },
  /**
   * 支払い処理
   */
  putComplete(queryParams, reqBody) {
    return mockData.putComplete(queryParams, reqBody).data;
    // return Repository.put(`${resource_complete}?p=${params}`);
  },
  /**
   * 申し込む（マイクーポン）。申込ボタン押下時に呼び出すAPI。申込情報取得（プラン詳細で選択したデータを送信）
   */
  postOrderMycoupon(params) {
    return mockData.postOrderMycoupon(params);
  },
  /**
   * 申し込む。申込ボタン押下時に呼び出すAPI。申込情報取得（プラン詳細で選択したデータを送信）
   */
  postOrder(params) {
    return mockData.postOrder(params);
  },
  /**
   * 申し込む。申込ボタン押下時に呼び出すAPI。申込情報取得（プラン詳細で選択したデータを送信）
   * ポイント交換の場合に使用する
   */
  postOrderPointExchange(params) {
    return mockData.postOrderPointExchange(params);
  },
  /**
   * 保有しているベネポの取得
   */
  getPoint() {
    return mockData.getPoint2();
  },
  /**
   * 支払い有で、支払方法選択処理
   */
  putPay(params) {
    return mockData.putPay(params);
  },
  /**
   * 支払い無しで、支払方法選択処理
   */
  putNoPay(params) {
    return mockData.putNoPay(params);
  },
  /*
   * 申込内容確認処理
   */
  putConfirm(usageDiv, srvicDiv, lotteryInfo, payFlg, params, gwParam) {
    if (payFlg) {
      return mockData.putPay(params);
    } else {
      return mockData.putNoPay(params);
    }
  },

  /**
   * 保有しているベネポの取得
   */
  getAddress() {
    return mockData.getAddress();
  },
  /**
   * 保有しているベネポの取得
   */
  getAddress2() {
    return mockData.getAddress2();
  },

  /**
   * 保有しているベネポの取得
   */
  putAddress(param) {
    return mockData.putAddress(param);
  },
  putSelectPay(param) {
    return new Promise((resolve) => {
      resolve("transactionId");
    });
  },
  postOrderAffiliate(param) {
    return new Promise((resolve) => {
      resolve({
        data: {
          trnstToUrl: "http://xxxx",
          httpMthdDiv: "10",
          affiliateParams: [
            {
              affiliateParamId: "parm01",
              affiliateSetting: "settings"
            }
          ],
          trackingKey: "key-xxxx"
        },
        status: 200
      });
    });
  }
};
