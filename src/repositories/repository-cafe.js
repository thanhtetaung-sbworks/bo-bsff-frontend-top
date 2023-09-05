import Repository from "./repository";
const resource = "/v1/cafe";

export default {

    checkCafeAvailable() {
        return Repository.get(`${resource}/check`);
    }

};