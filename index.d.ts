import { StringSchema, Schema, Ref, TestOptionsMessage } from "yup";

declare module "yup" {
  interface StringSchema<T extends string | null | undefined = string>
    extends Schema<T> {
    range(
      min: number | Ref,
      max: number | Ref,
      message?: TestOptionsMessage
    ): StringSchema<T>;
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface TypeBackground {
    light: string;
  }
}
