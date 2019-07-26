import * as React from "react";
import { FormikProps, Formik } from "formik";
import { useTranslation } from "react-i18next";
import useTranslateFormErrors from "../common/Hook/useTranslateFormErrors";
import { ValidateFieldDef, VALIDATE_TYPES } from "../common/validateTypes";
import getYupSchema from "../common/getYupSchema";

// 定义表单包含的字段名及结构
interface FormValues {
  name: string;
  email: string;
}
// 表单值初始化
const initialValues: FormValues = {
  name: "",
  email: ""
};
// 定义验证规则
const rules: ValidateFieldDef<FormValues> = {
  name: [
    // 必输
    { name: VALIDATE_TYPES.STR_REQUIRED},
    // 范围验证（自定义）
    { name: VALIDATE_TYPES.STR_RANGE, params: { min: 1, max: 12 } }
  ],
  email: [
    // 必输
    { name: VALIDATE_TYPES.STR_REQUIRED },
    // 邮件格式
    { name: VALIDATE_TYPES.STR_EMAIL },
    // 范围验证（自定义）
    { name: VALIDATE_TYPES.STR_RANGE, params: { min: 1, max: 100 } }
  ]
};

// 表单定义组件
const Form: React.SFC<FormikProps<FormValues>> = props => {
  // 使用react-i18next的Hook使我们的函数组件能够获取到多语言转换用的t函数
  const { t } = useTranslation();

  // Formik传入的相关属性及状态
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldTouched
  } = props;

  // 自定义Hook完成语言切换后表单重新渲染
  useTranslateFormErrors(errors, touched, setFieldTouched);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        {t("label.name")}
      </label>
      <input
        id="name"
        placeholder={t("label.namePlaceHolder")}
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      {errors.name && touched.name && (
        <div>{errors.name}</div>
      )}
      <label htmlFor="email">
        {t("label.email")}
      </label>
      <input
        id="email"
        placeholder={t("label.emailPlaceHolder")}
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />
      {errors.email && touched.email && (
        <div>{errors.email}</div>
      )}

      <button
        type="button"
        onClick={handleReset}
      >
        {t("label.reset")}
      </button>
      <button type="submit" disabled={isSubmitting}>
        {t("label.submit")}
      </button>
    </form>
  );
};

// Formik组件定义
const MyForm: React.SFC = outerProps => {
  // 使用react-i18next的Hook使我们的函数组件能够获取到多语言转换用的t函数
  const { t } = useTranslation();
  // 自定义根据rules生成验证规则
  const schema = getYupSchema(initialValues, rules, t);
  // Formik相关定义
  return (
    <Formik
      // 表单值初始化
      initialValues={initialValues}
      // 表单提交定义
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
      // yup验证规则定义
      validationSchema={schema}
      // 渲染表单组件，将外部属性及Formik属性同时传入表单组件
      render={props => <Form {...props} {...outerProps} />}
    />
  );
};

export default MyForm;
