import Repository from "./repository";
const resource = "/v1/cms";

/**
 * CMS取得コントローラ
 */
export default {
  /**
   * News一覧 CMSを取得する
   */
  getNews(params) {
    return Repository.get(`${resource}/news`, params);
  },
  /**
   * TopPage CMSを取得する
   * 現在未使用
  postTopPage(params) {
    return Repository.post(`${resource}/top_page`+ (params.subscriptionId ? `&subscriptionId=${params.subscriptionId}` : ``)  + (params.courseParentId ? `&courseParentId=${params.courseParentId}` : ``)+ (params.courseId ? `&courseId=${params.courseId}` : ``)(params.previewDate ? `?previewDate=${params.previewDate}` : ``), params);
  },
  */
  /**
   * ブロックコンテンツを取得する
   */
  getBlockContents(params) {
    if (params.previewMode) {
      return Repository.get(
        `${resource}/block_contents?locationCode=${params.locationCode}` +
          `&subscriptionId=${params.subscriptionId}` +
          `&courseParentId=${params.courseParentId}` +
          `&courseId=${params.courseId}` +
          `&previewDate=${params.previewDate}`
      );
    } else {
      return Repository.get(
        `${resource}/block_contents?locationCode=${params.locationCode}`
      );
    }
  },
  /**
   * 特集ページを取得する
   */
  getSpecialPage(params) {
    if (params.previewMode) {
      return Repository.get(
        `${resource}/special_page?page_limit=${params.pageLimit}` +
          `&view_area=${params.viewArea}` +
          `&subscriptionId=${params.subscriptionId}` +
          `&courseParentId=${params.courseParentId}` +
          `&courseId=${params.courseId}` +
          `&previewDate=${params.previewDate}`
      );
    } else {
      return Repository.get(
        `${resource}/special_page?page_limit=${params.pageLimit}` +
          `&view_area=${params.viewArea}`
      );
    }
  },
  /**
   * 特集ページ詳細を取得する
   */
  getSpecialPageDetail(params) {
    if (params.previewMode) {
      return Repository.get(
        `${resource}/special_page?sp_id=${params.sp_id}` +
          `&subscriptionId=${params.subscriptionId}` +
          `&courseParentId=${params.courseParentId}` +
          `&courseId=${params.courseId}` +
          `&previewDate=${params.previewDate}`
      );
    } else {
      return Repository.get(`${resource}/special_page?sp_id=${params.sp_id}`);
    }
  },
  /**
   * その他ページを取得する
   */
  getOtherPage(params) {
    if (params.previewMode) {
      return Repository.get(
        `${resource}/other_content?other_id=${params.other_id}` +
          `&subscriptionId=${params.subscriptionId}` +
          `&courseParentId=${params.courseParentId}` +
          `&courseId=${params.courseId}` +
          `&previewDate=${params.previewDate}`
      );
    } else {
      return Repository.get(
        `${resource}/other_content?other_id=${params.other_id}`
      );
    }
  },
  /**
   * News詳細 CMSを取得する
   */
  getNewsId(params) {
    if (params.previewMode) {
      return Repository.get(
        `${resource}/news/${params.id}` +
          `?subscriptionId=${params.subscriptionId}` +
          `&courseParentId=${params.courseParentId}` +
          `&courseId=${params.courseId}` +
          `&previewDate=${params.previewDate}`
      );
    } else {
      return Repository.get(`${resource}/news/${params.id}`);
    }
  },
  /**
   * お知らせ左メニュー情報（CMS）を取得する
   */
  getNewsMenu() {
      return Repository.get(`${resource}/news/menu`);
  },
  /**
   * HeaderFooter CMSを取得する
   */
  getHeaderFooter(params) {
    if (params.previewMode) {
      return Repository.get(
        `${resource}/header_footer?bsCode=${params.bsCode}` +
          `&subscriptionId=${params.subscriptionId}` +
          `&courseParentId=${params.courseParentId}` +
          `&courseId=${params.courseId}` +
          `&previewDate=${params.previewDate}`
      );
    } else {
      return Repository.get(
        `${resource}/header_footer?bsCode=${params.bsCode}`
      );
    }
  },
};
