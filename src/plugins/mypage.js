export default async (context, inject) => {
  inject("mypage", {
    /**
     * マイクーポン
     */
    get couponDetail() {
      return context.store.state.mypage.couponDetail;
    },
    set couponDetail(value) {
      context.store.commit("mypage/couponDetail", value);
    },
    /**
     * マイクーポン：注意事項
     */
    get importantPoints() {
      return context.store.state.mypage.importantPoints;
    },
    set importantPoints(value) {
      context.store.commit("mypage/importantPoints", value);
    },
    CouponDetailExists() {
      return this.couponDetail != null;
    },
    removeCouponDetail() {
      context.store.commit("mypage/couponDetail", null);
    },
    passwordAuthenticated() {
      this.couponDetail["isPasswordAuthenticated"] = true;
    },
  });
};
