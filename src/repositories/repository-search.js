import Repository from "./repository";
const resource = "/v1/search";
const resourceEnum = "/v1/enum";

export default {
  getLargeCategories() {
    return Repository.get(`${resource}/largeCategories`);
    // return {data}
  },

  getCodesArea(params) {
    return Repository.get(`${resourceEnum}/codes/area`, { params });
  },

  async getLargeCodesArea() {
    let data = [];
    const rg1 = await this.getCodesArea({ areaLrgClassCd: "region-1" });
    const rg2 = await this.getCodesArea({ areaLrgClassCd: "region-2" });
    const rg3 = await this.getCodesArea({ areaLrgClassCd: "region-3" });
    const rg4 = await this.getCodesArea({ areaLrgClassCd: "region-4" });
    const rg6 = await this.getCodesArea({ areaLrgClassCd: "region-6" });
    const rg7 = await this.getCodesArea({ areaLrgClassCd: "region-7" });
    const rg8 = await this.getCodesArea({ areaLrgClassCd: "region-8" });
    const rg9 = await this.getCodesArea({ areaLrgClassCd: "region-9" });
    const rg10 = await this.getCodesArea({ areaLrgClassCd: "region-10" });
    const rg11 = await this.getCodesArea({ areaLrgClassCd: "region-11" });
    const rg12 = await this.getCodesArea({ areaLrgClassCd: "region-12" });
    const rg13 = await this.getCodesArea({ areaLrgClassCd: "region-13" });
    data = [
      ...(rg1?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg1?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || []),
      ...(rg2?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg2?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || []),
      ...(rg3?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg3?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || []),
      ...(rg4?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg4?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || []),
      ...(rg6?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg6?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || []),
      ...(rg7?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg7?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || []),
      ...(rg8?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg8?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || []),
      ...(rg9?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg9?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || []),
      ...(rg10?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg10?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || []),
      ...(rg11?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg11?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || []),
      ...(rg12?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg12?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || []),
      ...(rg13?.data?.areaLrgClasses?.[0]?.areaMidClasses?.map((item) => {
        return {
          ...item,
          areaLrgClassCd: rg13?.data?.areaLrgClasses?.[0]?.areaLrgClassCd
        };
      }) || [])
    ];

    return { data };
  },

  /**
   * 初期表示に必要な情報を取得する
   */
  getSearchInit() {
    return Repository.get(`${resource}`);
  }
};
