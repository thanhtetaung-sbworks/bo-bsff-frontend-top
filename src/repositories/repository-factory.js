// 動作モードlocal以外
import cms from "./repository-cms";
import orders from "./repository-orders";
import user from "./repository-user";
import login from "./repository-login";
import search from "./repository-search";
import subsidy from "./repository-subsidy";
import file from "./repository-file";
import mypage from "./repository-mypage";
import shop from "./repository-shop";
import cafe from "./repository-cafe";

// 動作モードlocal
import mock_cms from "./mock/repository-cms";
import mock_orders from "./mock/repository-orders";
import mock_user from "./mock/repository-user";
import mock_login from "./mock/repository-login";
import mock_search from "./mock/repository-search";
import mock_meta from "./mock/repository-meta";
import mock_subsidy from "./mock/repository-subsidy";
import mock_file from "./mock/repository-file";
import mock_mypage from "./mock/repository-mypage";
import mock_shop from "./mock/repository-shop.js";
import mock_cafe from "./mock/repository-cafe";
// モード：mockかどうか
const mode = process.env.VUE_APP_DEV_MODE === "local" ? "mock" : "";
// const mode = "";
console.log(mode);

// 動作モードlocal以外
const repository = {
  cms,
  orders,
  user,
  login,
  search,
  subsidy,
  file,
  mypage,
  shop,
  cafe
};

// 動作モードlocal
const mock_repository = {
  mock_cms,
  mock_orders,
  mock_user,
  mock_login,
  mock_search,
  mock_meta,
  mock_subsidy,
  mock_file,
  mock_mypage,
  mock_shop,
  mock_cafe
};

// 動作モードがlocalの場合はrepositoryの矛先を変更する
const repositories = mode === "mock" ? mock_repository : repository;

export const RepositoryFactory = {
  get: (name) => {
    const repositoryName = mode === "mock" ? `mock_${name}` : name;
    return (
      repositories[repositoryName] ||
      console.error(`${repositoryName} repository is not found.`)
    );
  }
};
