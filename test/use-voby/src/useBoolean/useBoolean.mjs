import { p as observable, g as get } from "../../../woby/dist/setters-0ed3c7f1.mjs";
function useBoolean(defaultValue) {
  const value = observable(!!get(defaultValue));
  const setTrue = () => value(true);
  const setFalse = () => value(false);
  const toggle = () => value((x) => !x);
  return { value, setTrue, setFalse, toggle };
}
export {
  useBoolean
};
