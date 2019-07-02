// 路由配置
export const PATHS = {
  TOP: "/",
  ABOUT: "/about",
  NOVELS: "/novels",
  UI: "/materialui"
};

// 定义ACTION类型
export const ACTION_TYPES = {
  // 发起请求
  FETCH_NOVELS: "FETCH_NOVELS",
  // 请求成功
  FETCH_NOVELS_OK: "FETCH_NOVELS_OK",
  // 请求失败
  FETCH_NOVELS_NG: "FETCH_NOVELS_NG"
};

// 定义API请求路径
export const API_URLS = {
  NOVELS: `/novels`
};
