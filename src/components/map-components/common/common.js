/**
 * 共通関数に関する機能を提供する
 */

import { Loader } from "google-maps";
import Facility from "../model/facility";
import Menu from "../model/menu";
import FacilityMenu from "../model/facilityMenu";

/**
 * GoogleMaps JavaScript APIのgoogleオブジェクト
 */
let google;

initGoogle();

export async function initGoogle(mapOption = {}) {
  const language = process.env.VUE_APP_MAP_BASEGOOGLE_LANGUAGE ? process.env.VUE_APP_MAP_BASEGOOGLE_LANGUAGE : "ja";
  const region = process.env.VUE_APP_MAP_BASEGOOGLE_REGION ? process.env.VUE_APP_MAP_BASEGOOGLE_REGION : "JP";
  const version = process.env.VUE_APP_MAP_BASEGOOGLE_VERSION ? process.env.VUE_APP_MAP_BASEGOOGLE_VERSION : 3;
  const googleMapsLoaderOptions = Object.assign({
      language,
      region,
      version,
      libraries: ["geometry"],
    }, mapOption);
  const googleMapsLoader = new Loader(
    process.env.VUE_APP_MAP_GOOGLE_API_KEY,
    googleMapsLoaderOptions
  );

  return new Promise(function (resolve, reject) {
    googleMapsLoader.load().then(function (g) {
      google = g;
      resolve(g);
    });
  });
}

function hasGoogle() {
  if (google && google.maps) {
    return true;
  }
  return false;
}

/**
 * GoogleMaps JavaScript APIのgoogleオブジェクトを解決するPromiseを返す
 */
export async function getGoogle() {
  return new Promise(function (resolve) {
    if (hasGoogle()) {
      resolve(google);
      return;
    }
    const timer = setInterval(function () {
      if (google && google.maps) {
        clearInterval(timer);
        resolve(google);
      }
    }, 100);
  });
}

/**
 * ジオコーディングを実行する
 * @param google googleオブジェクト
 * @param address 住所
 */
export async function geocode(google, address) {
  const geocoder = new google.maps.Geocoder();
  const region = process.env.VUE_APP_BASEGOOGLE_REGION;

  return new Promise(function (resolve, reject) {
    geocoder.geocode(
      {
        address,
        region
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          const latLng = results[0].geometry.location;
          resolve({
            success: true,
            lat: latLng.lat(),
            lng: latLng.lng()
          });
        } else {
          resolve({
            success: false,
            error: getGeocodeErrorMsgFail(status)
          });
        }
      })
  });
}

function getGeocodeErrorMsgFail(status) {
  var errMsg = "";
  switch (status) {
    case "ZERO_RESULTS":
      errMsg = "正しい住所や施設名を入力してください。";
      break;
    case "OVER_QUERY_LIMIT":
      errMsg = "ジオコーディングの利用上限を超えています。";
      break;
    case "REQUEST_DENIED":
      errMsg = "ジオコーディングの利用が許可されていません。";
      break;
    case "INVALID_REQUEST":
      errMsg = "パラメータが不正です。";
      break;
    case "UNKNOWN_ERROR":
      errMsg = "不明なエラーが発生しました。";
      break;
    case "ERROR":
      errMsg = "タイムアウトもしくはGoogleサーバーのエラーです。";
      break;
  }
  return errMsg;
}

/**
 * Navigation APIで現在地を取得する
 */
export async function getCurrentDevicePosition() {
  const option = {
    // 高精度の位置情報を取得する
    enableHighAccuracy: true,
    // タイムアウト（ミリ秒）
    timeout: 10000,
    // 有効期限（ミリ秒）
    maximumAge: 60000,
  };
  return new Promise(function (resolve, reject) {
    if (!navigator.geolocation) {
      resolve({
        success: false,
        error: "このデバイスでは位置情報の取得が行えません。",
      })
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("位置情報の取得成功", position)
      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        success: true,
      })
    }, (error) => {
      console.log("位置情報の取得失敗", error);
      var errMsg = "";
      switch (error.code) {
        case 1:
          errMsg = "位置情報の利用が許可されていません。";
          break;
        case 2:
          errMsg = "デバイスの位置が判定できません。";
          break;
        case 3:
          errMsg = "位置情報の取得時にタイムアウトが発生しました。";
          break;
      }
      console.warn("位置情報の取得失敗", errMsg);
      resolve({
        success: false,
        error: errMsg
      })
    }, option);
  });
}

/**
 * MenuのリストからFacilityMenuのリストを生成して返す
 */
export function menuList2FacilityMenuList(menuList) {
  return menuList.map((menu) => {
    return FacilityMenu.createListFromMenu(menu);
  }).flat();
}

/**
 * 中間データからメニューリストを作成する
 */
export function createMenuListFromIntermediate(menuBasicList, storeList, planList, iconList) {
  let menuList = [];
  menuBasicList.forEach((menuBasic) => {
    let menu = Menu.createFromResponse(menuBasic);
    //店舗一覧あてこみ
    storeList.forEach((store) => {
      let menuNo = store.menuNo;
      if (Menu.isEquals({ menuNo: menuNo }, menu)) {
        menu.setFacilityList(store.data);
      }
    });

    //プラン一覧あてこみ
    planList.forEach((plan) => {
      let menuNo = plan.menuNo;
      if (Menu.isEquals({ menuNo: menuNo }, menu)) {
        menu.setPlanList(plan.data);
      }
    });

    //アイコン一覧あてこみ
    iconList.forEach((icon) => {
      let menuNo = icon.menuNo;
      if (Menu.isEquals({ menuNo: menuNo }, menu)) {
        menu.setIconList(icon.data);
      }
    });

    menuList.push(menu);
  });
  return menuList;
}

/**
 * 指定の緯度経度から指定の角度と距離で移動した後の緯度経度を返却する
 * @param {*} lat 
 * @param {*} lon 
 * @param {*} heading 
 * @param {*} dist 
 */
export function moveByHeadingAndDist(lat, lon, heading, dist) {
  const EARTH_RADIUS = 6378150;
  // 緯線上の移動距離
  let latitudeDistance = dist * Math.cos(heading * Math.PI / 180);

  // 1mあたりの緯度
  let earthCircle = 2 * Math.PI * EARTH_RADIUS;
  let latitudePerMeter = 360 / earthCircle;

  // 緯度の変化量
  let latitudeDelta = latitudeDistance * latitudePerMeter;
  let newLatitude = lat + latitudeDelta;

  // 経線上の移動距離
  let longitudeDistance = dist * Math.sin(heading * Math.PI / 180);

  // 1mあたりの経度
  let earthRadiusAtLongitude = EARTH_RADIUS * Math.cos(newLatitude * Math.PI / 180);
  let earthCircleAtLongitude = 2 * Math.PI * earthRadiusAtLongitude;
  let longitudePerMeter = 360 / earthCircleAtLongitude

  // 経度の変化量
  let longitudeDelta = longitudeDistance * longitudePerMeter

  return {
    lat: newLatitude, 
    lon: lon + longitudeDelta,
  };
}