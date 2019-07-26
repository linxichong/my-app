import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "./resources/zh";
import en from "./resources/en";

i18n
  .use(initReactI18next) // use加载功能插件，这里是将i18n对象传递到react-i18next插件中
  .init({
    // 资源文件定义，资源文件名字需要注意满足语言简写标准
    resources: {
      en: {
        translation: en
      },
      zh: {
        translation: zh
      }
    },
    // 设置语言无效时的默认语言
    fallbackLng: "zh",
    // react已经解决了xss注入问题，这里可以设置为false
    interpolation: {
      escapeValue: false
    },
    // 设置遇到语言变化时，重新渲染UI
    react: {
      bindI18n: "languageChanged"
    }
  });

export default i18n;
