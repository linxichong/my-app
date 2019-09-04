import { useEffect } from "react";
import * as _ from "lodash";

const getKeyRecursively = obj => {
  if (!_.isObject(obj)) {
    return "";
  }
  const currentKey = Object.keys(obj)[0];
  if (!getKeyRecursively(obj[currentKey])) {
    return currentKey;
  }
  return currentKey + "." + getKeyRecursively(obj[currentKey]);
};

const useErrorFocus = ({ isSubmitting, isValidating, errors }) => {
  useEffect(() => {
    const keys = Object.keys(errors);
    if (keys.length > 0 && isSubmitting && !isValidating) {
      const selectorKey = getKeyRecursively(errors);
      const selector = `[id="${selectorKey}"], [name="${selectorKey}"] `;
      const errorElement = document.querySelector<HTMLElement>(selector);
      if (errorElement) {
        errorElement.focus();
      }
    }
  }, [isSubmitting, isValidating, errors]);
};

export default useErrorFocus;
