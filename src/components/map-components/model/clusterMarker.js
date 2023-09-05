import FacilityMenu from "./facilityMenu";
import * as common from "../common/common";


export default class ClusterMarker {

  delegate = null;

  /** クラスター対象のマーカー */
  containedMarkerList = [];

  /** クラスター対象のマーカーからクラスターへのPolyline配列 */
  achorPolylineList = [];

  /**
   * クラスターマーカー(Google.maps.Marker)
   */
  marker = null;

  icon = null;

  /**
   * クラスター状態の場合の緯度経度
   */
  clusteredLatLon = {
    lat: null,
    lon: null,
  };

  /**
   * クラスター状態か
   * TRUEの場合はクラスターマーカーが表示、元のマーカーが非表示
   * */
  isClustered = true;

  google = null;

  constructor(param) {
    this.google = param.google;
    this.map = param.map;
    this.icon = param.icon;
    this.delegate = param.delegate;

    this.createMarker();
  }


  removeAssociated() {
    this.marker.setMap(null);
    this.achorPolylineList.forEach((achorPolyline) => {
      achorPolyline.setMap(null);
    });
    this.map = null;
    this.google = null;
  }

  createMarker() {
    //マーカーを生成
    this.marker = new this.google.maps.Marker({
      map: this.map,
      icon: this.icon,
      position: null,
      visible: false,
    });

    this.marker.addListener("click", () => {
      //クリック時のイベント
      this.clickHandler();
    });
  }

  /**
   * クラスター対象のマーカーに追加する
   * @param {*} marker
   * @returns 追加した場合はTRUE、既に追加済みのmarkerだった場合はFALSE
   */
  addContainedMarker(marker) {
    if(this.hasMarker(marker)) {
      return false;
    }
    this.containedMarkerList.push(marker);
    this.setClusteredLatLon();
    this.marker.setLabel(this.getClusterLabelOption());
    return true;
  }

  /**
   * 対象のマーカーを既に保持しているか
   * @param {*} marker
   * @returns
   */
  hasMarker(marker) {
    if(marker == null || this.containedMarkerList == null || this.containedMarkerList.length === 0) {
      return false;
    }
    for(let containedMarker of this.containedMarkerList) {
      if(FacilityMenu.isEquals(marker.facilityMenu, containedMarker.facilityMenu)) {
        return true;
      }
    }
    return false;
  }

  /**
   * クラスターマーカーの緯度経度を設定する
   * @returns
   */
  setClusteredLatLon() {
    if(this.containedMarkerList == null || this.containedMarkerList.length === 0) {
      return;
    }
    let latSum = 0;
    let lonSum = 0;
    this.containedMarkerList.forEach((containedMarker) => {
      latSum += containedMarker.position.lat();
      lonSum += containedMarker.position.lng();
    });
    this.clusteredLatLon.lat = latSum / this.containedMarkerList.length;
    this.clusteredLatLon.lon = lonSum / this.containedMarkerList.length;

    this.marker.setPosition({
      lat: this.clusteredLatLon.lat,
      lng: this.clusteredLatLon.lon,
    });
  }

  /**
   * 引数のマーカーが包含するマーカーかどうか
   */
  markerIsContained(marker) {
    if(!this.containedMarkerList || this.containedMarkerList.length === 0) {
      return false;
    }
    let isContained = false;
    this.containedMarkerList.forEach((containedMarker) => {
      if(marker === containedMarker) {
        isContained = true;
        return;
      }
    });
    return isContained;
  }

  setVisible(isVisible) {
    this.marker.setVisible(isVisible);
  }

  clickHandler() {
    this.toBreakClustered();
    if(this.delegate) {
      this.delegate.onClickClusterMarker(this.marker);
    }
  }

  /**
   * クラスター状態にする
   */
  toClustered() {
    //クラスター対象のマーカーを非表示にする
    this.containedMarkerList.forEach((containedMarker) => {
      containedMarker.setVisible(false);
      if(this.delegate) {
        this.delegate.nuSelectContainedMarker(containedMarker);
      }

    });
    this.marker.setLabel(this.getClusterLabelOption());
    this.marker.setVisible(true);
    this.achorPolylineList.forEach((achorPolyline) => {
      achorPolyline.setMap(null);
    });
    this.isClustered = true;
  }

  /**
   * クラスター状態にする
   */
  toClusteredIfNotClusterd() {
    if(!this.isClustered) {
      this.toClustered();
    }
  }

  /**
   * クラスター解除状態にする
   */
  toBreakClustered() {
    //クラスター対象のマーカーを表示する
    this.containedMarkerList.forEach((containedMarker) => {
      containedMarker.setVisible(true);
    });

    this.marker.setVisible(false);
    this.marker.setLabel(null);

    let startHeading = 270;
    let countDeading = 180 / this.containedMarkerList.length;
    let breakClusterCount = 0;

    this.containedMarkerList.forEach((containedMarker) => {
      startHeading += (countDeading / 2);
      //角度を按分したポジションに
      let toLatLon = common.moveByHeadingAndDist(containedMarker.originPosition.lat,
          containedMarker.originPosition.lng,
          startHeading + countDeading * breakClusterCount,
          100);
      const clickedLatLon = {};
      if(this.delegate) {
        toLatLon = this.delegate.adjustFromOtherMarkers(toLatLon);
      }
      containedMarker.setPosition({
        lat: toLatLon.lat,
        lng: toLatLon.lon,
      });

      const fromLatLon = {
        lat: containedMarker.originPosition.lat,
        lon: containedMarker.originPosition.lng,
      };

    this.createAnchorLine(fromLatLon, toLatLon);
    });

    this.isClustered = false;
  }

  createAnchorLine(fromLatLon, toLatLon) {
    const lineCoordinates = [
      { lat: fromLatLon.lat, lng: fromLatLon.lon },
      { lat: toLatLon.lat, lng: toLatLon.lon },
    ];

    const achorPolyline = new this.google.maps.Polyline({
      path: lineCoordinates,
      geodesic: true,
      clickable: false,
      strokeColor: "#333333",
      strokeOpacity: 0.6,
      strokeWeight: 2,
      icons: [
        {
          icon: {
            path: this.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          },
        },
        {
          icon: {
            path: this.google.maps.SymbolPath.CIRCLE,
            scale: 2,
          },
          offset: "0%",
        },
      ],
    });

    achorPolyline.setMap(this.map);
    this.achorPolylineList.push(achorPolyline);
  }

  /**
   * クラスターマーカーのラベルオプション取得
   */
  getClusterLabelOption() {
    return {
      text: `${this.containedMarkerList.length}`,
      //color: "red",
      fontSize: "16px",
      fontWeight: "bold",
      className: "cluster-icon",
    };
  }
}
