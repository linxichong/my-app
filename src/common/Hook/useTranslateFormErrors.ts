import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FormikTouched, FormikErrors } from "formik";

const useTranslateFormErrors = <T>(
  errors: FormikErrors<T>,
  touched: FormikTouched<T>,
  setFieldTouched: Function
) => {
  // 钩子获取多语言i18n对象
  const { i18n } = useTranslation();
  // 重新刷新已显示错误信息的正确语言版本
  const handleTouched = () => {
    for (const field in errors) {
      if (field in touched) {
        setFieldTouched(field);
      }
    }
  };
  // 初始化时监听语言变更事件
  useEffect(() => {
    i18n.on("languageChanged", handleTouched);
    // 推出组件注销事件
    return () => {
      i18n.off("languageChanged", handleTouched);
    };
  }, [errors]);
};

export default useTranslateFormErrors;
