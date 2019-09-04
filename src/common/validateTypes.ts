// 验证类型及方法枚举，定义需要使用的类型及方法，包括自定义和内置
export enum VALIDATE_TYPES {
  STR_REQUIRED = "string.required",
  STR_RANGE = "string.range",
  STR_EMAIL = "string.email",
  STR_MIN = "string.min",
  STR_LENGTH = "string.length",
  STR_MAX = "string.max",
  STR_ONEOF = "string.oneOf",
  STR_WHEN = "string.when"
}

// 泛型定义验证字段，只能定义对象包含字段
export type ValidateFieldDef<T> = {
  [field in keyof T]: ValidateRuleDef[];
};

// 验证规则可选项
export interface ValidateRuleOption {
  ns?: string;
  path?: string;
  chkPath?: string;
}

// 验证规则对象，name 标识了验证类型及方法，必须符合枚举VALIDATE_TYPES定义
// params是可选参数，指定验证方法的参数
export interface ValidateRuleDef {
  name: VALIDATE_TYPES;
  params?: {
    then?: ValidateRuleDef[];
    fn?: Function;
    target?: string;
    is?: string | number | boolean;
    min?: number;
    max?: number;
  };
  options?: ValidateRuleOption;
  fn?: Function;
}
