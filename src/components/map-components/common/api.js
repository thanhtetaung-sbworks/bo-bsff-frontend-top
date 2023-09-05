import Const from "./const.js";
import Store from "./store.js";
const createHash = require("sha256-uint8array").createHash;

/**
 * メニュー番号の取得(メニュー出し分け)
 * @param catLrgClassCd 大カテゴリ
 * @param lat 緯度
 * @param lng 経度
 * @param radius 半径
 * @param option FetchAPIの追加設定
 */
export async function getMenuNoList(catLrgClassCd, lat, lng, radius, option = {}) {
  let url = `${getMnCacheEndpoint()}/facilities/${getSsoSubscriptionId()}/${Const.BO_CODE}/${lat}/${lng}/${radius}`;
  let param = {
    count: Const.GET_MENU_COUNT_MAX,
  };
  const timerLabel = `CURS-facilities`;
  if (catLrgClassCd) {
    param.catLrgClassCd = catLrgClassCd;
  }

  url = getQueryStringUrl(url, param);

  const controller = new AbortController();
  setTimeout(() => {
    controller.abort();
    console.timeEnd(timerLabel);
  }, option.timeout || Const.REQUEST_DEFAULT_TIMEOUT_MILLISECOND);

  console.time(timerLabel);
  return new Promise((resolve, reject) => {
    fetch(encodeURI(url), {
      method: "GET",
      signal: controller.signal,
      headers: {
         ...getDefaultHeaders(),
      },
      ...option,
    }).then((response) => {
      console.timeEnd(timerLabel);
      if (!response.ok || (response.status >= 500 && response.status < 600)) {
        reject(response);
        return;
      }
      response.json().then(data => {
        resolve(data);
      });

    }).catch((reason) => {
      console.timeEnd(timerLabel);
      reject(reason);
    });
  });
}

/**
 * メニューリストの取得(テスト用)
 */
export async function getMenuList(param) {
  return new Promise((resolve) => {
    setTimeout(() => {
      //TOOD: ジオコーディングして取得
      const menuListJson = require("@/sample/menu-list.json");
      console.log(menuListJson)
      resolve(menuListJson);
    }, 10);
  });
}

/**
 * カテゴリ情報の取得（CURS）
 * @param option FetchAPIの追加設定
 */
export async function getCategory(option = {}) {
  const timerLabel = `CURS-codes/category`;
  const url = `${getMnCacheEndpoint()}/categories/${getSsoSubscriptionId()}/${Const.BO_CODE}`;

  const controller = new AbortController();
  setTimeout(() => {
    controller.abort();
    console.timeEnd(timerLabel);
  }, option.timeout || Const.REQUEST_DEFAULT_TIMEOUT_MILLISECOND);

  const requestId = await getRequestId(Store.USER.ssoCustomerNo);
  console.time(timerLabel);
  return new Promise((resolve, reject) => {
    fetch(encodeURI(url), {
      method: "GET",
      //credentials: 'include',
      signal: controller.signal,
      headers: {
        ...getDefaultHeaders(),
        "x-bene-user": Store.AUTH.xBeneUser,
        "request-id": requestId,
      },
      ...option,
    }).then((response) => {
      console.timeEnd(timerLabel);
      if (!response.ok) {
        reject(response);
        return;
      }
      resolve(response.json());
    }).catch((reason) => {
      console.timeEnd(timerLabel);
      reject(reason);
    });
  });
}

/**
 * メニュー基本情報リスト取得（MN）
 * @param menuNoList メニュー番号配列
 * @param option FetchAPIの追加設定
 */
export async function getMenuBasicList(menuNoList, option = {}) {
  const timerLabel = `MN-menus/menu-list`;
  let url = getMnCacheEndpoint() + "/menus/menu-list";
  url = getQueryStringUrl(url, {
    menuNos: menuNoList.join("-"),
  });

  const controller = new AbortController();
  setTimeout(() => {
    console.timeEnd(timerLabel);
    controller.abort();
  }, option.timeout || Const.REQUEST_DEFAULT_TIMEOUT_MILLISECOND);

  const requestId = await getRequestId(Store.USER.ssoCustomerNo);
  console.time(timerLabel);
  return new Promise((resolve, reject) => {
    fetch(encodeURI(url), {
      method: "GET",
      signal: controller.signal,
      headers: {
        ...getDefaultHeaders(),
        "x-bene-user": Store.AUTH.xBeneUser,
        "request-id": requestId,
      },
      ...option,
    }).then((response) => {
      console.timeEnd(timerLabel);
      if (!response.ok) {
        reject(response);
        return;
      }
      resolve(response.json());
    }).catch((reason) => {
      console.timeEnd(timerLabel);
      reject(reason);
    });
  });
}

/**
 * 店舗一覧取得（MN）
 * @param menuNo メニュー番号
 * @param option FetchAPIの追加設定
 */
export async function getMenuStoreList(menuNo, facilityNoList, option = {}) {
  const timerLabel = `MN-menus/${menuNo}/store-detail`;
  let url = getMnCacheEndpoint() + `/menus/${menuNo}/store-detail`;
  url = getQueryStringUrl(url, {
    facilityNos: facilityNoList.join("-"),
  });

  const controller = new AbortController();
  setTimeout(() => {
    console.timeEnd(timerLabel);
    controller.abort();
  }, option.timeout || Const.REQUEST_DEFAULT_TIMEOUT_MILLISECOND);

  const requestId = await getRequestId(Store.USER.ssoCustomerNo);
  console.time(timerLabel);
  return new Promise((resolve, reject) => {
    fetch(encodeURI(url), {
      method: "GET",
      signal: controller.signal,
      headers: {
        ...getDefaultHeaders(),
        "x-bene-user": Store.AUTH.xBeneUser,
        "request-id": requestId,
      },
      ...option,
    }).then((response) => {
      console.timeEnd(timerLabel);
      if (!response.ok) {
        resolve();
        //reject(response);
        return;
      }
      resolve(response.json());
    }).catch((reason) => {
      console.timeEnd(timerLabel);
      reject(reason);
    });
  });
}

/**
 * プラン一覧取得（MN）
 * @param menuNo メニュー番号
 * @param option FetchAPIの追加設定
 */
export async function getMenuPlanList(menuNo, option = {}) {
  const timerLabel = `MN-menus/${menuNo}/plan-list`;
  let url = getMnCacheEndpoint() + `/menus/${getSsoSubscriptionId()}/${Const.BO_CODE}/${menuNo}/plan-list`;
  let param = {
    loginFlag: Store.USER.loginFlag ? "1" : "0",
  }
  const priceDiv = getPriceDiv();
  if (priceDiv) {
    param.priceDiv = priceDiv;
  }
  url = getQueryStringUrl(url, param);

  const controller = new AbortController();
  setTimeout(() => {
    console.timeEnd(timerLabel);
    controller.abort();
  }, option.timeout || Const.REQUEST_DEFAULT_TIMEOUT_MILLISECOND);

  const requestId = await getRequestId(Store.USER.ssoCustomerNo);
  console.time(timerLabel);
  return new Promise((resolve, reject) => {
    fetch(encodeURI(url), {
      method: "GET",
      signal: controller.signal,
      headers: {
        ...getDefaultHeaders(),
        "x-bene-user": Store.AUTH.xBeneUser,
        "request-id": requestId,
      },
      ...option,
    }).then((response) => {
      console.timeEnd(timerLabel);
      if (!response.ok) {
        reject(response);
        return;
      }
      resolve(response.json());
    }).catch((reason) => {
      console.timeEnd(timerLabel);
      reject(reason);
    });
  });
}

/**
 * メニュー単位アイコン取得（MN）
 * @param menuNo メニュー番号
 * @param option FetchAPIの追加設定
 */
export async function getMenuIconList(menuNo, option = {}) {
  const timerLabel = `MN-menus/${menuNo}/icons`;
  const url = getMnCacheEndpoint() + `/menus/${menuNo}/icons`;

  const controller = new AbortController();
  setTimeout(() => {
    console.timeEnd(timerLabel);
    controller.abort();
  }, option.timeout || Const.REQUEST_DEFAULT_TIMEOUT_MILLISECOND);

  const requestId = await getRequestId(Store.USER.ssoCustomerNo);
  console.time(timerLabel);
  return new Promise((resolve, reject) => {
    fetch(encodeURI(url), {
      method: "GET",
      signal: controller.signal,
      headers: {
        ...getDefaultHeaders(),
        "x-bene-user": Store.AUTH.xBeneUser,
        "request-id": requestId,
      },
      ...option,
    }).then((response) => {
      if (!response.ok) {
        console.timeEnd(timerLabel);
        //reject(response);
        resolve();
        return;
      }
      resolve(response.json());
    }).catch((reason) => {
      console.timeEnd(timerLabel);
      reject(reason);
    });
  });
}

/**
 * プラン単位アイコン取得（MN）
 * @param menuNo メニュー番号
 * @param planId プランID
 * @param option FetchAPIの追加設定
 */
export async function getPlanIconList(menuNo, planId, option = {}) {
  const timerLabel = `MN-menus/${menuNo}/plans/${planId}/icons`;
  const url = getMnCacheEndpoint() + `/menus/${menuNo}/plans/${planId}/icons`;

  const controller = new AbortController();
  setTimeout(() => {
    console.timeEnd(timerLabel);
    controller.abort();
  }, option.timeout || Const.REQUEST_DEFAULT_TIMEOUT_MILLISECOND);

  const requestId = await getRequestId(Store.USER.ssoCustomerNo);
  console.time(timerLabel);
  return new Promise((resolve, reject) => {
    fetch(encodeURI(url), {
      method: "GET",
      signal: controller.signal,
      headers: {
        ...getDefaultHeaders(),
        "x-bene-user": Store.AUTH.xBeneUser,
        "request-id": requestId,
      },
      ...option,
    }).then((response) => {
      console.timeEnd(timerLabel);
      if (!response.ok) {
        //reject(response);
        resolve();
        return;
      }
      resolve(response.json());
    }).catch((reason) => {
      console.timeEnd(timerLabel);
      reject(reason);
    });
  });
}


/**
 * メニュー詳細取得(MN)
 * @param menuNo メニュー番号
 * @param option FetchAPIの追加設定
 */
export async function getMenuDetail(menuNo, option = {}) {
  const timerLabel = `MN-menus/${menuNo}/life`;
  let url = getMnCacheEndpoint() + `/menus/${menuNo}/life`;
  let param = {
    loginFlag: Store.USER.loginFlag ? "1" : "0",
  };
  const priceDiv = getPriceDiv();
  if (priceDiv) {
    param.priceDiv = priceDiv;
  }
  const crmFlag = getCrmFlag();
  if (crmFlag) {
    param.crmFlag = crmFlag;
  }

  url = getQueryStringUrl(url, param);

  const controller = new AbortController();
  setTimeout(() => {
    console.timeEnd(timerLabel);
    controller.abort();
  }, option.timeout || Const.REQUEST_DEFAULT_TIMEOUT_MILLISECOND);

  const requestId = await getRequestId(Store.USER.ssoCustomerNo);
  console.time(timerLabel);
  return new Promise((resolve, reject) => {
    fetch(encodeURI(url), {
      method: "GET",
      signal: controller.signal,
      headers: {
        ...getDefaultHeaders(),
        "x-bene-user": Store.AUTH.xBeneUser,
        "request-id": requestId,
      },
      ...option,
    }).then((response) => {
      console.timeEnd(timerLabel);
      if (!response.ok) {
        reject(response);
        return;
      }
      resolve(response.json());
    }).catch((reason) => {
      console.timeEnd(timerLabel);
      reject(reason);
    });
  });
}



/**
 * カテゴリー別アイコンリストの取得
 * @param option FetchAPIの追加設定
 */
export async function getCategoryIcon(option = {}) {
  const url = getMnCacheEndpoint() + "/files/category";

  const controller = new AbortController();
  setTimeout(() => {
    controller.abort();
  }, option.timeout || Const.REQUEST_DEFAULT_TIMEOUT_MILLISECOND);

  return new Promise((resolve, reject) => {
    fetch(encodeURI(url), {
      method: "GET",
      signal: controller.signal,
      headers: {
        ...getDefaultHeaders(),
      },
      ...option,
    }).then((response) => {
      if (!response.ok) {
        reject(response);
        return;
      }
      resolve(response.json());
    }).catch((reason) => {
      reject(reason);
    });
  });
}


/**
 * アイコン定義リストの取得
 * @param option FetchAPIの追加設定
 */
export async function getIconDefinition(option = {}) {
  const url = getMnCacheEndpoint() + "/files/icon";

  const controller = new AbortController();
  setTimeout(() => {
    controller.abort();
  }, option.timeout || Const.REQUEST_DEFAULT_TIMEOUT_MILLISECOND);

  return new Promise((resolve, reject) => {
    fetch(encodeURI(url), {
      method: "GET",
      signal: controller.signal,
      headers: {
        ...getDefaultHeaders(),
      },
      ...option,
    }).then((response) => {
      if (!response.ok) {
        reject(response);
        return;
      }
      resolve(response.json());
    }).catch((reason) => {
      reject(reason);
    });
  });
}

function getDefaultHeaders() {
  return {
    "accept": "application/json",
    "content-type": "application/json",
  };
}

/** 地図基盤BFFのエンドポイント取得 */
function getMnCacheEndpoint() {
  return process.env.VUE_APP_MAP_MN_CACHE_API_ENDPOINT ? process.env.VUE_APP_MAP_MN_CACHE_API_ENDPOINT : "";
}

/** ユーザー認証情報のエンドポイント取得 */
function getUserInfoEndpoint() {
  return process.env.VUE_APP_MAP_USER_INFO_API_ENDPOINT ? process.env.VUE_APP_MAP_USER_INFO_API_ENDPOINT : "";
}

/** 契約ID取得 */
function getSsoSubscriptionId() {
  return Store.USER.loginFlag ? Store.USER.ssoSubscriptionId : Const.SSO_SUBSCRIPTION_ID_DEFAULT;
}

/** priceDiv取得 */
function getPriceDiv() {
  return Store.USER.loginFlag ? Store.USER.priceDiv : null;
}

/** crmFlag取得 */
function getCrmFlag() {
  return Store.USER.loginFlag ? Store.USER.crmFlag : null;
}


function getQueryStringUrl(url, params) {
  let count = 0;
  for (const [key, value] of Object.entries(params)) {
    const separater = count === 0 ? "?" : "&";
    url += `${separater}${key}=${value}`;
    count++;
  }
  return url;
}

async function getRequestId(ssoCustomerNo) {
  if (!ssoCustomerNo) {
    ssoCustomerNo = "guest";
  }
  ssoCustomerNo = await sha256(ssoCustomerNo);
  const time = new Date().getTime();
  return `bo-map-${ssoCustomerNo}-${time}`;
}


async function sha256(text) {
  text = text + "bo-map";
  return createHash().update(text).digest("hex");
}
