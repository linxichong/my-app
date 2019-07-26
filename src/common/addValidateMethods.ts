import { addMethod, string } from "yup";

addMethod(string, "range", function(min, max, message) {
  return this.test("range", message, function(value) {
    const { path, createError } = this;
    const len = value ? value.length : 0;
    return (len >= min && len <= max) || createError({ path, message });
  });
});
