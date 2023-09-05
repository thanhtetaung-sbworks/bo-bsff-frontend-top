import Repository from "../repository";
const resource = "/v1/cafe";

export default {
    
    /**
     * マイページ
     * カフェ契約有無チェック
     */
    checkCafeAvailable() {
        return Repository.get(`${resource}/check`);
    }

};