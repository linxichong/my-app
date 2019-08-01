import { Language } from "./types";

// 路由配置
export const PATHS = {
  TOP: "/",
  ABOUT: "/about",
  NOVELS: "/novels"
};

// 定义ACTION类型
export const ACTION_TYPES = {
  // 发起请求
  FETCH_NOVELS: "FETCH_NOVELS",
  // 请求成功
  FETCH_NOVELS_OK: "FETCH_NOVELS_OK",
  // 请求失败
  FETCH_NOVELS_NG: "FETCH_NOVELS_NG",
  // 切换侧边栏
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR"
};

// 定义API请求路径
export const API_URLS = {
  NOVELS: `/novels`
};

// 网站所支持语言
export const LANGUAGES: Language[] = [
  { key: "zh", lable: "zh 中文" },
  { key: "en", lable: "en English" }
];
