import * as Yup from "yup";
import { getI18n } from "react-i18next";
import { ValidateRuleOption, ValidateRuleDef } from "./validateTypes";

// 根据可选项获取显示项目文本路径
const getDisplayPath = (
  globalOpt: ValidateRuleOption,
  opt: ValidateRuleOption,
  filed?: string
) => {
  const ns = "translation:";
  let path = `label.${filed}`;
  if (globalOpt && globalOpt.path) {
    path = `${globalOpt.path}.${filed}`;
  }
  if (opt && opt.path) {
    path = `${opt.path}`;
  }

  return `${ns}${path}`;
};

// 根据可选项获取显示错误验证文本路径
const getCheckPath = (
  globalOpt: ValidateRuleOption,
  opt: ValidateRuleOption,
  type?: string,
  validateName?: string
) => {
  const ns = "translation:";
  let path = `validate.${type}.${validateName}`;
  if (globalOpt && globalOpt.chkPath) {
    path = `${globalOpt.chkPath}`;
  }
  if (opt && opt.chkPath) {
    path = `${opt.chkPath}`;
  }
  return `${ns}${path}`;
};

// 表单中字段显示文本路径
let dispalyPath = "";
// 表单中字段对应的验证文本路径
let checkPath = "";

// 验证项目为空时，不进行除必须验证以外的其他验证
const strTransformRule = [
  { name: "*.nullable" },
  { name: "*.transform", fn: value => (!value ? null : value) }
];

// 获取多语言实例
const i18n = getI18n();
// rules为表单字段需要生成的验证规则
const getYupSchema = (rules, options?: ValidateRuleOption) => {
  // 获取当前语言转换函数
  const t = i18n.getFixedT(i18n.language);

  const schema = {};
  for (const fieldName in rules) {
    // 处理嵌套对象 数组:xx$Array 对象:xx$Obj
    const splits = fieldName.split("$");
    // 获取嵌套对象类型
    let clsType = "";
    if (splits.length > 1) {
      clsType = splits[1];
    }
    // 分离出字段名
    const splitfieldName = splits[0];
    // 根据字段获取规则对象
    const source = rules[fieldName];
    // 如果值是数组的情况（非嵌套对象）
    if (Array.isArray(source)) {
      // 添加预处理
      const operatingRules = [...rules[fieldName], ...strTransformRule];
      // yup的schema生成过程中是采用的链式语法，例如yup.string().required().min().range()
      // 所以我们使用reduce函数来动态完成此操作
      schema[fieldName] = operatingRules.reduce(
        (total, current: ValidateRuleDef) => {
          // 拆分常量定义规则,获取到验证类型及验证方法，如string.required
          const splits = current.name.split(".");
          // 验证类型
          const type = splits[0];
          // 验证方法
          const validateName = splits[1];
          // 首次循环需要根据类型初始化，如Yup.string()
          if (total === null) {
            total = Yup[type]();
          }
          // 使用yup中的when来实现动态验证规则
          if (validateName === "when") {
            const whenSchema = getYupSchema(
              { [fieldName]: current.params.then },
              options
            );
            // 自定义验证函数
            if (current.params.fn) {
              return total[validateName](
                current.params.target,
                current.params.fn
              );
            } else {
              return total[validateName](current.params.target, {
                is: current.params.is,
                then: whenSchema["fields"][fieldName]
              });
            }
          } else if (validateName === "nullable") {
            return total[validateName]();
          } else if (validateName === "transform") {
            return total[validateName](current.fn);
          } else {
            // 获取显示文本路径
            dispalyPath = getDisplayPath(options, current.options, fieldName);
            // 获取验证文本路径
            checkPath = getCheckPath(
              options,
              current.options,
              type,
              validateName
            );
            // 获取对应语言所显示的错误文本
            const message = t(`${checkPath}`, {
              name: t(`${dispalyPath}`),
              ...current.params
            });
            // 处理验证方法参数，参数必须遵照API文档顺序
            const params = [];
            if (current.params) {
              for (const key in current.params) {
                params.push(current.params[key]);
              }
            }
            // 默认message为最终参数
            params.push(message);
            // 调用参数个数不同的对应验证方法生成schema
            if (params.length === 1) {
              return total[validateName](params[0]);
            } else if (params.length === 2) {
              return total[validateName](params[0], params[1]);
            } else if (params.length === 3) {
              return total[validateName](params[0], params[1], params[2]);
            } else {
              return total[validateName]();
            }
          }
        },
        null
      );
    } else if (clsType === "Array") {
      // 嵌套对象（数组）的情况，递归调用并生成数组yup验证对象
      schema[splitfieldName] = Yup.array().of(getYupSchema(source, options));
    } else if (clsType === "Obj") {
      // 为嵌套对象的情况，递归调用并生成yup验证对象
      schema[splitfieldName] = getYupSchema(source, options);
    }
  }
  return Yup.object().shape(schema);
};

export default getYupSchema;
