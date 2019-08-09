import * as Yup from "yup";

// 多语言命名空间
const ns = "translation:";
// 表单中字段显示文本
const field_path_prefix = `${ns}label`;
// 表单中字段对应的验证文本
const check_path_prefix = `${ns}validate`;

// rules为表单字段需要生成的验证规则
// t为多语言转换函数
const getYupSchema = (rules, t) => {
  let schema = {};
  for (let fieldName in rules) {
    // 处理嵌套对象 数组:xx$Array 对象:xx$Obj
    const splits = fieldName.split("$");
    // 获取嵌套对象类型
    let clsType = "";
    if (splits.length > 1) {
      clsType = splits[1];
    }
    // 分离出字段名
    const splitfieldName = splits[0];
    // 获取对应语言的字段文本
    const name = t(`${field_path_prefix}.${fieldName}`);
    // 根据字段获取规则对象
    const source = rules[fieldName];
    // 如果值是数组的情况（非嵌套对象）
    if (Array.isArray(source)) {
      // yup的schema生成过程中是采用的链式语法，例如yup.string().required().min().range()
      // 所以我们使用reduce函数来动态完成此操作
      schema[fieldName] = rules[fieldName].reduce((total, current) => {
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
        // 获取对应语言所显示的错误文本
        const message = t(`${check_path_prefix}.${validateName}`, {
          name: name,
          ...current.params
        });
        // 处理验证方法参数，参数必须遵照API文档顺序
        let params = [];
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
      }, null);
    } else if (clsType === "Array") {
      // 嵌套对象（数组）的情况，递归调用并生成数组yup验证对象
      schema[splitfieldName] = Yup.array().of(getYupSchema(source, t));
    } else if (clsType === "Obj") {
      // 为嵌套对象的情况，递归调用并生成yup验证对象
      schema[splitfieldName] = getYupSchema(source, t);
    }
  }
  return Yup.object().shape(schema);
};

export default getYupSchema;
