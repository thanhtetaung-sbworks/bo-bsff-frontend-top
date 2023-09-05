import Facility from "./facility";
import Menu from "./menu";


export default class Icon {
  iconCd = "";
  iconNm = "";
  iconSuppl = null;

  /** APIのレスポンス形式からモデルに変換する */
  static createFromResponse(response) {
    const icon = new Icon();
    icon.iconCd = response.iconCd;
    icon.iconNm = response.iconNm;
    icon.iconSuppl = response.iconSuppl;

    return icon;
  }

}
